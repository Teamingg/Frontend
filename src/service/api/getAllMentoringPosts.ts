import { instance } from "@/service/api/instance/axiosInstance";
import MentoringPosts from "@/types/post/mentoring/mentoringPosts";

export interface getAllMentoringPostsProps {
  nextCursor?: number;
}

export const getAllMentoringPosts = async ({
  nextCursor,
}: getAllMentoringPostsProps): Promise<MentoringPosts> => {
  const response = await instance.get(
    nextCursor ? `/mentoring/posts?cursor=${nextCursor}` : "/mentoring/posts"
  );

  return response.data.data;
};
