import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getMyInfo } from "@/service/api/my/getMyInfo";

import { queryclient } from "@/lib/getQueryClient";

import UserInfoSection from "./UserInfoSection";
import myPageKeys from "@/hooks/queries/my/myPageKeys";

const UserInfoContainer = async () => {
  queryclient.prefetchQuery({
    queryKey: myPageKeys.info,
    queryFn: async () => await getMyInfo(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryclient)}>
      <UserInfoSection />
    </HydrationBoundary>
  );
};

export default UserInfoContainer;
