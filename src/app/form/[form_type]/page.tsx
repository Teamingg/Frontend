"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CreatePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.back();
  }, [router]);
  return null;
};

export default CreatePage;