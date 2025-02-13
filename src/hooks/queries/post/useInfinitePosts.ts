// hooks/useInfinitePosts.ts
import MentoringPosts from "@/types/post/mentoring/mentoringPosts";
import ProjectPosts from "@/types/post/project/projectPosts";
import { useInfiniteQuery } from "@tanstack/react-query";
import TeamCategory from "@/types/teamCategory";
import postKeys from "./postKeys";

interface useInfinitePostsProps<T extends TeamCategory> {
  category: T;
  getPosts: ({
    nextCursor,
  }: {
    nextCursor: number;
  }) => Promise<T extends "project" ? ProjectPosts : MentoringPosts>;
}

const useInfinitePosts = <T extends TeamCategory>({
  category,
  getPosts,
}: useInfinitePostsProps<T>) => {
  return useInfiniteQuery<T extends "project" ? ProjectPosts : MentoringPosts>({
    queryKey: postKeys.posts(category),

    queryFn: async ({ pageParam }) =>
      await getPosts({ nextCursor: pageParam as number }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.nextCursor === null ? undefined : lastPage.nextCursor,
    staleTime: 5 * 60 * 1000,
  });
};

export default useInfinitePosts;
