import { useMutation } from "@tanstack/react-query";

import { instance } from "@/service/api/instance/axiosInstance";
import { queryclient } from "@/lib/getQueryClient";

import { UserInfoFormValues } from "@/components/user/UserInfoForm/UserInfoFormValues";

const useUpdateUserInfo = () => {
  const { mutate, isSuccess } = useMutation({
    mutationFn: async (userInfo: UserInfoFormValues) => {
      return await instance.put(
        "/users",
        JSON.stringify({
          name: userInfo.name,
          introduce: userInfo.introduce,
          stackIds: userInfo.stacksIds,
        })
      );
    },
    onSuccess: () => {
      queryclient.refetchQueries({ queryKey: ["user", "info"] });
    },
  });

  return { mutate, isSuccess };
};

export default useUpdateUserInfo;
