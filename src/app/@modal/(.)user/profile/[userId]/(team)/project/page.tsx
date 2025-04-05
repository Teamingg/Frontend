"use client";

import { useGetUserTeam } from "@/hooks/queries/user";

import { useParams } from "next/navigation";
import MyTeamItem from "../_components/MyTeamItem";

const UserProfileProjectTeamPage = () => {
  const { userId } = useParams();
  const { data: teamList } = useGetUserTeam({
    category: "project",
    userId: userId as string,
  });

  if (!teamList) {
    return null;
  }
  return (
    <>
      <ul className="flex flex-col gap-4 pt-4 max-h-[590px] overflow-y-scroll no-scrollbar">
        {teamList.length === 0 && (
          <p className="p-4">참여중인 프로젝트 팀이 없습니다</p>
        )}
        {teamList.length > 0 &&
          teamList.map((team) => (
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
    </>
  );
};

export default UserProfileProjectTeamPage;
