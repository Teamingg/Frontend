import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { queryclient } from "@/lib/getQueryClient";

import UserReviewList from "./UserReviewList";
import myPageKeys from "@/hooks/queries/my/myPageKeys";
import { getMyReviews } from "@/service/api/my";

const UserReviewContainer = async () => {
  await queryclient.prefetchQuery({
    queryKey: myPageKeys.reviews,
    queryFn: async () => await getMyReviews(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryclient)}>
      <UserReviewList />
    </HydrationBoundary>
  );
};

export default UserReviewContainer;
