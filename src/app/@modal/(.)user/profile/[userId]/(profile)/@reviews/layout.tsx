import { getUserReviews } from "@/service/api/user";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const UserProfileReviewsLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [userId, "reviews"],
    queryFn: async () => await getUserReviews(userId),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export default UserProfileReviewsLayout;
