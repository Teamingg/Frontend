import React from 'react';
import StatusButton from "@/app/(team-page)/[page_type]/[team_id]/(member)/info/_components/StatusButton";
import TeamInfoSection from "@/app/(team-page)/[page_type]/[team_id]/(member)/info/_components/TeamInfoSection";
import TeamInfoItem from "@/app/(team-page)/[page_type]/[team_id]/(member)/info/_components/TeamInfoItem";
import TeamDescription from "@/app/(team-page)/[page_type]/[team_id]/(member)/info/_components/TeamDescription";
import ProjectTeamInfoTecStack from "@/app/(team-page)/[page_type]/[team_id]/(member)/info/_components/ProjectTeamInfoTecStack";
import Link from "next/link";

interface TeamInfoItem {
  label: string;
  infoData?: string | number;
  stacks?: string[] | undefined;
}

interface TeamPageInfo {
  status: string;
  infoData: TeamInfoItem[];
  content: string;
  authority: "LEADER" | "MEMBER";
}

const TeamPageInfo: React.FC<TeamPageInfo> = (
    {
      status,
      infoData,
      content,
      authority
    }) => {
  return (
      <div className="h-full p-4 border rounded bg-white overflow-y-auto">
        {/*모집 상태*/}
        <StatusButton status={status}/>

        {/*오른쪽 팀 정보 섹션*/}
        <TeamInfoSection>
          <ul className="flex flex-col gap-4 mb-6">
            {infoData.map(item => {
              if (item.stacks === undefined) {
                return (
                    <TeamInfoItem
                        key={item.label}
                        label={item.label}
                        infoData={typeof item.infoData === "string"
                            ? item.infoData
                            : item.infoData !== undefined
                                ? item.infoData.toString()
                                : "정보 없음"}
                        className={"flex justify-between items-center"}
                    />
                )
              } else {
                return (
                    /* 기술스택 아이콘 */
                    <ProjectTeamInfoTecStack
                        key={item.label}
                        stacks={item.stacks ?? []}
                    />
                )
              }
            })}
          </ul>

          {/* My Team 소개*/}
          <TeamDescription content={content || "프로젝트 설명 ..."}/>

          {/*수정하기 버튼*/}
          {authority === "LEADER" && (
              <div className="mt-8 flex justify-end">
                <Link href={"#"} className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-400">
                  수정하기
                </Link>
              </div>
          )}
        </TeamInfoSection>
      </div>
  );
};

export default TeamPageInfo;