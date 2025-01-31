import { queryclient } from "@/lib/getQueryClient";

import getProjectPost from "@/service/api/project/post/getProjectPost";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface ProjectPostPageProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

const ProjectPostPage = async ({ children, params }: ProjectPostPageProps) => {
  const { id: postId } = await params;

  await queryclient.prefetchQuery({
    queryKey: ["project", "post", postId],
    queryFn: async () => await getProjectPost(postId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryclient)}>
      {children}
    </HydrationBoundary>
  );
};

export default ProjectPostPage;
