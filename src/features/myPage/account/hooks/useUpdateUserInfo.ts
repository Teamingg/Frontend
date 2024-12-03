"use lcient";

import { useMutation } from "@tanstack/react-query";

import { instance } from "@/shared/api/axiosInstance";

import { UserInfoFormValues } from "@/entities/user/components/UserInfoForm";
import { queryclient } from "@/shared/utils/Provider/getQueryClient";

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
