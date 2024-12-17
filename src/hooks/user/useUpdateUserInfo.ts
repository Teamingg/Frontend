"use lcient";

import { useMutation } from "@tanstack/react-query";

import { instance } from "@/service/api/instance/axiosInstance";
import { queryclient } from "@/lib/getQueryClient";

import { UserInfoFormValues } from "@/components/user/UserInfoForm/UserInfoFormValues";

const useUpdateUserInfo = () => {
  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: async (userInfo: UserInfoFormValues) => {
      return await instance.put(
        "/user/update",
        JSON.stringify({
          name: userInfo.name,
          introduce: userInfo.introduce,
          stackIds: userInfo.stacks,
        })
      );
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { mutate, isSuccess, isError };
};

export default useUpdateUserInfo;
