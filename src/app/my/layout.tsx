import { ReactNode } from "react";
import { queryclient } from "@/lib/getQueryClient";
import { myPageKeys } from "@/hooks/queries/my";
import {
  getMyInfo,
  getMyMentoringTeam,
  getMyProjectTeam,
} from "@/service/api/my";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { TeamHeader } from "@/components/Team";

const myPagePaths = [
  {
    label: "계정정보",
    path: "/my/dashboard",
  },
  {
    label: "프로젝트",
    path: "/my/project",
  },
  {
    label: "멘토링",
    path: "/my/mentoring",
  },
  {
    label: "리뷰",
    path: "/my/review",
  },
  {
    label: "회원탈퇴",
    path: "/my/quit",
  },
];

const layout = async ({ children }: { children: ReactNode }) => {
  await Promise.all([
    await queryclient.prefetchQuery({
      queryKey: myPageKeys.info,
      queryFn: getMyInfo,
    }),

    await queryclient.prefetchQuery({
      queryKey: myPageKeys.team("mentoring"),
      queryFn: getMyMentoringTeam,
    }),

    await queryclient.prefetchQuery({
      queryKey: myPageKeys.team("project"),
      queryFn: getMyProjectTeam,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryclient)}>
      <section className=" bg-gray-100 ">
        <div className="h-full md:py-20 container mx-auto flex flex-col items-center gap-6  max-w-[1280px]">
          <TeamHeader navigation={myPagePaths} />
          <div className="w-full h-full flex flex-col items-center gap-6 px-4 pb-4 md:p-0">
            {children}
          </div>
        </div>
      </section>
    </HydrationBoundary>
  );
};

export default layout;
