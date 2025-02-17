import { client } from "../instance/client";
import PostType from "@/types/post/postType";

const getMentoringPost = async <T extends "mentoring">(
  postId: string
): Promise<PostType<T>> => {
  const {
    data: { data },
  } = await client.get(`/mentoring/posts/${postId}`);

  return data;
};

export default getMentoringPost;
