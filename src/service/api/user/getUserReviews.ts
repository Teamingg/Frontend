import UserReview from "@/types/user/userReview";
import { createServerInstance } from "../instance/server";

export const getUserReviews = async (userId: string): Promise<UserReview[]> => {
  const server = await createServerInstance();

  const response = await server.get(`/users/${userId}/reviews`);
  console.log(response.data.data);

  return response.data.data;
};
