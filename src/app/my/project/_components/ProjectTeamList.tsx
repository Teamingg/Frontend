"use client";

import Link from "next/link";
import useGetMyProjectTeam from "../../../../hooks/team/project/useGetMyProjectTeam";

const ProjectTeamList = () => {
  const { projectTeam } = useGetMyProjectTeam();
  if (!projectTeam) {
    return null;
  }
  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-primary text-xl mb-4">참여 중인 팀 목록</h2>
      <ul className="grid-cols-2">
        {projectTeam.map((team) => (
          <li key={team.projectTeamId} className="border p-4 rounded-lg">
            <h4 className="mb-6 font-bold text-lg">{team.teamName}</h4>
            <div className="flex justify-between items-center">
              <div className="text-lg">
                <span>{team.status === "RECRUITING" && "모집중"}</span>
                <span className="px-2">|</span>
                <span className="text-gray-500">
                  {team.role === "OWNER" && "팀장"}
                </span>
              </div>
              <Link href="*" className="border py-1 px-4 rounded-md block">
                프로젝트 팀 바로가기
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectTeamList;
