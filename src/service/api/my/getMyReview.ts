import UserReview from "@/types/user/userReview";
import {createServerInstance} from "@/service/api/instance/server";

export const getMyReviews = async (): Promise<UserReview[]> => {
  const server = await createServerInstance();
  const { data } = await server.get("/users/reviews");
  return data.data;
};