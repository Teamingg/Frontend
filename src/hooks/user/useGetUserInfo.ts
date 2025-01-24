import { useSuspenseQuery } from "@tanstack/react-query";
import { UserInfo } from "../../types/user/userInfo";
import { getUserInfo } from "../../service/api/user/getUserInfo";

const useGetUserInfo = () => {
  const {
    data: userInfo,
    isFetching,
    isError,
  } = useSuspenseQuery<UserInfo>({
    queryKey: ["user", "info"],
    queryFn: async () => await getUserInfo(),
    refetchOnMount: "always",
  });

  return {
    userInfo,
    isFetching,
    isError,
  };
};

export default useGetUserInfo;
