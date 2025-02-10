"use client";

import { useGetMyTeam } from "@/hooks/queries/my";
import MyTeamItem from "../_components/MyTeamItem";
import MyTeamSkeleton from "../_components/MyTeamSkeleton";

const MyProjectTeamPage = () => {
  const { data: teamList, isFetching } = useGetMyTeam("project");

  return (
    <>
      {((!isFetching && !teamList) || teamList?.length === 0) && (
        <p className="px-3">아직 참여중인 프로젝트 팀이 없습니다.</p>
      )}

      {isFetching && <MyTeamSkeleton />}

      {!isFetching && teamList && (
        <ul className="gap-4 md:grid md:grid-cols-2 flex flex-col max-h-[870px] overflow-y-scroll scrollbar-hide">
          {teamList.map((team) => (
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
