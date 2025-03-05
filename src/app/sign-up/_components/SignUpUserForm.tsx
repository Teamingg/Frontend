"use client";

import { useRouter } from "next/navigation";

import { client } from "@/service/api/instance/client";

import UserInfoForm from "@/components/My/UserInfoForm";
import { UserInfoFormValues } from "@/types/UserInfoFormValues";

const SignUpUserForm = () => {
  const router = useRouter();

  const onSubmit = async ({
    name,
    introduce,
    stacksIds,
  }: UserInfoFormValues) => {
    console.log(name, introduce);
    const response = await client.post(
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