"use client";

import { instance } from "@/shared/api/axiosInstance";

import UserInfoForm, {
  UserInfoFormValues,
} from "@/entities/user/components/UserInfoForm";
import { useRouter } from "next/navigation";

const SignUpUserForm = () => {
  const router = useRouter();

  const onSubmit = async (data: UserInfoFormValues) => {
    const response = await instance.post(
      "/user",
      JSON.stringify({
        name: data.name,
        introduce: data.introduce,
        stackIds: data.stacks,
      })
    );

    if (response.status === 200) {
      router.replace("/");
    }
  };

  return <UserInfoForm formActionHandler={onSubmit} />;
};

export default SignUpUserForm;
