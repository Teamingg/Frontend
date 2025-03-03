import React from 'react';

const TeamCard = () => {
  return (
      <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold">쇼핑몰 웹사이트 개발</h3>
            <p className="text-gray-500 text-sm">프로젝트 ID: WEB2501</p>
            <span className="bg-blue-100 text-primary px-2 py-1 text-xs rounded-full">팀 프로젝트</span>
          </div>
          <span className="bg-green-100 text-green-600 px-2 py-1 text-xs rounded-full">진행중</span>
        </div>

        <div>
          <p className="text-sm text-gray-500">시작일</p>
          <p className="font-semibold">2025년 1월 15일</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">종료 예정일</p>
          <p className="font-semibold">2025년 4월 15일</p>
        </div>

        <div className="h-2 bg-gray-200 rounded-md overflow-hidden">
          <div className="h-full bg-primary w-3/4"></div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-600">진행률: 75%</span>
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