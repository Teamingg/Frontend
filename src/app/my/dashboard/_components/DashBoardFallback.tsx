import React from "react";

const DashBoardFallback = () => {
  return (
    <div>
      <div className="w-full h-[279px] bg-gray-200 animate-pulse p-6 rounded-lg mb-10" />
      <div className="grid grid-cols-3 gap-6">
        {Array(3)
          .fill("")
          .map((_, idx) => (
            <div
              key={idx}
              className="bg-gray-200 rounded-lg animate-pulse w-[410px] h-[155px] p-6"
            />
          ))}
      </div>
    </div>
  );
};

export default DashBoardFallback;
