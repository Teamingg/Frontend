"use client";

import { useGetMyTeam } from "@/hooks/queries/my";
import MyTeamItem from "../_components/MyTeamItem";
import MyTeamSkeleton from "../_components/MyTeamSkeleton";

const MyMentoringTeamPage = () => {
  const { data: teamList, isFetching } = useGetMyTeam("mentoring");

  return (
    <>
      {((!isFetching && !teamList) || teamList?.length === 0) && (
        <p className="px-3">아직 참여중인 멘토링 팀이 없습니다.</p>
      )}

      {isFetching && <MyTeamSkeleton />}

      {!isFetching && teamList && (
        <ul className="grid grid-cols-2 gap-4">
          {teamList.map((team) => (
            <MyTeamItem
              name={team.name}
              key={team.id}
              id={team.id}
              status={team.status}
              role={team.authority}
              category={"mentoring"}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default MyMentoringTeamPage;
