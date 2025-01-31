import handleError from "@/service/handleError";
import { client } from "../instance/client/client";

import UserReview from "@/types/user/userReview";

export const getUserReviews = async (): Promise<UserReview[]> => {
  const response = await client.get("/mock/users/reviews");

  if (response.status !== 200) {
    handleError(response.status);
  }

  return response.data.data;
};
