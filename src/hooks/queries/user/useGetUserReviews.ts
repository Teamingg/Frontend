import { useQuery } from "@tanstack/react-query";

import { getUserReviews } from "@/service/api/user";

import userKeys from "./userKeys";

const useGetUserReviews = (userId: string) => {
  return useQuery({
    queryKey: userKeys.reviews(userId),
    queryFn: async () => await getUserReviews(userId as string),
  });
};

export default useGetUserReviews;
