import {ReactNode} from "react";
import TeamHeader from "@/components/Team/TeamHeader";
import {queryclient} from "@/lib/getQueryClient";
import {getProjectMembers} from "@/service/api/team";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";
import {myPageKeys} from "@/hooks/queries/my";
import {getMyInfo} from "@/service/api/my";
import {redirect} from "next/navigation";
import {getServerTeamMembers} from "@/service/api/team/participate";
import {getServerMentoringTeam} from "@/service/api/team/team";

const Layout = async ({
  children,
  params,
}: {
  children: ReactNode,
  params: Promise<{ type: string; id: string; }>;
}) => {
  const {type, id} = await params;
  const navItems = [
    {label: '대시보드', path: `/team/${type}/${id}/dashboard`},
    {label: '멤버', path: `/team/${type}/${id}/member`},
    {label: '게시글', path: `/team/${type}/${id}/post`},
  ];
  
  const team = await queryclient.fetchQuery({
    queryKey: ["MentoringTeam", id],
    queryFn: () => getServerMentoringTeam(id),
  });
  
  // ❌ 팀원이 아니라면 서버에서 즉시 리디렉트
  const isTeamMember = team.role === 'NoAuth';
  if (isTeamMember) redirect(`/team/${type}/${id}/viewer`);
  
  console.log('팀페이지 최상위 레이아웃 실행 로그')
  console.log(team)
  
  return (
    <HydrationBoundary state={dehydrate(queryclient)}>
      <div className='w-full min-h-[calc(100vh-72px-62px)] py-10 flex flex-col items-center max-w-sm md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto md:mx-auto'>
        {team.role !== 'NoAuth' && <TeamHeader navigation={navItems}/>}
        <section className="w-2/3 h-full min-h-full p-6 mx-auto">
          {children}
        </section>
      </div>
    </HydrationBoundary>
  );
};

export default Layout;