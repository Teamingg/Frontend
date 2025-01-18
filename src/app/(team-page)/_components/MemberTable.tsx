"use client";
import React from 'react';
import MemberTableHeader from "@/app/(team-page)/_components/MemberTableHeader";
import MemberTableList from "@/app/(team-page)/_components/MemberTableList";
import MemberTableActionBtn from "@/app/(team-page)/_components/MemberTableActionBtn";

const MEMBER = [
  {id: 1, label: "날짜"},
  {id: 2, label: "닉네임"},
  {id: 3, label: "역할"},
  {id: 4, label: "강퇴"},
  {id: 5, label: "신고"},
  {id: 6, label: "리뷰"}
]

const LEADER = [
  {id: 1, label: "신청일시"},
  {id: 2, label: "닉네임"},
  {id: 3, label: "경고 횟수"},
  {id: 4, label: "수락/거절"}
]

const MemberTable = () => {
  return (
    <>
      {/* 팀원 리스트 */}
      <MemberTableList title="팀원">
        {/* 테이블 헤더 */}
        <MemberTableHeader tableName={MEMBER}/>

        {/* 테이블 데이터 */}
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
      </MemberTableList>

      {/* 신청 내역 리스트 */}
      <MemberTableList title="신청내역">
        {/* 테이블 헤더 */}
        <MemberTableHeader tableName={LEADER}/>

        {/* 테이블 데이터 */}
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
      </MemberTableList>
    </>
  );
};

export default MemberTable;