import React from 'react';

const TeamInfoSection = ({children}: {children: React.ReactNode}) => {
  return (
    <section className="mt-4 p-10 border-t">
      <h3 className="text-xl text-center font-bold mb-6">팀 소개</h3>
      {children}
    </section>
  );
};

export default TeamInfoSection;