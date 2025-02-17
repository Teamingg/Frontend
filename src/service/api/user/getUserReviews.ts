import { client } from "../instance/client";

import UserReview from "@/types/user/userReview";

export const getUserReviews = async (userId: string): Promise<UserReview[]> => {
  const response = await client.get(`/users/${userId}/reviews`);
  console.log(response.data.data);

  return response.data.data;
};
