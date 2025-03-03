"use client";

import MyTeamItem from "@/app/my/(Team)/_components/MyTeamItem";
import { useGetUserTeam } from "@/hooks/queries/user";

import { useParams } from "next/navigation";

const UserProfileProjectTeamPage = () => {
  const { userId } = useParams();
  const { data: teamList } = useGetUserTeam({
    category: "project",
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
            name={team.teamName}
            key={team.projectTeamId}
            id={team.projectTeamId}
            status={team.status}
            role={team.role}
            category={"project"}
            // replace={true}
          />
        ))}
      </ul>
    </>
  );
};

export default UserProfileProjectTeamPage;