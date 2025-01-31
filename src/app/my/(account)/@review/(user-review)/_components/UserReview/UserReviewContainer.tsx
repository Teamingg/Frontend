import { queryclient } from "@/lib/getQueryClient";
import { getUserReviews } from "@/service/api/user/getUserReviews";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import UserReviewList from "./UserReviewList";

const UserReviewContainer = async () => {
  await queryclient.prefetchQuery({
    queryKey: ["user", "review"],
    queryFn: async () => await getUserReviews(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryclient)}>
      <UserReviewList />
    </HydrationBoundary>
  );
};

export default UserReviewContainer;
