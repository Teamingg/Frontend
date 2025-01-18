import React from 'react';

type childrenType = { children: React.ReactNode };

const Layout = ({children}: childrenType) => {
  return (
      <div className="mx-12 my-10 p-6 bg-gray-100 min-h-full rounded-2xl">
        <h1 className="mb-5 text-2xl font-bold">My Team</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          {children}
        </div>
      </div>
  );
};

export default Layout;