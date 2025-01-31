import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { getUserInfo } from "@/service/api/user/getUserInfo";

import UserInfoSection from "./UserInfoSection";
import { queryclient } from "@/lib/getQueryClient";

const UserInfoContainer = async () => {
  await queryclient.prefetchQuery({
    queryKey: ["user", "info"],
    queryFn: async () => await getUserInfo(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryclient)}>
      <UserInfoSection />
    </HydrationBoundary>
  );
};

export default UserInfoContainer;
