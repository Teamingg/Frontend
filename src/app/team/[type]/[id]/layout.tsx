import {ReactNode} from "react";
import TeamHeader from "@/components/Team/TeamHeader";
import {queryclient} from "@/lib/getQueryClient";
import {getProjectMembers, getTeamMembers} from "@/service/api/team";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";
import {myPageKeys} from "@/hooks/queries/my";
import {getMyInfo} from "@/service/api/my";
import {redirect} from "next/navigation";

const Layout = async ({
  children,
  params,
}: {
  children: ReactNode,
  params: Promise<{ type: string; id: string; }>;
}) => {
  const {type, id} = await params;
  const user = await queryclient.fetchQuery({
    queryKey: myPageKeys.info,
    queryFn: getMyInfo,
  });
  
  let members = [];
  if (type === "project") {
    members = await queryclient.fetchQuery({
      queryKey: ["projectMember", id],
      queryFn: () => getProjectMembers(id),
    });
  } else if (type === "mentoring") {
    members = await queryclient.fetchQuery({
      queryKey: ["mentoringMember", id],
      queryFn: () => getTeamMembers(type, id),
    });
  }
  
  
  const navItems = [
    {label: '대시보드', path: `/team/${type}/${id}/dashboard`},
    {label: '멤버', path: `/team/${type}/${id}/member`},
    {label: '게시글', path: `/team/${type}/${id}/post`},
  ];
  
  console.log('로그인한 사용자')
  console.log(user)
  console.log('팀원')
  console.log(members)
  
  // ✅ 사용자가 팀원인지 확인 (서버에서 직접 체크)
  const isTeamMember = members.some((member) => member.userId === user?.id && (member.role === "MEMBER" || member.role === "OWNER"));
  
  // ❌ 팀원이 아니라면 서버에서 즉시 리디렉트
  if (!isTeamMember) redirect(`/team/${type}/${id}/viewer`);
  console.log(isTeamMember)
  
  return (
    <HydrationBoundary state={dehydrate(queryclient)}>
      <div className='w-full min-h-[calc(100vh-72px-62px)] py-10 flex flex-col items-center max-w-sm md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto md:mx-auto'>
        {isTeamMember && <TeamHeader navigation={navItems}/>}
        <section className="w-2/3 h-full min-h-full p-6 mx-auto">
          {children}
        </section>
      </div>
    </HydrationBoundary>
  );
};

export default Layout;