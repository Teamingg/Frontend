import React from 'react';

const TeamCard = () => {
  return (
      <div className='w-1/3 p-4 bg-blue-300 rounded-lg'>
        <div>
          <h4 className='flex items-center text-xl'>
            <span>투두 리스트</span>
            <span className='p-1 text-xs bg-green-200 rounded-lg'>완료</span>
          </h4>
          <p>시작일</p>
        </div>
        <p>소개</p>
        <div className='flex justify-between items-center'>
          <p>프로젝트 진행률</p>
        </div>
      </div>
  );
};

export default TeamCard;