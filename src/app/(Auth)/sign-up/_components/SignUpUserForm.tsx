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
    stackIds,
  }: UserInfoFormValues) => {
    const stacks = stackIds.map((stackId) => +stackId);
    const response = await client.post("/users", {
      name,
      introduce,
      stackIds: stacks,
    });

    if (response.status === 200) {
      router.replace("/");
    }
  };

  return <UserInfoForm formActionHandler={onSubmit} />;
};

export default SignUpUserForm;
