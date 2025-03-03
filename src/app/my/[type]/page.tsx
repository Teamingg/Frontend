import React from 'react';
import {queryclient} from "@/lib/getQueryClient";
import {myPageKeys} from "@/hooks/queries/my";
import {getMyMentoringTeam, getMyProjectTeam} from "@/service/api/my";
import TeamCardList from "@/components/Team/TeamCardList";
import {TeamSection} from "@/layout/my/TeamSection";

const Page = async ({
  params
}) => {
  const {type} = params;

  const project = await queryclient.fetchQuery({
    queryKey: myPageKeys.team("project"),
    queryFn: getMyProjectTeam,
  });

  const mentoring = await queryclient.fetchQuery({
    queryKey: myPageKeys.team("mentoring"),
    queryFn: getMyMentoringTeam,
  });

  const pageType = type === 'project' ? '프로젝트' : '멘토링';
  const data = type === 'project' ? project : mentoring;
  console.log('data');
  console.log(data);

  return (
      <>
        {/* Todo 탭 네비게이션을 생성하여 선택한 카테고리 별로 출력 예정 */}
        <TeamSection
        title={`진행중인 ${pageType}`}
        isEmpty={!data || data.length === 0}
        pageType={type}>
          {data.map((item, index: number) => (
              <TeamCardList
              key={index}
              title={item.name}
              status={item.status}
              start={item.startDate}
              end={item.endDate}
              pageType={type}
              teamId={item.id}/>
          ))}
        </TeamSection>
        <TeamSection
        title={`종료된 ${pageType}`}
        isEmpty={!data || data.length === 0}
        pageType={type}>
          {data.map((item, index: number) => (
              <TeamCardList
              key={index}
              title={item.name}
              status={item.status}
              start={item.startDate}
              end={item.endDate}
              pageType={type}
              teamId={item.id}/>
          ))}
        </TeamSection>
      </>
  );
};

export default Page;