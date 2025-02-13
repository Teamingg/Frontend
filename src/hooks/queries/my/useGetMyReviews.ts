import { useQuery } from "@tanstack/react-query";

import myPageKeys from "./myPageKeys";
import UserReview from "@/types/user/userReview";
import { getMyReviews } from "@/service/api/my";

const useGetMyReviews = () => {
  const { data: userInfo, isFetching } = useQuery<UserReview[]>({
    queryKey: myPageKeys.reviews,
    queryFn: async () => await getMyReviews(),
    refetchOnMount: "always",
  });

  return {
    userInfo,
    isFetching,
  };
};

export default useGetMyReviews;
