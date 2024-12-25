"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import STACK_LIST from "@/constant/stackList";

import useObserver from "@/hooks/useObserver";
import { getAllProjectPosts } from "@/service/api/getAllProjectPosts";

import PostItem from "@/components/common/Post/PostItem";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import useInfinitePosts from "@/hooks/useInfinitePosts";

const ProjectPostList = () => {
  const path = usePathname();
  const { ref, isView } = useObserver({});

  const { fetchNextPage, hasNextPage, isFetchingNextPage, data } =
    useInfinitePosts({
      category: "project",
      getPosts: getAllProjectPosts,
    });

  useEffect(() => {
    if (isView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [isView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <>
      {!data && (
        <p className="text-center py-52 text-xl">작성된 게시글이 없어요 !</p>
      )}

      {data && (
        <>
          <ul className="grid grid-cols-2 gap-4">
            {data.pages.map((posts) =>
              posts.content.map((post) => (
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