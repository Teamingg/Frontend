import React from 'react';

const TeamCard = ({
  title,
  teamId,
  status,
  start,
  end,
  progress,
}) => {
  return (
      <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-gray-500 text-sm">프로젝트 ID: {teamId}</p>
            <span className="bg-blue-100 text-primary px-2 py-1 text-xs rounded-full">팀 프로젝트</span>
          </div>
          <span className={`px-2 py-1 text-xs rounded-full ${
              status === '진행중' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
          }`}>
            {status}
          </span>
        </div>

        <div>
          <p className="text-sm text-gray-500">시작일</p>
          <p className="font-semibold">{start}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">종료 예정일</p>
          <p className="font-semibold">{end}</p>
        </div>

        <div className="h-2 bg-gray-200 rounded-md overflow-hidden">
          <div className="h-full bg-primary" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-600">진행률: {progress}%</span>
          <span className="text-sm text-gray-600">남은 기간: 30일</span>
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <button className="px-3 py-1 border border-blue-500 text-primary rounded-md">수정</button>
          <button className="px-3 py-1 bg-primary text-white rounded-md">상세보기</button>
        </div>
      </div>
  );
};

export default TeamCard;