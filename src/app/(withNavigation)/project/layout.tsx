import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { queryclient } from "@/lib/getQueryClient";

import { getAllProjectPosts } from "@/service/api/project/post/getAllProjectPosts";

const ProjectPageLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // 프로젝트 포스트
  await queryclient.prefetchInfiniteQuery({
    queryKey: ["project", "post"],
    queryFn: async ({ pageParam }) =>
      await getAllProjectPosts({ nextCursor: pageParam as number }),
    initialPageParam: 0,
  });

  return (
    <HydrationBoundary state={dehydrate(queryclient)}>
      {children}
    </HydrationBoundary>
  );
};

export default ProjectPageLayout;
