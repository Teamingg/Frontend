import React from 'react';
import {FaInfoCircle} from "react-icons/fa";

const MentoringInfo: React.FC<MentoringInfo> = ({ data }) => {
  return (
      <div className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-xl font-semibold flex items-center mb-6">
          <FaInfoCircle className="mr-2 text-primary" /> 멘토링 정보
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <h4 className="text-gray-500 text-sm">멘토링 기간</h4>
              <p className="font-medium">{data.dto.startDate} ~ {data.dto.endDate}</p>
            </div>

            <div className="mb-4">
              <h4 className="text-gray-500 text-sm">멘토링 카테고리</h4>
              <p className="font-medium">{data.dto.categories.join(", ")}</p>
            </div>

            <div className="mb-4">
              <h4 className="text-gray-500 text-sm">멘토링 횟수</h4>
              <p className="font-medium">{data.dto.mentoringCnt}회</p>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <h4 className="text-gray-500 text-sm">모집 상태</h4>
              <p className="font-medium">{data.dto.status}</p>
            </div>

            <div className="mb-4">
              <h4 className="text-gray-500 text-sm">팀 링크</h4>
              <a href={data.dto.link} className="text-primary font-medium hover:underline">
                멘토링 페이지 이동
              </a>
            </div>
          </div>
        </div>

        {/* 참여한 사용자 리스트 */}
        <div className="mt-6">
          <h4 className="text-gray-500 text-sm">참여자 목록</h4>
          <ul className="list-disc pl-6 mt-2">
            {data.userParticipations.map((user, index) => (
                <li key={index} className="text-gray-700">
                  {user.username} ({user.status})
                </li>
            ))}
          </ul>
        </div>
      </div>
  );
};

export default MentoringInfo;