"use client";

import { useGetUserTeam } from "@/hooks/queries/user";

import { useParams } from "next/navigation";
import React from "react";
import MyTeamItem from "../_components/MyTeamItem";

const UserProfileMentoringTeamPage = () => {
  const { userId } = useParams();

  const { data: teamList } = useGetUserTeam({
    category: "mentoring",
    userId: userId as string,
  });

  if (!teamList) {
    return null;
  }

  return (
    <>
      <ul className="flex flex-col gap-4 pt-4 max-h-[590px] overflow-y-scroll  no-scrollbar">
        {teamList.length === 0 && (
          <p className="p-4">참여중인 멘토링 팀이 없습니다.</p>
        )}
        {teamList.length > 0 &&
          teamList.map((team) => (
            <MyTeamItem
              name={team.teamName}
              key={team.id}
              id={team.id}
              status={team.status}
              role={team.role}
              category={"mentoring"}
            />
          ))}
      </ul>
    </>
  );
};

export default UserProfileMentoringTeamPage;
