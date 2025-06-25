import React from "react";
import Link from "next/link";
import ProgressBar from "@/components/DataDisplay/ProgressBar";

const TeamCard = ({ title, teamId, status, start, end, progress, href }) => {
  const cardDate = [
    { label: "시작일", date: start },
    { label: "종료 예정일", date: end },
  ];
  return (
    <Link
      href={href}
      className="border border-gray-200 rounded-lg p-4 shadow-sm"
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="bg-blue-100 text-primary px-2 py-1 text-xs rounded-full inline-block mb-1">
        팀 프로젝트
      </div>
      <div
        className={`w-12 h-6 px-2 py-1 text-xs rounded-full ${
          status === "RECRUITING"
            ? "bg-green-100 text-green-600"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        {status === "RECRUITING" ? "모집중" : "완료"}
      </div>

      {cardDate.map((item, index) => (
        <div key={index} className="mt-2">
          <p className="text-sm text-gray-500">{item.label}</p>
          <p className="font-semibold">{item.date}</p>
        </div>
      ))}

      <ProgressBar percentage={progress} />
      <div className="flex flex-col justify-between mt-2">
        <span className="text-sm text-gray-600">진행률: {progress}%</span>
        <span className="text-sm text-gray-600">남은기간: 30일</span>
      </div>
    </Link>
  );
};

export default TeamCard;
