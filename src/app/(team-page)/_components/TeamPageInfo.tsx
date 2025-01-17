import React from 'react';
import StatusButton from "@/app/(team-page)/_components/StatusButton";
import TeamInfoSection from "@/app/(team-page)/_components/TeamInfoSection";
import TeamInfoItem from "@/app/(team-page)/_components/TeamInfoItem";
import TeamDescription from "@/app/(team-page)/_components/TeamDescription";
import ProjectTeamInfoTecStack from "@/app/(team-page)/_components/ProjectTeamInfoTecStack";

interface TeamInfoItem {
  label: string;
  infoData: string | number;
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
            if (item.label !== "기술스택") {
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
                <ProjectTeamInfoTecStack key={item.label}/>
              )
            }
          })}
        </ul>

        {/* My Team 소개*/}
        <TeamDescription content={content || "프로젝트 설명 ..."}/>

        {/*수정하기 버튼*/}
        {authority === "LEADER" && (
          <div className="flex justify-center mt-8">
            <button className="bg-blue-500 text-white px-6 py-2 rounded">수정하기</button>
          </div>
        )}
      </TeamInfoSection>
    </div>
  );
};

export default TeamPageInfo;