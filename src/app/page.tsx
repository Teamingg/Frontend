import "./globals.css";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { queryclient } from "@/lib/getQueryClient";
import { getAllProjectPosts } from "@/service/api/post/getAllProjectPosts";
import { getAllMentoringPosts } from "@/service/api/post/getAllMentoringPosts";

import SectionHeader from "@/layout/Main/CatrgoryHeader";
import ProjectPostList from "@/components/post/ProjectPostList";
import MentoringPostList from "@/components/post/MentoringPostList";
import LocalNavigation from "@/layout/Navigation/LocalNavigation";
import clsx from "clsx";
import TeamCard from "@/components/Team/TeamCard";

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
    /*queryclient.prefetchInfiniteQuery({
      queryKey: ["mentoring", "posts"],
      queryFn: async ({ pageParam }) =>
        await getAllMentoringPosts({ nextCursor: pageParam as number }),
      initialPageParam: 0,
    }),*/
  ]);

  const containerClass = clsx('max-w-xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto');
  const heroClass = clsx('py-32 text-center');

  return (
    <div className={containerClass}>
      {/*<section className={heroClass}>
        <h2 className='text-2xl md:text-3xl lg:text-4xl mb-5 font-bold'>함께 성장하는 개발자 커뮤니티</h2>
        <p className='text-lg md:text-xl lg:text-2xl'>
          프로젝트 팀원을 찾거나 멘토링을 통해 실력을 향상시켜 보세요.<br/>
          <span>Teaming</span>과 함께라면 누구나 성장할 수 있습니다.
        </p>
      </section>*/}
      {/* Todo 카테고리 카드 */}
      {/* Todo 인기 프로젝트 카드 */}
      {/* Todo 인기 멘토 카드 */}
      <section className='py-10'>
        <LocalNavigation />
        <article className="w-full flex flex-col gap-4 md:gap-2">
          {/* Team-page project */}
          <SectionHeader title="팀 프로젝트" path="/project" />
          <HydrationBoundary state={dehydrate(queryclient)}>
            <ProjectPostList />
          </HydrationBoundary>

          {/* mentoring */}
          {/*<SectionHeader title="멘토링" path="/mentoring" />
          <HydrationBoundary state={dehydrate(queryclient)}>
            <MentoringPostList />
          </HydrationBoundary>*/}
        </article>
      </section>
    </div>
  );
}