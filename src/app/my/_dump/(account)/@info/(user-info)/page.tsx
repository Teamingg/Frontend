import {queryclient} from "@/lib/getQueryClient";
import {getMyInfo} from "@/service/api/my";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";
import UserInfoSection from "@/app/my/(dashboard)/@info/(user-info)/_components/UserInfo/UserInfoSection";
import {myPageKeys} from "@/hooks/queries/my";

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