import React from 'react';

const ProgressBar = ({
  percentage
} : {
  percentage: number
}) => {
  return (
      <div className="mt-4">
        <h4 className="text-gray-500 text-sm">프로젝트 진행률</h4>
        <div className="w-full bg-gray-200 h-2 rounded mt-2">
          <div className="h-2 bg-primary rounded" style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
  );
};

export default ProgressBar;