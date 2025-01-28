"use client";
import React, { useEffect, useState } from "react";
import MemberTableActionBtn from "@/app/team/_components/MemberTableActionBtn";
import { TeamMemberTables } from "@/app/team/[page_type]/[team_id]/(member)/[member_type]/page";
import AlertModal from "@/components/common/Modal/AlertModal";
import useModal from "@/hooks/useModal";
import { MemberStatus } from "@/app/team/_type/teamPageMember";
import {
  getActionConfig,
  getMemberActionEndpoint, getSelectedAction,
  initializeMemberStatus,
  updateMemberStatusState
} from "@/app/team/_service/teamMemberService";
import ErrorFallback from "@/components/error/ErrorFallback";
import { useSubmit } from "@/hooks/form/useSubmit";

// ✅ SelectedAction 인터페이스
export interface SelectedAction {
  id: number;
  key: keyof MemberStatus;
  name: string;
  value: boolean | null;
  label: string; // 선택된 액션의 라벨
}

// ✅ 기본 상태 정의
const initialStatus: MemberStatus = {
  approved: null,
  removed: false,
  reported: false,
  written: false,
};

const MemberTables: React.FC<TeamMemberTables & { teamId: number }> = ({ type, data, teamId }) => {
  const isMember = type === "MEMBER";
  const columnWidth = isMember ? "w-1/5" : "w-1/4";

  // ✅ 모달 상태
  const { modal, openModal, closeModal } = useModal();
  const [selectedAction, setSelectedAction] = useState<SelectedAction>({
    id: -1,
    key: "approved",
    name: "",
    value: null,
    label: "",
  });

  // ✅ 멤버 상태 관리
  const [memberStatus, setMemberStatus] = useState<Record<number, MemberStatus>>({});

  // ✅ 최초 데이터 로드 시 멤버 상태 초기화
  useEffect(() => {
    if (!data) return;
    setMemberStatus(initializeMemberStatus(data));
  }, [data]);

  // ✅ useSubmit 훅 사용 (API 요청)
  const endpoint = selectedAction.id !== -1 ? getMemberActionEndpoint(teamId, selectedAction.id, selectedAction.key) : ""
  const { submit: updateMemberStatus, isLoading } = useSubmit({
    endpoint: endpoint,
    formatPayload: (data) => ({
      id: 1,// data.id,
      key: 2, // data.key,
      value: 3, // data.value,
    }),
    onSuccess: () => {
      // ✅ 상태 업데이트 반영
      setMemberStatus((prev) => updateMemberStatusState(prev, selectedAction));
      console.log(`✅ ${selectedAction.name}(${selectedAction.key}) 상태 업데이트 완료!`);
    },
  });

  // ✅ 버튼 클릭 시 모달을 띄우도록 설정
  const handleActionClick = ({ id, key, name, value }: Omit<typeof selectedAction, "label">) => {
    setSelectedAction(getSelectedAction(id, key, name, value));
    openModal();
  };

  // ✅ 모달 확인 버튼 클릭 시 API 요청 실행
  const confirmAction = () => {
    if (selectedAction.id !== -1) {
      updateMemberStatus({
        id: selectedAction.id,
        key: selectedAction.key,
        value: selectedAction.value,
      });
    }
    closeModal();
  };

  return (
      <>
        {(data ?? []).map((member, idx) => {
          const status = memberStatus[member.userId] || initialStatus; // 기본값 적용
          const date = member.decisionDate.slice(0, 10) || "N/A";
          const username = member.username || member.userName || "N/A";
          const role = member.role || "N/A";
          const actions = getActionConfig(member.userId, status, isMember, (id, key, value) =>
              handleActionClick({ id, key, name: member.username, value })
          );

          return (
              <div key={idx} className="flex text-center border-b last:border-none p-2 text-sm">
                <div className={columnWidth}>{date}</div>
                <div className={columnWidth}>{username}</div>

                {/* 팀원 UI */}
                {isMember ? (
                    <>
                      <div className={columnWidth}>{role}</div>
                      {actions.map((action, i) => (
                          <div key={i} className={columnWidth}>
                            <MemberTableActionBtn actions={[action]} />
                          </div>
                      ))}
                    </>
                ) : (
                    // 리더 UI
                    <>
                      <div className={columnWidth}>0</div>
                      <div className={`${columnWidth} flex gap-2 justify-center`}>
                        {actions.map((action, i) => (
                            <MemberTableActionBtn key={i} actions={[action]} />
                        ))}
                      </div>
                    </>
                )}
              </div>
          );
        })}

        {/* 모달 */}
        {modal && selectedAction && (
            <AlertModal
                title={`${selectedAction.name}을 ${selectedAction?.label}하시겠습니까?`}
                message="..."
                onClose={closeModal}
                onConfirm={confirmAction}
                buttonLabel="네"
                isOpen={modal}
                isLoading={isLoading}
            />
        )}
      </>
  );
};

export default MemberTables;
