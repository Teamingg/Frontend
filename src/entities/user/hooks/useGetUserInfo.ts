import { useQuery } from "@tanstack/react-query";
import { userInfo } from "../model/userInfo";
import { getUserInfo } from "../api/getUserInfo";

const useGetUserInfo = () => {
  const {
    data: userInfo,
    error,
    isError,
  } = useQuery<userInfo>({
    queryKey: ["user"],
    queryFn: getUserInfo,
  });

  return {
    userInfo,
    error,
    isError,
  };
};

export default useGetUserInfo;
