import "./globals.css";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient } from "@/lib/getQueryClient";
import { getAllServerProjectPosts } from "@/service/api/post/getAllProjectPosts";
import { getAllServerMentoringPosts } from "@/service/api/post/getAllMentoringPosts";

import SectionHeader from "@/layout/Main/CatrgoryHeader";
import ProjectPostList from "@/components/post/ProjectPostList";
import MentoringPostList from "@/components/post/MentoringPostList";
import LocalNavigation from "@/layout/Navigation/LocalNavigation";

export default async function Home() {
  const queryClient = getQueryClient();

  await Promise.all([
    // 프로젝트 포스트
    queryClient.prefetchInfiniteQuery({
      queryKey: ["project", "posts"],
      queryFn: async ({ pageParam }) =>
        await getAllServerProjectPosts({ nextCursor: pageParam as number }),
      initialPageParam: 0,
    }),

    // 멘토링 포스트
    queryClient.prefetchInfiniteQuery({
      queryKey: ["mentoring", "posts"],
      queryFn: async ({ pageParam }) =>
        await getAllServerMentoringPosts({ nextCursor: pageParam as number }),
      initialPageParam: 0,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LocalNavigation />
      <section className="p-4 md:p-8 bg-[#f5f5f5] md:max-w-[1400px] md:mx-auto md:rounded-2xl">
        <article className="w-full flex flex-col gap-4 md:gap-2">
          {/* Team-page project*/}
          <SectionHeader title="팀 프로젝트" path="/project" />
          <ProjectPostList />

          {/* mentoring */}
          <SectionHeader title="멘토링" path="/mentoring" />

          <MentoringPostList />
        </article>
      </section>
    </HydrationBoundary>
  );
}
