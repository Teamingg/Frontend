"use client";
import React, {useState} from 'react';
import MemberTableActionBtn from "@/app/team/_components/MemberTableActionBtn";
import {TeamMemberTables} from "@/app/team/[page_type]/[team_id]/(member)/[member_type]/page";
import AlertModal from "@/components/common/Modal/AlertModal";
import useModal from "@/hooks/useModal";
import {MemberStatus} from "@/app/team/_type/teamPageMember";
import {getActionConfig} from "@/app/team/_service/teamPageMemberService";
import ErrorFallback from "@/components/error/ErrorFallback";

// ✅ SelectedAction 인터페이스
interface SelectedAction {
  id: number;
  key: keyof MemberStatus;
  name: string;
  value: boolean | null;
  label: string; // 선택된 액션의 라벨
}

// ✅ key -> 한글 변환 매핑 객체
const actionLabels: Record<keyof MemberStatus, string> = {
  approved: "승인",
  removed: "강퇴",
  reported: "신고",
  written: "작성 완료",
};

const initialStatus: MemberStatus = {
  approved: null,
  removed: false,
  reported: false,
  written: false,
};

const initialMember: SelectedAction = {
  id: -1,
  key: "approved",
  name: "",
  value: null,
  label: "",
};

const MemberTables: React.FC<TeamMemberTables> = ({type, data}) => {
  const isMember = type === "MEMBER";
  const columnWidth = isMember ? "w-1/5" : "w-1/4";

  // ✅ 모달 상태
  const { modal, openModal, closeModal } = useModal();
  const [selectedAction, setSelectedAction] = useState<SelectedAction>(initialMember);

  // ✅ 멤버 상태
  const [memberStatus, setMemberStatus] = useState<Record<number, MemberStatus>>({});

  // ✅ 멤버 상태 변경
  const updateMemberStatus = ({ id, key, value }: SelectedAction) => {
    setMemberStatus((prev) => ({
      ...prev, [id]: {...prev[id], [key]: value,},}));
  };

  // ✅ 버튼 클릭 시 모달을 띄우도록 설정
  const handleActionClick = ({ id, key, name, value }: Omit<SelectedAction, "label">) => {
    const label = actionLabels[key] || key; // 변환된 한글 라벨 적용
    setSelectedAction({ id, key, name, value, label }); // 선택된 액션 저장
    openModal(); // 모달 열기
  };

  // ✅ 모달 확인 버튼 클릭 시 실제 상태 업데이트 수행
  const confirmAction = () => {
    if (selectedAction.id !== -1) updateMemberStatus(selectedAction);
    closeModal();
  };

  return (
      <>
        {data && data.length > 0 ? (
            data.map((member, idx) => {
              const status = memberStatus[idx] || initialStatus;

              return (
                  <div key={idx} className="flex text-center border-b last:border-none p-2 text-sm">
                    <div className={columnWidth}>{member.acceptedTime || "N/A"}</div>
                    <div className={columnWidth}>{member.username || "N/A"}</div>
                    <div className={columnWidth}>{member.role || "N/A"}</div>

                    {/* 액션 버튼 */}
                    {getActionConfig(idx, status, isMember, (id, key, value) =>
                        handleActionClick({ id, key, name: member.username, value })
                    ).map((action, i) =>
                        action?.className ? (
                            <div key={i} className={`${columnWidth} ${action.className}`}>
                              {action.label}
                            </div>
                        ) : (
                            <div key={i} className={columnWidth}>
                              <MemberTableActionBtn actions={[action]} />
                            </div>
                        )
                    )}
                  </div>
              );
            })
        ) : (
            <ErrorFallback message={"데이터 로딩중 오류가 발생했습니다."}/>
        )}

        {/* 모달 */}
        {modal && selectedAction && (
            <AlertModal
                title={`${selectedAction.name}을 ${selectedAction?.label}하시겠습니까?`}
                message="..."
                onClose={closeModal}
                onConfirm={confirmAction}
                buttonLabel="네"
                isOpen={modal}
            />
        )}
      </>
  );
};

export default MemberTables;