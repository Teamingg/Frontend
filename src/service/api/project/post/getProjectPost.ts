"use server";

import { cookies } from "next/headers";
import { instance } from "../../instance/axiosInstance";
import ProjectPost from "@/types/post/project/projectPost";

const getProjectPost = async (postId: string): Promise<ProjectPost> => {
  const response = await instance.get(`/project/post/${postId}`, {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  return response.data.data;
};

export default getProjectPost;
