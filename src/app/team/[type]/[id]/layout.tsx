import {ReactNode} from "react";
import {queryclient} from "@/lib/getQueryClient";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";
import {getServerMentoringTeam, getServerProjectInfo} from "@/service/api/team/team";
import TeamContainer from "@/layout/Team/TeamContainer";

const Layout = async ({
  children,
  params,
}: {
  children: ReactNode,
  params: Promise<{ type: string; id: string; }>;
}) => {
  const {type, id} = await params;
  let team = [];
  
  if (type === 'project') {
    team = await queryclient.fetchQuery({
      queryKey: ["MentoringTeam", id],
      queryFn: () => getServerMentoringTeam(id),
    });
  } else if (type === 'team') {
    team = await queryclient.fetchQuery({
      queryKey: ["ProjectTeam", id],
      queryFn: () => getServerProjectInfo(id),
    });
  }
  
  const navItems = [
    {label: '대시보드', path: `/team/${type}/${id}/dashboard`},
    {label: '멤버', path: `/team/${type}/${id}/member`},
    {label: '게시글', path: `/team/${type}/${id}/post`},
  ];
  console.log('팀페이지 최상위 레이아웃 실행 로그')
  
  return (
    <HydrationBoundary state={dehydrate(queryclient)}>
      <TeamContainer team={team} navItems={navItems} type={type} id={id}>
          {children}
      </TeamContainer>
    </HydrationBoundary>
  );
};

export default Layout;