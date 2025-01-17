"use client";
import React from 'react';

const MemberTable = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">

        {/* 팀원 리스트 */}
        <h2 className="text-xl font-bold mb-4">팀원</h2>
        <div className="w-full flex flex-col border border-gray-300 rounded-md">
          {/* 테이블 헤더 */}
          <div className="flex bg-gray-200 p-2 font-semibold text-sm">
            <div className="w-1/5 text-center">날짜</div>
            <div className="w-1/5 text-center">닉네임</div>
            <div className="w-1/5 text-center">역할</div>
            <div className="w-1/5 text-center">강퇴</div>
            <div className="w-1/5 text-center">신고</div>
            <div className="w-1/5 text-center">리뷰</div>
          </div>

          {/* 테이블 데이터 */}
          {Array(5).fill(0).map((_, idx) => (
            <div key={idx} className="flex text-center border-b last:border-none p-2 text-sm">
              <div className="w-1/5">2024-11-11 23:00:00</div>
              <div className="w-1/5">number</div>
              <div className="w-1/5">멘티</div>
              <div className="w-1/5">
                {idx % 2 === 0 ? (
                  <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs">내보내기</button>
                ) : (
                  "강퇴"
                )}
              </div>
              <div className="w-1/5">
                <button className="bg-red-500 text-white px-2 py-1 rounded text-xs">신고</button>
              </div>
              <div className="w-1/5">
                <button className="bg-yellow-400 text-white px-2 py-1 rounded text-xs">작성</button>
              </div>
            </div>
          ))}
        </div>

        {/* 신청 내역 리스트 */}
        <h2 className="text-xl font-bold mt-8 mb-4">신청내역</h2>
        <div className="w-full flex flex-col border border-gray-300 rounded-md">
          {/* 테이블 헤더 */}
          <div className="flex bg-gray-200 p-2 font-semibold text-sm">
            <div className="w-1/4 text-center">신청일시</div>
            <div className="w-1/4 text-center">닉네임</div>
            <div className="w-1/4 text-center">경고 횟수</div>
            <div className="w-1/4 text-center">수락/거절</div>
          </div>

          {/* 테이블 데이터 */}
          {Array(5).fill(0).map((_, idx) => (
            <div key={idx} className="flex text-center border-b last:border-none p-2 text-sm">
              <div className="w-1/4">2024-11-11 23:00:00</div>
              <div className="w-1/4">number</div>
              <div className="w-1/4">{Math.floor(Math.random() * 3)}</div>
              <div className="w-1/4">
                {idx % 3 !== 0 ? (
                  <>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs mr-2">수락</button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded text-xs">거절</button>
                  </>
                ) : (
                  idx % 2 === 0 ? "거절" : "수락"
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MemberTable;