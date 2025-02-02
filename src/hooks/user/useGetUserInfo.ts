import { useQuery } from "@tanstack/react-query";
import { UserInfo } from "../../types/user/userInfo";
import { getUserInfo } from "../../service/api/user/getUserInfo";

const useGetUserInfo = () => {
  const { data: userInfo, isFetching } = useQuery<UserInfo>({
    queryKey: ["user", "info"],
    queryFn: async () => await getUserInfo(),
    refetchOnMount: "always",
  });

  return {
    userInfo,
    isFetching,
  };
};

export default useGetUserInfo;
