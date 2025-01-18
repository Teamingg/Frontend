import React from 'react';

const MemberTableList = ({title, children}) => {
  return (
    <>
      <h2 className={`text-xl font-bold mb-4 ${title === "팀원" ? "" : "mt-8"}`}>{title}</h2>
      <div className="w-full flex flex-col border border-gray-300 rounded-md">
        {children}
      </div>
    </>
  );
};

export default MemberTableList;