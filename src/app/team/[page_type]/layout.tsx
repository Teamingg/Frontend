import {ReactNode} from "react";
import SectionLayout from "@/layout/DetailSection/SectionLayout";
import {useQuery} from "@tanstack/react-query";
import {useParams, usePathname} from "next/navigation";
import {fetchTeamPageData} from "@/service/api/team-page/fetchTeamPageData";
import {ProjectInfo, TeamPageInfo} from "@/types/team/teamPageInfo";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import Link from "next/link";

const Layout = ({
  children,
  params,
} : {
  children: ReactNode,
  params: {
    page_type: string;
    team_id: string;
  };
}) => {
  const type = params.page_type;
  const id = params.team_id;
  const navItems = [
    {id: 1, name: '팀 소개', path: `/team/${type}/${id}/info`},
    {id: 2, name: '멤버', path: `/team/${type}/${id}/member`},
    {id: 3, name: '게시글', path: `/team/${type}/${id}/post`},
  ];

  return (
      <div className='w-full py-10 flex justify-center max-w-sm md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto md:mx-auto'>
        <div className='w-1/3 '>
          <aside>
            <h3>Team(Project) 대시보드</h3>
            <ul>
              {navItems.map(item => (
                  <li key={item.id}>
                    <Link href={item.path}>{item.name}</Link>
                  </li>
              ))}
            </ul>
          </aside>
        </div>
        <section className="w-2/3 h-full min-h-full p-6 bg-gray-100">
          {children}
        </section>
      </div>
  );
};

export default Layout;