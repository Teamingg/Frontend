"use client";

import Link from "next/link";
import useGetMyProjectTeam from "../../../../../hooks/team/project/useGetMyProjectTeam";

const ProjectTeamList = () => {
  const { projectTeam } = useGetMyProjectTeam();
  return (
    <>
      {!projectTeam ||
        (projectTeam.length === 0 && (
          <p className="px-3">아직 참여중인 프로젝트 팀이 없습니다.</p>
        ))}

      {projectTeam && (
        <ul className="gap-4 grid grid-cols-2">
          {projectTeam.map((team) => (
            <li
              key={team.projectTeamId}
              className="bg-white shadow-sm p-6 rounded-xl"
            >
              <div className="flex gap-4 items-center justify-between mb-6">
                <h4 className="font-bold text-lg">{team.teamName}</h4>
                <span className="py-1 px-2 text-xs rounded-full bg-green-600 text-white">
                  {team.status === "RECRUITING" && "모집중"}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500">
                  {team.role === "OWNER" && "팀장"}
                </span>
                <Link
                  href={`/my/team/${team.projectTeamId}`}
                  className="py-1 px-4 rounded-md text-base text-white bg-primary"
                >
                  프로젝트 팀 바로가기
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ProjectTeamList;
