import {ReactNode} from "react";
import NavLink from "@/components/NavLink";
import {queryclient} from "@/lib/getQueryClient";
import {myPageKeys} from "@/hooks/queries/my";
import {getMyInfo, getMyMentoringTeam, getMyProjectTeam} from "@/service/api/my";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";

const myPagePaths = [
  {
    label: "계정정보",
    path: "/my/dashboard",
  },
  {
    label: "프로젝트 관리",
    path: "/my/project",
  },
  {
    label: "멘토링 관리",
    path: "/my/mentoring",
  },
  {
    label: '리뷰 관리',
    path: "/my/reviews",
  }
];

const layout = async ({
  children
}: {
  children: ReactNode
}) => {
  await queryclient.prefetchQuery({
    queryKey: myPageKeys.info,
    queryFn: getMyInfo,
  });

  await queryclient.prefetchQuery({
    queryKey: myPageKeys.team("mentoring"),
    queryFn: getMyMentoringTeam,
  });

  await queryclient.prefetchQuery({
    queryKey: myPageKeys.team("project"),
    queryFn: getMyProjectTeam,
  });

  return (
      <HydrationBoundary state={dehydrate(queryclient)}>
        <section className='container mx-auto'>
          <h2 className='pt-20 pb-5 lg:text-4xl md:text-2xl'>마이 어카운트</h2>
          <div className='flex gap-10'>
            <aside className='w-1/3 h-full py-3'>
              <ul className="w-full flex justify-around md:block text-sm md:text-base">
                {myPagePaths.map((path, index) => (
                    <li key={index} className="w-full text-center md:text-left">
                      <NavLink
                          href={path.path}
                          activeClassName="text-primary border-b-2 border-b-primary md:border-none md:bg-primary md:text-white md:rounded-lg"
                          className="text-sm md:text-lg block w-full py-2 md:p-4 text-[rgba(0,0,0,0.5)] hover:text-primary transition-all">
                        {path.label}
                      </NavLink>
                    </li>
                ))}
              </ul>
            </aside>
            {children}
          </div>
        </section>
      </HydrationBoundary>
  );
};

export default layout;