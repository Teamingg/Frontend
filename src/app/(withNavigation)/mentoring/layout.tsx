import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { queryclient } from "@/lib/getQueryClient";

import { getAllMentoringPosts } from "@/service/api/post/getAllMentoringPosts";
import { postKeys } from "@/hooks/queries/post";

const MentoringPageLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // 멘토링 포스트
  await queryclient.prefetchInfiniteQuery({
    queryKey: postKeys.posts("mentoring"),
    queryFn: async ({ pageParam }) =>
      await getAllMentoringPosts({ nextCursor: pageParam as number }),
    initialPageParam: 0,
  });

  return (
    <HydrationBoundary state={dehydrate(queryclient)}>
      {children}
    </HydrationBoundary>
  );
};

export default MentoringPageLayout;
