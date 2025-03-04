import { useQuery } from "@tanstack/react-query";

import { UserInfo } from "../../../types/user/userInfo";
import { getMyInfo } from "../../../service/api/my/getMyInfo";
import myPageKeys from "./myPageKeys";

const useGetMyInfo = () => {
  const { data: userInfo, isFetching } = useQuery<UserInfo>({
    queryKey: myPageKeys.info,
    queryFn: async () => await getMyInfo(),
    refetchOnMount: "always",
  });

  return {
    userInfo,
    isFetching,
  };
};

export default useGetMyInfo;
