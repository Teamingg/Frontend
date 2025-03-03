import React from 'react';
import {queryclient} from "@/lib/getQueryClient";
import {myPageKeys} from "@/hooks/queries/my";
import {getMyMentoringTeam, getMyProjectTeam} from "@/service/api/my";
import clsx from "clsx";
import TeamCard from "@/components/team/TeamCard";

const Page = async ({
    params
}) => {
  const { type } = params;

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
  const titleClass = clsx('mb-4 text-2xl font-bold')

  return (
      <>
        <article>
          <h3 className={titleClass}>진행중인 {pageType}</h3>
          {data.map((item, index) => (
              <div key={index}>
                <TeamCard/>
              </div>
          ))}
        </article>
        <article>
          <h3 className={titleClass}>종료된 {pageType}</h3>
          {data.map((item, index) => (
              <div key={index}>
                <TeamCard/>
              </div>
          ))}
        </article>
      </>
  );
};

export default Page;