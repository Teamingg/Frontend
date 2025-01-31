"use client";

import { instance } from "@/service/api/instance/axiosInstance";

import { useRouter } from "next/navigation";

import UserInfoForm from "@/components/user/UserInfoForm/UserInfoForm";
import { UserInfoFormValues } from "@/components/user/UserInfoForm/UserInfoFormValues";

const SignUpUserForm = () => {
  const router = useRouter();

  const onSubmit = async ({
    name,
    introduce,
    stacksIds,
  }: UserInfoFormValues) => {
    const response = await instance.post(
      "/users",
      JSON.stringify({
        name,
        introduce,
        stacksIds,
      })
    );

    if (response.status === 200) {
      router.replace("/");
    }
  };

  return <UserInfoForm formActionHandler={onSubmit} />;
};

export default SignUpUserForm;
