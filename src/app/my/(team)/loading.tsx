import React from "react";

const loading = () => {
  return (
    <ul className="grid grid-cols-2 gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i, index) => (
        <li key={index}>
          <div className="w-[427px] h-[132px] bg-gray-200 rounded-lg animate-pulse"></div>
        </li>
      ))}
    </ul>
  );
};

export default loading;
