"use client";

import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import { client } from "@/service/api/instance/client";
import { UserInfoFormValues } from "@/types/UserInfoFormValues";

const UserInfoForm = dynamic(() => import("@/components/My/UserInfoForm"), {
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">로딩 중...</h2>
        <p>잠시만 기다려주세요.</p>
      </div>
    </div>
  ),
  ssr: false
});

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
