"use client";

import { useRouter } from "next/navigation";

const Error = ({ error }: { error: Error }) => {
  const router = useRouter();

  return (
    <div className="py-64 text-center">
      <p className=" text-xl mb-4">{error?.message}</p>
      <button
        onClick={() => router.push("/")}
        className="bg-primary text-white rounded-lg w-[150px] py-2 hover:bg-opacity-90 transition-colors"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default Error;
