"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import STACK_LIST from "@/constant/stackList";

import useObserver from "@/hooks/useObserver";
import { getAllMentoringPosts } from "@/service/api/mentoring/post/getAllMentoringPosts";

import PostItem from "@/components/common/Post/PostItem";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import useInfinitePosts from "@/hooks/useInfinitePosts";

const MentoringPostList = () => {
  const path = usePathname();
  const { ref, isView } = useObserver();

  const { fetchNextPage, hasNextPage, isFetchingNextPage, data } =
    useInfinitePosts({
      category: "mentoring",
      getPosts: getAllMentoringPosts,
    });

  useEffect(() => {
    if (isView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [isView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <>
      {(data?.pages[0].content.length === 0 || !data) && (
        <p className="text-center py-8 text-xl">
          작성된 게시물이 존재하지 않습니다.
        </p>
      )}

      {data && (
        <>
          <ul className="grid grid-cols-2 gap-4">
            {data.pages.map((posts) =>
              posts.content.map((post) => (
                <li key={post.boardId}>
                  <PostItem
                    title={post.title}
                    id={post.boardId}
                    startDate={post.startDate}
                    endDate={post.endDate}
                    category="mentoring"
                    contents={post.contents}
                    teamName={post.mentoringTeamName}
                    tag={STACK_LIST.filter((stack) =>
                      post.category.includes(stack.value)
                    ).map((stack) => stack.label)}
                    status={post.status}
                  />
                </li>
              ))
            )}
          </ul>
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

export default MentoringPostList;
