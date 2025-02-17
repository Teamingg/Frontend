import Status from "@/components/common/Status";
import { TeamRole } from "@/types/team/teamRole";
import { TeamStatus } from "@/types/team/teamStatus";
import checkRole from "@/utils/checkRole";
import Link from "next/link";
import React from "react";

interface MyTeamItemProps {
  id: number;
  name: string;
  status: TeamStatus;
  role: TeamRole;
  category: "project" | "mentoring";
  replace?: boolean;
}

const MyTeamItem = ({
  id,
  name,
  status,
  role,
  category,
  replace = false,
}: MyTeamItemProps) => {
  return (
    <li
      key={id}
      className="bg-white shadow-sm p-4 md:p-6 rounded-xl text-sm md:text-base"
    >
      <div className="flex gap-4 items-center justify-between mb-4 md:mb-6">
        <h4 className="font-bold text-base md:text-lg">{name}</h4>
        <Status status={status} />
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-500">{checkRole(role)}</span>
        <Link
          href={`/team/${category}/${id}/info`}
          className="py-1 px-4 rounded-md text-sm md:text-base text-white bg-primary"
          replace={replace}
        >
          {`${category === "project" ? "프로젝트" : "멘토링"} 팀 바로가기`}
        </Link>
      </div>
    </li>
  );
};

export default MyTeamItem;
