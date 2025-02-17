import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { queryclient } from "@/lib/getQueryClient";

import { getAllProjectPosts } from "@/service/api/post/getAllProjectPosts";
import { postKeys } from "@/hooks/queries/post";

const ProjectPageLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  console.log(await queryclient.getQueryData(postKeys.posts("project")));

  // 프로젝트 포스트
  await queryclient.prefetchInfiniteQuery({
    queryKey: postKeys.posts("project"),
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
