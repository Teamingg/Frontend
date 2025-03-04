"use client";

import MyTeamItem from "@/app/my/(Team)/_components/MyTeamItem";
import { useGetUserTeam } from "@/hooks/queries/user";

import { useParams } from "next/navigation";
import React from "react";

const UserProfileMentoringTeamPage = () => {
  const { userId } = useParams();

  const { data: teamList } = useGetUserTeam({
    category: "mentoring",
    userId: userId as string,
  });

  if (!teamList) {
    return null;
  }

  console.log(teamList);
  return (
    <>
      <ul className="flex flex-col gap-4 pt-4 max-h-[590px] overflow-y-scroll scrollbar-hide">
        {teamList.map((team) => (
          <MyTeamItem
            name={team.name}
            key={team.id}
            id={team.id}
            status={team.status}
            role={team.authority}
            category={"mentoring"}
            // replace={true}
          />
        ))}
      </ul>
    </>
  );
};

export default UserProfileMentoringTeamPage;