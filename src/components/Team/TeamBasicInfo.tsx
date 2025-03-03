import React from 'react';

const TeamBasicInfo = ({
  title,
  data
} : {
  title: string;
  data: string;
}) => {
  return (
      <div className="mb-4">
        <h4 className="text-gray-500 text-sm">프로젝트 기간</h4>
        <p className="font-medium">{data}</p>
      </div>
  );
};

export default TeamBasicInfo;