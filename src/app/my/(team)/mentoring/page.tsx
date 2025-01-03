"use client";

import useGetMyMentoringTeam from "@/hooks/team/mentoring/useGetMyMentoringTeam";
import MyTeamItem from "../_components/MyTeamItem";

const MyMentoringTeamPage = () => {
  const { mentoringTeam } = useGetMyMentoringTeam();

  return (
    <>
      {(!mentoringTeam || mentoringTeam.length === 0) && (
        <p className="px-3">아직 참여중인 멘토링 팀이 없습니다.</p>
      )}

      {mentoringTeam && (
        <ul className="grid grid-cols-2 gap-4">
          {mentoringTeam.map((team) => (
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
