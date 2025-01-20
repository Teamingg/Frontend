import React from 'react';
import InfoList from "@/app/team/[page_type]/[team_id]/(external)/viewer/_components/InfoList";
import InfoSection from "@/app/team/[page_type]/[team_id]/(external)/viewer/_components/InfoSection";

const PROJECT_INFO = [
  {id: 1, label: "프로젝트 기간"},
  {id: 2, label: "모집 인원"},
  {id: 3, label: "모집 마감일"},
  {id: 4, label: "연락 방법"},
  {id: 5, label: "모집 상태"},
  {id: 6, label: "모집 분야"},
  {id: 7, label: "기술 스택"},
];

// 지원 현황 더미 데이터
const APPLICATION_LIST = [
  {id: 1, date: "2024-11-11 23:00:00", name: "number", status: "대기중", action: "취소하기"},
  {id: 2, date: "2024-11-11 23:00:00", name: "number", status: "대기중", action: "취소하기"},
  {id: 3, date: "2024-11-11 23:00:00", name: "number", status: "수락", action: ""},
  {id: 4, date: "2024-11-11 23:00:00", name: "number", status: "거절", action: ""},
];

const Page = () => {
  return (
      <>
        {/* 프로젝트 정보 */}
        <InfoList
            items={PROJECT_INFO}
            renderItem={(item) => (
                <>
                  <p>{item.label}</p>
                  <p>~~</p>
                </>
            )}
            classNames={{
              list: "grid grid-cols-2 gap-6",
              item: "flex items-center gap-10"
            }}
        />

        {/* Team 소개 */}
        <InfoSection title="My Team 소개">
          <p className="mt-5">프로젝트 설명 ...</p>
        </InfoSection>

        {/* 지원 현황 */}
        <InfoSection title="지원 현황">
          {/* 지원 현황 리스트 */}
          <article className="bg-gray-50 shadow-md rounded-lg overflow-hidden">
            {/* 헤더 */}
            <header className="grid grid-cols-4 gap-4 px-4 py-3 bg-gray-200 text-gray-700 font-semibold">
              <p>신청 일시</p>
              <p>닉네임</p>
              <p>지원 상태</p>
              <p className="text-center">지원 취소</p>
            </header>

            {/* 지원 항목 */}
            <InfoList
                items={APPLICATION_LIST}
                renderItem={(item) => (
                    <>
                      <p>{item.date}</p>
                      <p>{item.name}</p>
                      <p className={`font-semibold ${item.status === "거절" ? "text-red-500" : item.status === "수락" ? "text-green-500" : "text-yellow-500"}`}>
                        {item.status}
                      </p>
                      <div className="text-center">
                        {item.action ? (
                            <button className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600">
                              {item.action}
                            </button>
                        ) : (
                            "-"
                        )}
                      </div>
                    </>
                )}
                classNames={{
                  item: "grid grid-cols-4 gap-4 px-4 py-3 border-b text-gray-800"
                }}
            />
          </article>
        </InfoSection>
      </>
  );
};

export default Page;