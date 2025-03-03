import { client } from "../instance/client";

import UserReview from "@/types/user/userReview";

export const getMyReviews = async (): Promise<UserReview[]> => {
  const { data } = await client.get("/users/reviews");
  return data.data;
};