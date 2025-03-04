import {ReactNode} from "react";
import {queryclient} from "@/lib/getQueryClient";
import {myPageKeys} from "@/hooks/queries/my";
import {getMyInfo, getMyMentoringTeam, getMyProjectTeam} from "@/service/api/my";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";
import { TeamHeader } from "@/components/Team";

const myPagePaths = [
  {
    label: "계정정보",
    path: "/My/dashboard",
  },
  {
    label: "프로젝트 관리",
    path: "/My/project",
  },
  {
    label: "멘토링 관리",
    path: "/My/mentoring",
  },
  {
    label: '리뷰 관리',
    path: "/My/review",
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
        <section className='min-h-[calc(100vh-72px-62px)] bg-gray-100'>
          <div className='py-20 container mx-auto flex flex-col items-center gap-10'>
            {/*<Aside navigation={myPagePaths}/>*/}
            <TeamHeader navigation={myPagePaths}/>
            <div className='w-2/3'>
              {children}
            </div>
          </div>
        </section>
      </HydrationBoundary>
  );
};

export default layout;