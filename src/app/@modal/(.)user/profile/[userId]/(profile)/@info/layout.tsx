import { queryclient } from "@/lib/getQueryClient";
import { getUserInfo } from "@/service/api/user";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const UserProfileInfoLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;

  await queryclient.prefetchQuery({
    queryKey: [userId, "info"],
    queryFn: async () => await getUserInfo(userId),
  });
  return (
    <HydrationBoundary state={dehydrate(queryclient)}>
      {children}
    </HydrationBoundary>
  );
};

export default UserProfileInfoLayout;
