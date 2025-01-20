"use client";
import React, {useState} from 'react';
import MemberTableActionBtn
  , {ActionBtn} from "@/app/team/_components/MemberTableActionBtn";
import {TeamMemberTables} from "@/app/team/[page_type]/[team_id]/(member)/[member_type]/page";
import AlertModal from "@/components/common/Modal/AlertModal";
import useModal from "@/hooks/useModal";
import {MemberStatus} from "@/app/team/_type/teamPageMember";

const initialStatus: MemberStatus = {
  approved: null,
  removed: false,
  reported: false,
  written: false,
};

const MemberTables: React.FC<TeamMemberTables> = ({type}) => {
  const isMember = type === "MEMBER";
  const columnWidth = isMember ? "w-1/5" : "w-1/4";

  // 모달
  const { modal, openModal, closeModal } = useModal();

  // 멤버 상태 관리
  const [memberStatus, setMemberStatus] = useState<Record<number, MemberStatus>>({});

  // 상태 변경 함수
  // 모든 버튼 클릭시 모달 출력하도록 수정 필요
  // 리뷰 작성시 모달 출력
  const updateMemberStatus = (id: number, key: keyof MemberStatus, value: boolean | null) => {
    setMemberStatus((prev) => ({...prev, [id]: {...prev[id], [key]: value,},}));
  };

  // 버튼 설정
  const getActionConfig = (id: number, status: MemberStatus): ActionBtn[] => {
    if (isMember) {
      return [
        status.removed
            ? { type: "info", label: "강퇴", className: "text-red-500" }
            : { type: "send", label: "내보내기", onClick: () => updateMemberStatus(id, "removed", true) },

        status.reported
            ? { type: "info", label: "신고됨", className: "text-orange-500" }
            : { type: "report", label: "신고", onClick: () => updateMemberStatus(id, "reported", true) },

        status.written
            ? { type: "info", label: "작성 완료", className: "text-green-500" }
            : { type: "write", label: "작성", onClick: () => updateMemberStatus(id, "written", true) }
      ];
    }

    const actions: ActionBtn[] = [
      status.approved === null
          ? { type: "approve", label: "수락", onClick: () => updateMemberStatus(id, "approved", true) }
          : status.approved
              ? { type: "info", label: "수락됨", className: "text-green-500" }
              : { type: "info", label: "거절됨", className: "text-red-500" }
    ];

    if (status.approved === null) {
      actions.push({ type: "reject", label: "거절", onClick: () => updateMemberStatus(id, "approved", false) });
    };

    return actions;
  }

  return (
      <>
        {Array(5).fill(0).map((_, idx) => {
          const status = memberStatus[idx] || initialStatus;

          return (
              <div key={idx} className="flex text-center border-b last:border-none p-2 text-sm">
                <div className={columnWidth}>2024-11-11</div>
                <div className={columnWidth}>number</div>
                <div className={columnWidth}>{isMember ? "멘티" : Math.floor(Math.random() * 3)}</div>

                {/* 액션 버튼 */}
                {getActionConfig(idx, status).map((action, i) => (
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
      </>
  );
};

export default MemberTables;