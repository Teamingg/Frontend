"use client";

import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.back();
  }, [router]);
  return (
    <Suspense>
      <></>
    </Suspense>
  );
};

export default LoginPage;
