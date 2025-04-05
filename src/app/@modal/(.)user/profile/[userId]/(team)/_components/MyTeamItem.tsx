import Status from "@/components/Status";
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
}

const MyTeamItem = ({ id, name, status, role, category }: MyTeamItemProps) => {
  return (
    <li key={id} className="bg-white shadow-sm p-6 rounded-xl">
      <div className="flex gap-4 items-center justify-between mb-6">
        <h4 className="font-bold text-lg">{name}</h4>
        <Status status={status} />
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-500">{checkRole(role)}</span>
        <Link
          href={`/team/${category}/${id}/dashboard`}
          className="py-1 px-4 rounded-md text-base text-white bg-primary"
        >
          {`${category === "project" ? "프로젝트" : "멘토링"} 팀 바로가기`}
        </Link>
      </div>
    </li>
  );
};

export default MyTeamItem;
