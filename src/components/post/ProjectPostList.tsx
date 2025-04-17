"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import STACK_LIST from "@/constant/stackList";

import useObserver from "@/hooks/useObserver";
import { getAllProjectPosts } from "@/service/api/post/getAllProjectPosts";

import PostItem from "@/components/post/PostItem";
import LoadingIndicator from "@/components/LoadingIndicator";
import useInfinitePosts from "@/hooks/queries/post/useInfinitePosts";
import AuthErrorFallback from "../ErrorBoundary/AuthErrorFallback";

const ProjectPostList = () => {
  const path = usePathname();
  const { ref, isView } = useObserver();

  const { fetchNextPage, hasNextPage, isFetchingNextPage, data, error } =
    useInfinitePosts({
      category: "project",
      getPosts: getAllProjectPosts,
    });

  useEffect(() => {
    if (isView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [isView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  // 401 에러 처리
  if (error?.message === "Unauthorized" || error?.message?.includes("401")) {
    return <AuthErrorFallback />;
  }

  return (
    <>
      {/* {isPending && <LoadingSpinner />} */}
      {(data?.pages[0].content.length === 0 || !data) && (
        <p className="text-center py-8 text-xl">
          작성된 게시물이 존재하지 않습니다.
        </p>
      )}

      {data && (
        <>
          <ul className="flex flex-col gap-4 md:grid md:grid-cols-2">
            {data.pages.map((posts) =>
              posts.content.slice(0, 6).map((post) => (
                <li key={post.postId}>
                  <PostItem
                    title={post.title}
                    id={post.postId}
                    startDate={post.startDate}
                    endDate={post.endDate}
                    category="project"
                    contents={post.contents}
                    teamName={post.teamName}
                    tag={STACK_LIST.filter((stack) =>
                      post.stacks.includes(stack.value)
                    ).map((stack) => stack.label)}
                    status={post.status}
                  />
                </li>
              ))
            )}
          </ul>

          {/* 무한스크롤 옵저버 */}
          {path != "/" && (
            <div ref={ref} className="h-[10px] w-full text-center">
              {isFetchingNextPage && (
                <div className="w-full py-4 flex justify-center">
                  <LoadingIndicator />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProjectPostList;