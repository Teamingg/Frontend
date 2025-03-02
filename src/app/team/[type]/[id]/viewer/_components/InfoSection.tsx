import React from 'react';

interface infoSectionProps {
  title: string;
  children: React.ReactNode;
}

const InfoSection = ({title, children}: infoSectionProps) => {
  return (
      <section className="mt-16">
        <h2 className="text-xl font-bold">{title}</h2>
        {children}
      </section>
  );
};

export default InfoSection;