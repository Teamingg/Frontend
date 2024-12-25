import "./globals.css";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { queryclient } from "@/lib/getQueryClient";
import { getAllProjectPosts } from "@/service/api/getAllProjectPosts";
import { getAllMentoringPosts } from "@/service/api/getAllMentoringPosts";

import SectionHeader from "@/components/layout/Main/CatrgoryHeader";
import TeamProjectNavigation from "@/components/layout/Layout/Header/GlobalNavigation";

import ProjectPostList from "@/components/post/ProjectPostList";
import MentoringPostList from "@/components/post/MentoringPostList";

export default async function Home() {
  await queryclient.prefetchInfiniteQuery({
    queryKey: ["project"],
    queryFn: ({ pageParam }) =>
      getAllProjectPosts({ nextCursor: pageParam as number }),
    initialPageParam: 0,
  });

  await queryclient.prefetchInfiniteQuery({
    queryKey: ["mentoring"],
    queryFn: ({ pageParam }) =>
      getAllMentoringPosts({ nextCursor: pageParam as number }),
    initialPageParam: 0,
  });

  return (
    // tailwindcss test
    <>
      <TeamProjectNavigation />

      <section className="flex flex-col gap-8 pb-8">
        {/* team project */}
        <div className="p-8 rounded-xl bg-[#f5f5f5]">
          <SectionHeader title="팀 프로젝트" path="/project" />

          <HydrationBoundary state={dehydrate(queryclient)}>
            <ProjectPostList />
          </HydrationBoundary>
        </div>

        {/* mentoring */}
        <div className="p-8 rounded-xl bg-[#f5f5f5]">
          <SectionHeader title="멘토링" path="/mentoring" />

          <HydrationBoundary state={dehydrate(queryclient)}>
            <MentoringPostList />
          </HydrationBoundary>
        </div>
      </section>
    </>
  );
}
