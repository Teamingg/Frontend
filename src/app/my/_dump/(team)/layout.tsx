"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

const MyTeamPageLayout = ({ children }: { children: ReactNode }) => {
  let teamCategory;

  const path = usePathname();

  if (path.includes("mentoring")) {
    teamCategory = "멘토링";
  } else if (path.includes("project")) {
    teamCategory = "프로젝트";
  } else {
    return null;
  }

  return (
    <div className="bg-[#f5f5f5] rounded-lg p-4 md:p-0 md:px-4">
      <h2 className="bg-white rounded-xl shadow-sm p-4 text-primary text-base md:text-xl mb-4">
        {`참여 중인 ${teamCategory} 팀 목록`}
      </h2>
      {children}
    </div>
  );
};

export default MyTeamPageLayout;
