"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex gap-2 items-center cursor-pointer"
    >
      <div className="relative size-2 md:size-4 inline-block">
        <Image src="/icons/backArrow.svg" alt="뒤로가기 아이콘" fill />
      </div>
      <span className="text-primary text-sm md:text-base">뒤로가기</span>
    </button>
  );
};

export default BackButton;
