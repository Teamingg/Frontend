import { useMutation } from "@tanstack/react-query";

import { queryclient } from "@/lib/getQueryClient";

import { UserInfoFormValues } from "@/components/user/UserInfoForm/UserInfoFormValues";
import { client } from "@/service/api/instance/client";

const useUpdateUserInfo = () => {
  const { mutate, isSuccess } = useMutation({
    mutationFn: async (userInfo: UserInfoFormValues) => {
      await client.put(
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
