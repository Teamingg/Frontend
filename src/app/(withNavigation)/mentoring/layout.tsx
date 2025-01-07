import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { queryclient } from "@/lib/getQueryClient";

import { getAllMentoringPosts } from "@/service/api/mentoring/post/getAllMentoringPosts";

const MentoringPageLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // 멘토링 포스트
  await queryclient.prefetchInfiniteQuery({
    queryKey: ["mentoring", "post"],
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
