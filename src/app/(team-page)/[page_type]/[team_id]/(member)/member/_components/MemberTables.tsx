import React from 'react';
import {TeamMemberTables} from "@/app/(team-page)/[page_type]/[team_id]/(member)/member/page";
import MemberTableActionBtn
  from "@/app/(team-page)/[page_type]/[team_id]/(member)/member/_components/MemberTableActionBtn";

const MemberTables: React.FC<TeamMemberTables> = ({type}) => {
  const isMember = type === "MEMBER";
  const columnWidth = isMember ? "w-1/5" : "w-1/4";

  return (
      <>
        {Array(5).fill(0).map((_, idx) => (
            <div key={idx} className="flex text-center border-b last:border-none p-2 text-sm">
              <div className={columnWidth}>2024-11-11</div>
              <div className={columnWidth}>number</div>
              <div className={columnWidth}>
                {isMember ? "멘티" : Math.floor(Math.random() * 3)}
              </div>

              {/* 멤버 상태 변경 버튼 */}
              {isMember ? (
                  <>
                    <div className={columnWidth}>
                      {idx % 2 === 0 ? (
                          <MemberTableActionBtn actions={[{
                            type: "send", label: "내보내기", onClick: () => {
                            }
                          }]}/>
                      ) : (
                          "강퇴"
                      )}
                    </div>
                    <div className={columnWidth}>
                      <MemberTableActionBtn actions={[{
                        type: "report", label: "신고", onClick: () => {
                        }
                      }]}/>
                    </div>
                    <div className={columnWidth}>
                      <MemberTableActionBtn actions={[{
                        type: "write", label: "작성", onClick: () => {
                        }
                      }]}/>
                    </div>
                  </>
              ) : (
                  <div className={`${columnWidth}`}>
                    {idx % 3 !== 0 ? (
                        <>
                          <MemberTableActionBtn actions={[
                            {
                              type: "approve", label: "수락", onClick: () => {
                              }
                            },
                            {
                              type: "reject", label: "거절", onClick: () => {
                              }
                            },
                          ]}/>
                        </>
                    ) : (
                        idx % 2 === 0 ? "거절" : "수락"
                    )}
                  </div>
              )}
            </div>
        ))}
      </>
  );
};

export default MemberTables;