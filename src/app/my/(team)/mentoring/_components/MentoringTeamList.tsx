"use client";

import Link from "next/link";
import useGetMyMentoringTeam from "@/hooks/team/mentoring/useGetMyMentoringTeam";

const MentoringTeamList = () => {
  const { mentoringTeam } = useGetMyMentoringTeam();
  return (
    <>
      {!mentoringTeam ||
        (mentoringTeam.length === 0 && (
          <p className="px-3">아직 참여중인 멘토링 팀이 없습니다.</p>
        ))}

      {mentoringTeam && (
        <ul className="grid grid-cols-2 gap-4">
          {mentoringTeam.map((team) => (
            <li key={team.id} className="bg-white shadow-sm p-6 rounded-xl">
              <div className="flex gap-4 items-center justify-between mb-6">
                <h4 className="font-bold text-lg">{team.name}</h4>
                <span className="py-1 px-2 text-xs rounded-full bg-green-600 text-white">
                  {team.status === "RECRUITING" && "모집중"}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500">
                  {team.authority === "OWNER" && "팀장"}
                </span>
                <Link
                  href={`/my/team/${team.id}`}
                  className="py-1 px-4 rounded-md text-base text-white bg-primary"
                >
                  멘토링 팀 바로가기
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MentoringTeamList;
