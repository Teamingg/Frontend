import ProjectPost from "@/types/post/project/projectPost";
import handleError from "@/service/handleError";
import { client } from "../../instance/client/client";

const getProjectPost = async (postId: string): Promise<ProjectPost> => {
  const response = await client.get(`/project/post/${postId}`);

  if (response.status !== 200) {
    const errorMessage = handleError(response.status);
    throw new Error(errorMessage);
  }

  return response.data.data;
};

export default getProjectPost;
