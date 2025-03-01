"use client";
import React, { useEffect, useState } from "react";
import MemberTableActionBtn from "./MemberTableActionBtn";
import AlertModal from "@/components/Modal/AlertModal";
import useModal from "@/hooks/useModal";
import { MemberStatus } from "@/types/team/teamPageMember";
import {
  getActionConfig,
  getMemberActionEndpoint, getSelectedAction,
  initializeMemberStatus,
  updateMemberStatusState
} from "@/service/teamMemberService";
import { useSubmit } from "@/hooks/form/useSubmit";
import {TeamMemberTables} from "@/app/team/dump/[page_type]/member/[member_type]/page";

// ✅ 서버에 전송할 데이터 타입 (name, label 제외)
interface MemberActionPayload {
  id: number;
  key: keyof MemberStatus;
  value: boolean | null;
}

// ✅ SelectedAction 타입 (UI에서 사용)
export interface SelectedAction extends MemberActionPayload {
  name: string;
  label: string;
}

// ✅ 기본 상태 정의
const initialStatus: MemberStatus = {
  approved: null,
  removed: false,
  reported: false,
  written: false,
};

const MemberTables: React.FC<TeamMemberTables> = ({...props}) => {
  const {type, data, params} = props;
  const isMember = type === "MEMBER";
  const columnWidth = isMember ? "w-1/5" : "w-1/4";

  // ✅ 모달 상태
  const { modal, openModal, closeModal } = useModal();
  const [selectedMember, setSelectedMember] = useState<SelectedAction>({
    id: -1, key: "approved", name: "", value: null, label: "",
  });

  // ✅ 멤버 상태 관리
  const [memberStatus, setMemberStatus] = useState<Record<number, MemberStatus>>({});

  // ✅ 최초 데이터 로드 시 멤버 상태 초기화
  useEffect(() => {
    if (!data) return;
    setMemberStatus(initializeMemberStatus(data));
  }, [data]);

  // ✅ useSubmit 훅 사용 (API 요청)
  const pageType = params?.page_type ?? "";
  const teamId = params?.team_id ?? "";
  const endpoint = selectedMember.id !== -1
      ? getMemberActionEndpoint(pageType, teamId, selectedMember.id, selectedMember.key)
      : ""

  const { submit: updateMemberStatus, isLoading } = useSubmit<MemberActionPayload>({
    endpoint: endpoint,
    formatPayload: (data) => {
      console.log("📌 변환 전 데이터:", data);
      console.log("📌 변환 후 id:", String(data.id));
      console.log("📌 변환된 타입:", typeof String(data.id));

      return {
        id: String(data.id), // 숫자를 문자열로 변환
        key: data.key,
        value: data.value,
      };
    },
    onSuccess: () => {
      // ✅ 상태 업데이트 반영
      setMemberStatus((prev) => updateMemberStatusState(prev, selectedMember));
      console.log(`✅ ${selectedMember.name}(${selectedMember.key}) 상태 업데이트 완료!`);
    },
  });

  // ✅ 버튼 클릭 시 모달을 띄우도록 설정
  const handleActionClick = ({ id, key, name, value }: Omit<typeof selectedMember, "label">) => {
    setSelectedMember(getSelectedAction(id, key, name, value));
    openModal();
  };

  // ✅ 모달 확인 버튼 클릭 시 API 요청 실행
  const confirmAction = () => {
    if (selectedMember.id !== -1) {
      updateMemberStatus({
        id: selectedMember.id,
        key: selectedMember.key,
        value: selectedMember.value,
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
              handleActionClick({id, key, name: member.username || member.userName, value})
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
        {modal && selectedMember && (
            <AlertModal
                title={`${selectedMember.name}을 ${selectedMember?.label}하시겠습니까?`}
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