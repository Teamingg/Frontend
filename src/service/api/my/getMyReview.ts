import { client } from "../instance/client";

import UserReview from "@/types/user/userReview";

export const getMyReviews = async (): Promise<UserReview[]> => {
  const response = await client.get("/users/reviews");

  return response.data.data;
};
