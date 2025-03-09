import React from 'react';

const ProgressBar = ({
  percentage
} : {
  percentage: number
}) => {
  return (
    <div className="w-full bg-gray-200 h-2 rounded mt-2">
      <div className="h-2 bg-primary rounded" style={{ width: `${Number(percentage)}%` }}></div>
    </div>
  );
};

export default ProgressBar;