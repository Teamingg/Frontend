import { instance } from "@/service/api/instance/axiosInstance";

import UserReview from "@/types/user/userReview";

export const getUserReviews = async (): Promise<UserReview[]> => {
  const response = await instance.get("/mock/users/reviews");

  if (response.status !== 200) {
    throw new Error("정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
  }

  return response.data.data;
};
