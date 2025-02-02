"use client";

import useGetMyProjectTeam from "@/hooks/team/project/useGetMyProjectTeam";
import MyTeamItem from "../_components/MyTeamItem";
import MyTeamSkeleton from "../_components/MyTeamSkeleton";

const MyProjectTeamPage = () => {
  const { projectTeam, isFetching } = useGetMyProjectTeam();

  return (
    <>
      {((!isFetching && !projectTeam) || projectTeam?.length === 0) && (
        <p className="px-3">아직 참여중인 프로젝트 팀이 없습니다.</p>
      )}

      {isFetching && <MyTeamSkeleton />}

      {!isFetching && projectTeam && (
        <ul className="gap-4 grid grid-cols-2">
          {projectTeam.map((team) => (
            <MyTeamItem
              name={team.teamName}
              key={team.projectTeamId}
              id={team.projectTeamId}
              status={team.status}
              role={team.role}
              category={"project"}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default MyProjectTeamPage;
