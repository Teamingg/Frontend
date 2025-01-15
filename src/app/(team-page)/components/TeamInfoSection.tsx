import React from 'react';

const TeamInfoSection = ({children}: {children: React.ReactNode}) => {
  return (
    <section className="border-t mt-4 pt-4">
      <h3 className="text-xl font-bold mb-6">팀 소개</h3>
      {children}
    </section>
  );
};

export default TeamInfoSection;