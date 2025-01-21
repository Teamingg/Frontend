"use client";
import React, {useState} from 'react';
import MemberTableActionBtn from "@/app/team/_components/MemberTableActionBtn";
import {TeamMemberTables} from "@/app/team/[page_type]/[team_id]/(member)/[member_type]/page";
import AlertModal from "@/components/common/Modal/AlertModal";
import useModal from "@/hooks/useModal";
import {MemberStatus} from "@/app/team/_type/teamPageMember";
import {getActionConfig} from "@/app/team/_service/teamPageMemberService";

const initialStatus: MemberStatus = {
  approved: null,
  removed: false,
  reported: false,
  written: false,
};

const MemberTables: React.FC<TeamMemberTables> = ({type}) => {
  const isMember = type === "MEMBER";
  const columnWidth = isMember ? "w-1/5" : "w-1/4";

  // ✅ 모달 상태
  const { modal, openModal, closeModal } = useModal();
  const [selectedAction, setSelectedAction] = useState<{ id: number; key: keyof MemberStatus; value: boolean | null; } | null>(null);

  // ✅ 멤버 상태
  const [memberStatus, setMemberStatus] = useState<Record<number, MemberStatus>>({});

  // ✅ 멤버 상태 변경
  const updateMemberStatus = (id: number, key: keyof MemberStatus, value: boolean | null) => {
    setMemberStatus((prev) => ({...prev, [id]: {...prev[id], [key]: value,},}));
  };

  // ✅ 버튼 클릭 시 모달을 띄우도록 설정
  const handleActionClick = (id: number, key: keyof MemberStatus, value: boolean | null) => {
    setSelectedAction({ id, key, value }); // 선택된 액션 저장
    openModal(); // 모달 열기
  };

  // ✅ 모달 확인 버튼 클릭 시 실제 상태 업데이트 수행
  const confirmAction = () => {
    if (selectedAction) {
      updateMemberStatus(selectedAction.id, selectedAction.key, selectedAction.value);
    }
    closeModal();
  };

  const dummyDate = "2024-11-11";
  const dummyName = "name";
  const dummyMember = isMember ? "멘티" : Math.floor(Math.random() * 3)
  return (
      <>
        {Array(5).fill(0).map((_, idx) => {
          const status = memberStatus[idx] || initialStatus;

          return (
              <div key={idx} className="flex text-center border-b last:border-none p-2 text-sm">
                <div className={columnWidth}>{dummyDate}</div>
                <div className={columnWidth}>{dummyName}</div>
                <div className={columnWidth}>{dummyMember}</div>

                {/* 액션 버튼 */}
                {getActionConfig(idx, status, isMember, handleActionClick).map((action, i) => (
                    action?.className ? (
                        <div key={i} className={`${columnWidth} ${action.className}`}>
                          {action.label}
                        </div>
                    ) : (
                        <div key={i} className={columnWidth}>
                          <MemberTableActionBtn actions={[action]}/>
                        </div>
                    )
                ))}
              </div>
          );
        })}

        {/* 모달 */}
        {modal && selectedAction && (
            <AlertModal
                title={`${dummyName}을 ${selectedAction?.key}하시겠습니까?`}
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