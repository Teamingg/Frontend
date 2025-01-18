import React from 'react';

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
  { id: 1, date: "2024-11-11 23:00:00", name: "number", status: "대기중", action: "취소하기" },
  { id: 2, date: "2024-11-11 23:00:00", name: "number", status: "대기중", action: "취소하기" },
  { id: 3, date: "2024-11-11 23:00:00", name: "number", status: "수락", action: "" },
  { id: 4, date: "2024-11-11 23:00:00", name: "number", status: "거절", action: "" },
];

const Page = () => {
  return (
      <div className="mx-16 my-10 p-6 bg-gray-100 min-h-full rounded-2xl">
        <h1 className="mb-5 text-2xl font-bold">My Team</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          {/* 프로젝트 정보 */}
          <ul className="grid grid-cols-2 gap-6">
            {PROJECT_INFO.map(item => (
                <li key={item.id} className="flex items-center gap-10">
                  <p>{item.label}</p>
                  <p>~~</p>
                </li>
            ))}
          </ul>

          {/* Team 소개 */}
          <section className="mt-16">
            <h2 className="text-xl font-bold">My Team 소개</h2>
            <p className="mt-5">프로젝트 설명 ...</p>
          </section>
          
          {/* 지원 현황 */}
          <section className="mt-16">
            <h2 className="text-xl font-bold">지원 현황</h2>

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
              <ul>
                {APPLICATION_LIST.map((app) => (
                    <li key={app.id} className="grid grid-cols-4 gap-4 px-4 py-3 border-b text-gray-800">
                      <p>{app.date}</p>
                      <p>{app.name}</p>
                      <p className={`font-semibold ${app.status === "거절" ? "text-red-500" : app.status === "수락" ? "text-green-500" : "text-yellow-500"}`}>
                        {app.status}
                      </p>
                      <div className="text-center">
                        {app.action ? (
                            <button className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600">
                              {app.action}
                            </button>
                        ) : (
                            "-"
                        )}
                      </div>
                    </li>
                ))}
              </ul>
            </article>
          </section>
        </div>
      </div>
  );
};

export default Page;