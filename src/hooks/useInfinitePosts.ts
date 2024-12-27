// hooks/useInfinitePosts.ts
import MentoringPosts from "@/types/post/mentoring/mentoringPosts";
import ProjectPosts from "@/types/post/project/projectPosts";
import { useInfiniteQuery } from "@tanstack/react-query";

// 게시글 카테고리
type PostCategory = "project" | "mentoring";

interface useInfinitePostsProps<T extends PostCategory> {
  category: T;
  getPosts: ({
    nextCursor,
  }: {
    nextCursor: number;
  }) => Promise<T extends "project" ? ProjectPosts : MentoringPosts>;
}

const useInfinitePosts = <T extends PostCategory>({
  category,
  getPosts,
}: useInfinitePostsProps<T>) => {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data } =
    useInfiniteQuery<T extends "project" ? ProjectPosts : MentoringPosts>({
      queryKey: [category],
      queryFn: ({ pageParam }) => getPosts({ nextCursor: pageParam as number }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.nextCursor === null ? undefined : lastPage.nextCursor,
      staleTime: 5 * 60 * 1000,
    });

  return { fetchNextPage, hasNextPage, isFetchingNextPage, data };
};

export default useInfinitePosts;
