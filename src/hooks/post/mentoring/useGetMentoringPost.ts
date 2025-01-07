import { useQuery } from "@tanstack/react-query";

import getMentoringPost from "@/service/api/mentoring/post/getMentoringPost";

const useGetMentoringPost = (postId: string) => {
  const { data } = useQuery({
    queryKey: ["mentoring", "post", postId],
    queryFn: async () => await getMentoringPost(postId),
    refetchOnMount: "always",
  });

  return { data };
};

export default useGetMentoringPost;
