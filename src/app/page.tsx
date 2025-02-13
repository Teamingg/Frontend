import "./globals.css";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { queryclient } from "@/lib/getQueryClient";
import { getAllProjectPosts } from "@/service/api/post/getAllProjectPosts";
import { getAllMentoringPosts } from "@/service/api/post/getAllMentoringPosts";

import SectionHeader from "@/components/layout/Main/CatrgoryHeader";

import ProjectPostList from "@/components/post/ProjectPostList";
import MentoringPostList from "@/components/post/MentoringPostList";
import LocalNavigation from "@/components/layout/Layout/Header/LocalNavigation";

export default async function Home() {
  await Promise.all([
    // 프로젝트 포스트
    queryclient.prefetchInfiniteQuery({
      queryKey: ["project", "posts"],
      queryFn: async ({ pageParam }) =>
        await getAllProjectPosts({ nextCursor: pageParam as number }),
      initialPageParam: 0,
    }),

    // 멘토링 포스트
    queryclient.prefetchInfiniteQuery({
      queryKey: ["mentoring", "posts"],
      queryFn: async ({ pageParam }) =>
        await getAllMentoringPosts({ nextCursor: pageParam as number }),
      initialPageParam: 0,
    }),
  ]);

  return (
    <>
      <LocalNavigation />

      <section className="bg-[#f5f5f5] md:bg-white p-4 md:p-0 flex flex-col gap-4 md:gap-8">
        {/* team-page project */}

        <div className="md:bg-[#f5f5f5] md:rounded-2xl md:p-8 md:max-w-[1400px] md:mx-auto">
          <SectionHeader title="팀 프로젝트" path="/project" />

          <HydrationBoundary state={dehydrate(queryclient)}>
            <ProjectPostList />
          </HydrationBoundary>
        </div>

        {/* mentoring */}
        <div className="md:bg-[#f5f5f5] md:rounded-2xl md:p-8 md:max-w-[1400px] md:mx-auto">
          <SectionHeader title="멘토링" path="/mentoring" />
          <HydrationBoundary state={dehydrate(queryclient)}>
            <MentoringPostList />
          </HydrationBoundary>
        </div>
      </section>
    </>
  );
}
