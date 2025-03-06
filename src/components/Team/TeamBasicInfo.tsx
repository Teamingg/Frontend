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
        <h4 className="text-gray-500 text-xl pb-1">{title}</h4>
        <p className="text-base font-medium">{data}</p>
      </div>
  );
};

export default TeamBasicInfo;