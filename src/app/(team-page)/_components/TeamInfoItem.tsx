import React from 'react';

interface TeamInfoItemProps {
  key?: string | number;
  label: string;
  infoData: string;
  className?: string;
}

const TeamInfoItem = ({label, infoData, className}: TeamInfoItemProps) => {
  return (
    <li className={className}>
      <label className="block text-[19px] text-gray-600 align-center">{label}</label>
      <p className="w-10/12 p-4 text-center border border-gray-300 rounded-xl">{infoData}</p>
    </li>
  );
};

export default TeamInfoItem;