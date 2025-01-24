import { queryclient } from "@/lib/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getUserInfo } from "@/service/api/user/getUserInfo";
import UserInfoSection from "./UserInfoSection";

const UserInfoContainer = async () => {
  await queryclient.prefetchQuery({
    queryKey: ["user", "info"],
    queryFn: () => getUserInfo(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryclient)}>
      <UserInfoSection />
    </HydrationBoundary>
  );
};

export default UserInfoContainer;
