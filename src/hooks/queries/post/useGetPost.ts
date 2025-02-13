import { useQuery } from "@tanstack/react-query";

import postKeys from "./postKeys";

import PostType from "@/types/post/postType";
import TeamCategory from "@/types/teamCategory";

import getMentoringPost from "@/service/api/post/getMentoringPost";
import getProjectPost from "@/service/api/post/getProjectPost";

interface useGetPostArg<T> {
  category: T;
  postId: string;
}
export const useGetPost = <T extends TeamCategory>({
  category,
  postId,
}: useGetPostArg<T>) => {
  return useQuery<PostType<T>, Error, PostType<T>>({
    queryKey: postKeys.post(category, postId),
    queryFn: async (): Promise<PostType<T>> => {
      let response;
      if (category === "mentoring") {
        response = await getMentoringPost(postId);
      } else if (category === "project") {
        response = await getProjectPost(postId);
      }

      return response as PostType<T>;
    },
    refetchOnMount: "always",
  });
};
