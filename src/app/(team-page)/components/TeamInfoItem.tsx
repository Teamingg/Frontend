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
      <label className="block text-gray-600">{label}</label>
      <p>{infoData}</p>
    </li>
  );
};

export default TeamInfoItem;