import {ReactNode} from "react";
import TeamHeader from "@/components/Team/TeamHeader";
import {queryclient} from "@/lib/getQueryClient";
import {getProjectMembers, getTeamMembers} from "@/service/api/team";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";

const Layout = async ({
  children,
  params,
} : {
  children: ReactNode,
  params: Promise<{ type: string; id: string; }>;
}) => {
  const { type, id } = await params;
  const teamId = id.slice(0, -2);
  if (type === 'project') {
    await Promise.all([
      queryclient.prefetchQuery({
        queryKey: ["projectMemberStatus", id],
        queryFn: () => getTeamMembers(type, id),
      }),
      
      queryclient.prefetchQuery({
        queryKey: ["projectMember", id],
        queryFn: () => getProjectMembers(id),
      })
    ]);
  } else if (type === 'mentoring') {
    await queryclient.prefetchQuery({
      queryKey: ["mentoringMember", id],
      queryFn: () => getTeamMembers(type, id),
    });
  }
  
  const navItems = [
    {label: '대시보드', path: `/team/${type}/${id}/dashboard`},
    {label: '멤버', path: `/team/${type}/${id}/member`},
    {label: '게시글', path: `/team/${type}/${id}/post`},
  ];

  return (
      <div className='w-full min-h-[calc(100vh-72px-62px)] py-10 flex flex-col items-center max-w-sm md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto md:mx-auto'>
        <HydrationBoundary state={dehydrate(queryclient)}>
          <TeamHeader navigation={navItems}/>
          <section className="w-2/3 h-full min-h-full p-6 mx-auto">
            {children}
          </section>
        </HydrationBoundary>
      </div>
  );
};

export default Layout;