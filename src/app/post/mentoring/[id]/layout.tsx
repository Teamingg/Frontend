import { queryclient } from "@/lib/getQueryClient";
import getMentoringPost from "@/service/api/post/getMentoringPost";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface MentoringPostLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

const MentoringPostLayout = async ({
  children,
  params,
}: MentoringPostLayoutProps) => {
  const postId = (await params).id;

  await queryclient.prefetchQuery({
    queryKey: ["mentoring", "post", postId],
    queryFn: () => getMentoringPost(postId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryclient)}>
      {children}
    </HydrationBoundary>
  );
};

export default MentoringPostLayout;
