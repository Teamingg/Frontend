import { TeamStatus } from "@/types/team/teamStatus";
import React from "react";

interface StatusProps {
  status: TeamStatus;
  // RECRUITING | COMPLETED | WORKING;
}

const Status = ({ status }: StatusProps) => {
  const bgColor =
    status === "RECRUITING"
      ? "bg-green-500"
      : status === "COMPLETED"
      ? "bg-gray-500"
      : status === "WORKING"
      ? "bg-primary"
      : undefined;

  return (
    <div className={`py-1 px-2 text-xs rounded-full ${bgColor} text-white`}>
      <span>
        {status === "RECRUITING"
          ? "모집중"
          : status === "COMPLETED"
          ? "모집완료"
          : status === "WORKING"
          ? "진행중"
          : ""}
      </span>
    </div>
  );
};

export default Status;
