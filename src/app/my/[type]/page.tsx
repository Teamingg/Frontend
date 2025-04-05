import React from "react";
import { queryclient } from "@/lib/getQueryClient";
import { myPageKeys } from "@/hooks/queries/my";
import { getMyMentoringTeam, getMyProjectTeam } from "@/service/api/my";
import { TeamSection } from "@/layout/my/TeamSection";
import { TeamCard } from "@/components/Team";
import {getProgress} from "@/service/getProgress";

const Page = async ({
  params,
}: {
  params: Promise<{ type: "project" | "mentoring" }>;
}) => {
  const { type } = await params;

  const project = await queryclient.fetchQuery({
    queryKey: myPageKeys.team("project"),
    queryFn: getMyProjectTeam,
  });

  const mentoring = await queryclient.fetchQuery({
    queryKey: myPageKeys.team("mentoring"),
    queryFn: getMyMentoringTeam,
  });

  const pageType = type === "project" ? "프로젝트" : "멘토링";
  const data = type === "project" ? project : mentoring;
  
  // 시작, 진행중, 종료일자 필터링
  const now = new Date();
  const upcomingData: typeof data = [];
  const currentData: typeof data = [];
  const completedData: typeof data = [];
  
  data.forEach(item => {
    const startDate = new Date(item.startDate);
    const endDate = new Date(item.endDate);
    
    if (startDate > now) {
      upcomingData.push(item);
    } else if (startDate <= now && now <= endDate) {
      currentData.push(item);
    } else {
      completedData.push(item);
    }
  });
  
  return (
    <>
      <TeamSection
        title={`진행 예정인 ${pageType}`}
        isEmpty={upcomingData.length === 0}
        pageType={type}>
        {upcomingData.map((item, index: number) => (
          <TeamCard
            key={index}
            title={item.teamName}
            teamId={type === 'project' ? item.projectTeamId : item.id}
            status={item.status}
            start={item.startDate}
            end={item.endDate}
            progress={parseFloat(getProgress(item.startDate, item.endDate).toFixed(2)) ?? 0}
            href={`/team/${type}/${type === 'project' ? item.projectTeamId : item.id}/dashboard`}
          />
        ))}
      </TeamSection>

      {currentData.length > 0 && (
        <TeamSection
          title={`진행중인 ${pageType}`}
          isEmpty={!data || data.length === 0}
          pageType={type}>
          {currentData.map((item, index: number) => (
            <TeamCard
              key={index}
              title={item.teamName}
              teamId={type === 'project' ? item.projectTeamId : item.id}
              status={item.status}
              start={item.startDate}
              end={item.endDate}
              progress={parseFloat(getProgress(item.startDate, item.endDate).toFixed(2)) ?? 0}
              href={`/team/${type}/${type === 'project' ? item.projectTeamId : item.id}/dashboard`}
            />
          ))}
        </TeamSection>
      )}
      {completedData.length > 0 && (
        <TeamSection
          title={`종료된 ${pageType}`}
          isEmpty={!data || data.length === 0}
          pageType={type}>
          {completedData.map((item, index: number) => (
            <TeamCard
              key={index}
              title={item.teamName}
              teamId={type === 'project' ? item.projectTeamId : item.id}
              status={item.status}
              start={item.startDate}
              end={item.endDate}
              progress={parseFloat(getProgress(item.startDate, item.endDate).toFixed(2)) ?? 0}
              href={`/team/${type}/${type === 'project' ? item.projectTeamId : item.id}/dashboard`}
            />
          ))}
        </TeamSection>
      )}
    </>
  );
};

export default Page;