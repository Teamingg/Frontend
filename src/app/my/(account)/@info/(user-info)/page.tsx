import {queryclient} from "@/lib/getQueryClient";
import myPageKeys from "../../../../../hooks/queries/my/myPageKeys";
import {getMyInfo} from "@/service/api/my";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";
import UserInfoSection from "@/app/my/(account)/@info/(user-info)/_components/UserInfo/UserInfoSection";

const page = async () => {
  await queryclient.prefetchQuery({
    queryKey: myPageKeys.info,
    queryFn: async () => await getMyInfo(),
  });

  return (
      <HydrationBoundary state={dehydrate(queryclient)}>
        <UserInfoSection />
      </HydrationBoundary>
  );
};

export default page;