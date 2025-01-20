"use client";
import React, {useState} from 'react';
import MemberTableActionBtn
  from "@/app/(team-page)/[page_type]/[team_id]/(member)/[member_type]/_components/MemberTableActionBtn";
import {TeamMemberTables} from "@/app/(team-page)/[page_type]/[team_id]/(member)/[member_type]/page";

// 멤버의 상태
interface MemberStatus {
  [id: number]: {
    approved: boolean | null; // 수락 여부
    removed: boolean; // 내보내기 여부
    reported: boolean; // 신고 여부
    written: boolean; // 작성 여부
  };
}

const MemberTables: React.FC<TeamMemberTables> = ({type}) => {
  const isMember = type === "MEMBER";
  const columnWidth = isMember ? "w-1/5" : "w-1/4";

  // 멤버 상태 관리
  const [memberStatus, setMemberStatus] = useState<MemberStatus>({});

  // 상태 변경 함수
  // 모든 버튼 클릭시 모달 출력하도록 수정 필요
  // 리뷰 작성시 모달 출력
  const updateMemberStatus = (id: number, key: keyof MemberStatus[number], value: boolean | null) => {
    setMemberStatus((prev) => ({...prev, [id]: {...prev[id], [key]: value,},}));
  };

  return (
      <>
        {Array(5).fill(0).map((_, idx) => {
              const status = memberStatus[idx] || {
                approved: null,
                removed: false,
                reported: false,
                written: false,
              };

              return (
                  <div key={idx} className="flex text-center border-b last:border-none p-2 text-sm">
                    <div className={columnWidth}>2024-11-11</div>
                    <div className={columnWidth}>number</div>
                    <div className={columnWidth}>{isMember ? "멘티" : Math.floor(Math.random() * 3)}</div>

                    {/* 멤버 상태 변경 버튼 */}
                    {isMember ? (
                        <>
                          <div className={columnWidth}>
                            {status.removed ? (
                                <span className="text-red-500">강퇴</span>
                            ) : (
                                <MemberTableActionBtn
                                    actions={[{ type: "send", label: "내보내기", onClick: () => updateMemberStatus(idx, "removed", true) }]}
                                />
                            )}
                          </div>
                          <div className={columnWidth}>
                            {status.reported ? (
                                <span className="text-orange-500">신고됨</span>
                            ) : (
                                <MemberTableActionBtn
                                    actions={[{ type: "report", label: "신고", onClick: () => updateMemberStatus(idx, "reported", true) }]}
                                />
                            )}
                          </div>
                          <div className={columnWidth}>
                            {status.written ? (
                                <span className="text-green-500">작성 완료</span>
                            ) : (
                                <MemberTableActionBtn
                                    actions={[{ type: "write", label: "작성", onClick: () => updateMemberStatus(idx, "written", true) }]}
                                />
                            )}
                          </div>
                        </>
                    ) : (
                        <div className={`${columnWidth}`}>
                          {status.approved === null ? (
                              <MemberTableActionBtn
                                  actions={[
                                    { type: "approve", label: "수락", onClick: () => updateMemberStatus(idx, "approved", true) },
                                    { type: "reject", label: "거절", onClick: () => updateMemberStatus(idx, "approved", false) },
                                  ]}
                              />
                          ) : status.approved ? (
                              <span className="text-green-500">수락됨</span>
                          ) : (
                              <span className="text-red-500">거절됨</span>
                          )}
                        </div>
                    )}
                  </div>
              );
            })}
      </>
  );
};

export default MemberTables;