import React from 'react';
import MemberTableActionBtn
  from "@/app/(team-page)/[page_type]/[team_id]/(member)/member/_components/MemberTableActionBtn";

const MemberTableData = ({data, tableName}) => {
  return (
      <>
        {tableName === "MEMBER" ? (
            <>
              {Array(5).fill(0).map((_, idx) => (
                  <div key={idx} className="flex text-center border-b last:border-none p-2 text-sm">
                    <div className="w-1/5">2024-11-11 23:00:00</div>
                    <div className="w-1/5">number</div>
                    <div className="w-1/5">멘티</div>
                    <div className="w-1/5">
                      {idx % 2 === 0 ? (
                          <MemberTableActionBtn actions={[{
                            type: "send", label: "내보내기", onClick: () => {
                            }
                          }]}/>
                      ) : (
                          "강퇴"
                      )}
                    </div>
                    <div className="w-1/5">
                      <MemberTableActionBtn actions={[{
                        type: "report", label: "신고", onClick: () => {
                        }
                      }]}/>
                    </div>
                    <div className="w-1/5">
                      <MemberTableActionBtn actions={[{
                        type: "write", label: "작성", onClick: () => {
                        }
                      }]}/>
                    </div>
                  </div>
              ))}
            </>
        ) : (
            <>
              {Array(5).fill(0).map((_, idx) => (
                  <div key={idx} className="flex text-center border-b last:border-none p-2 text-sm">
                    <div className="w-1/4">2024-11-11 23:00:00</div>
                    <div className="w-1/4">number</div>
                    <div className="w-1/4">{Math.floor(Math.random() * 3)}</div>
                    <div className="w-1/4">
                      {idx % 3 !== 0 ? (
                          <>
                            <MemberTableActionBtn actions={[
                              {type: "approve", label: "수락", onClick: () => {}},
                              {type: "reject", label: "거절", onClick: () => {}},
                            ]}/>
                          </>
                      ) : (
                          idx % 2 === 0 ? "거절" : "수락"
                      )}
                    </div>
                  </div>
              ))}
            </>
        )}

      </>
  );
};

export default MemberTableData;