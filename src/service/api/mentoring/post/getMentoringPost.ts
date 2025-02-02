import MentoringPost from "@/types/post/mentoring/mentoringPost";
import { client } from "../../instance/client/client";

const getMentoringPost = async (postId: string): Promise<MentoringPost> => {
  const {
    data: { data },
  } = await client.get(`/mentoring/posts/${postId}`);

  return data;
};

export default getMentoringPost;
