import { queryclient } from "@/lib/getQueryClient";
import getProjectPost from "@/service/api/project/post/getProjectPost";
import getCookie from "@/utils/auth/getCookie";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";
interface ProjectPostPageProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

const ProjectPostPage = async ({ children, params }: ProjectPostPageProps) => {
  const postId = (await params).id;
  const token = await getCookie("accessToken");

  await queryclient.prefetchQuery({
    queryKey: ["project", "post", postId],
    queryFn: async () => await getProjectPost(postId, token as string),
  });

  return (
    <HydrationBoundary state={dehydrate(queryclient)}>
      {children}
    </HydrationBoundary>
  );
};

export default ProjectPostPage;
