import {ReactNode} from "react";
import SectionLayout from "@/layout/DetailSection/SectionLayout";
import {useQuery} from "@tanstack/react-query";
import {useParams, usePathname} from "next/navigation";
import {fetchTeamPageData} from "@/service/api/team-page/fetchTeamPageData";
import {ProjectInfo, TeamPageInfo} from "@/types/team/teamPageInfo";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import Link from "next/link";

const Layout = ({
  children
} : {
  children: ReactNode
}) => {
  /*const params = useParams();
  const path = usePathname();
  const currentPath = path.split("/").pop();

  const {data, error, isLoading} = useQuery<TeamPageInfo | ProjectInfo>({
    queryKey: ["teamInfo", params.page_type, params.team_id],
    queryFn: () =>
        fetchTeamPageData<TeamPageInfo | ProjectInfo>(
            String(params.page_type),
            String(params.team_id),
            "info"),
    enabled: currentPath === "info" && !!params.page_type && !!params.team_id,
  });

  // 로딩 및 에러처리
  if (isLoading) return <LoadingSpinner/>;
  if (error) return <div>Error fetching data</div>;

  // ✅ 타입 가드 적용
  let isUserAuthority = false;
  const firstPath = `/Team/${params.page_type}/${params.team_id}`;

  if (params.page_type === "project") {
    const projectData = data as ProjectInfo;
    isUserAuthority = projectData.userRole === "LEADER";
  } else {
    const teamData = data as TeamPageInfo;
    isUserAuthority = teamData.authority === "OWNER";
  }

  // 네비게이션 구선
  const leaderNavigation = {label: "멤버 및 지원자 현황", path: `${firstPath}/leader`};
  const memberNavigation = {label: "멤버", path: `${firstPath}/member`};
  const teamPagePaths = [
    {label: "팀 소개", path: `${firstPath}/info`},
    isUserAuthority ? leaderNavigation : memberNavigation,
    {label: "작성한 게시글", path: `${firstPath}/post`},
  ];*/

  return (
      /*<SectionLayout
          sectionTitle="My Team"
          navPaths={teamPagePaths}
          isAsideNav={true}>
        <section className="h-full min-h-full p-6 bg-gray-100">
          <div className="h-full bg-white shadow-md rounded-lg p-6">
            {children}
          </div>
        </section>
      </SectionLayout>*/
      <div className='w-full py-10 flex justify-center max-w-sm md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto md:mx-auto'>
        <div className='w-1/3 '>
          <aside>
            <h3>Team(Project) 대시보드</h3>
            {/*<ul>
              {teamPagePaths.map((path, i) => (
                  <li><Link href={path.path}>{path.label}</Link></li>
              ))}
            </ul>*/}
          </aside>
        </div>
        <section className="w-2/3 h-full min-h-full p-6 bg-gray-100">
          {children}
        </section>
      </div>
  );
};

export default Layout;