import React from 'react';

interface StatusCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ icon, value, label }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
      {icon}
      <h4 className="text-xl font-bold mt-3">{value}</h4>
      <p className="text-gray-600 text-sm">{label}</p>
    </div>
  );
};

export default StatusCard;