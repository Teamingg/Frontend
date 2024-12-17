"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { instance } from "@/service/api/instance/axiosInstance";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await instance.post("/token/logout");

      // 에러가 발생했을 때
      if (response.status !== 200) {
        throw new Error("잠시 후 다시 시도해주세요.");
      }

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
