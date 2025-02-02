"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { queryclient } from "@/lib/getQueryClient";
import { client } from "@/service/api/instance/client/client";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await client.post("/token/logout");

      // 에러가 발생했을 때
      if (response.status !== 200) {
        throw new Error("잠시 후 다시 시도해주세요.");
      }

      // 로그아웃 시 모든 캐시 데이터 리셋
      queryclient.resetQueries();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button type="button" onClick={handleLogout}>
      로그아웃
    </button>
  );
};

export default LogoutButton;
