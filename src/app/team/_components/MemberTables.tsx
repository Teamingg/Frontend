"use client";
import React, {useState} from 'react';
import MemberTableActionBtn
  , {ActionBtn} from "@/app/team/_components/MemberTableActionBtn";
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
                {getActionConfig(idx, status, isMember, updateMemberStatus).map((action, i) => (
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