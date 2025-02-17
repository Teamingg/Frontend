import { useQuery } from "@tanstack/react-query";

import userKeys from "./userKeys";
import { getUserInfo } from "@/service/api/user";

export const useGetUserInfo = (userId: string) => {
  return useQuery({
    queryKey: userKeys.info(userId),
    queryFn: async () => await getUserInfo(userId as string),
  });
};

// export default useGetUserInfo;
