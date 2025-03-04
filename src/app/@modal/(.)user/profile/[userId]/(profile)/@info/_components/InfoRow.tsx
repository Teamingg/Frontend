import React from "react";

interface InfoRowProps {
  title: string;
  content: string;
}

const InfoRow = ({ title, content }: InfoRowProps) => {
  return (
    <p className="grid grid-cols-1 ">
      <span className="text-gray-700">{title}</span>
      <span>{content}</span>
    </p>
  );
};

export default InfoRow;
