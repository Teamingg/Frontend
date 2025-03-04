import { client } from "../instance/client";
import PostType from "@/types/post/postType";

const getProjectPost = async <T extends "project">(
  postId: string
): Promise<PostType<T>> => {
  const response = await client.get(`/project/post/${postId}`);

  return response.data.data;
};

export default getProjectPost;
