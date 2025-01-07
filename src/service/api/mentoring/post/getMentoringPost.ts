import MentoringPost from "@/types/post/mentoring/mentoringPost";
import { instance } from "../../instance/axiosInstance";

const getMentoringPost = async (postId: string): Promise<MentoringPost> => {
  const {
    data: { data },
  } = await instance.get(`/mentoring/posts/${postId}`);

  return data;
};

export default getMentoringPost;
