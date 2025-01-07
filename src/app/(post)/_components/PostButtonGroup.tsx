"use client";

import { useToast } from "@/hooks/useToast";
import checkCookie from "@/utils/auth/checkCookie";
import Link from "next/link";
import React from "react";

interface PostButtonGroupProps {
  isEdit: boolean;
  postType: "project" | "mentoring";
  teamId: string | number;
  action: () => void;
}

const PostButtonGroup = ({
  isEdit,
  postType,
  teamId,
  action,
}: PostButtonGroupProps) => {
  const { toast } = useToast();
  const category = postType === "project" ? "프로젝트" : "멘토링";

  const onClick = async () => {
    const isLoggedIn = await checkCookie("accessToken");

    if (!isLoggedIn) {
      toast.error("로그인이 필요합니다");
      return;
    }

    action();
  };

  return (
    <div className="flex gap-4">
      <Link
        href={`/team/${postType}/${teamId}`}
        className="py-4 w-full border rounded-lg text-center"
      >
        {`${category} 팀 보러가기`}
      </Link>
      {isEdit ? (
        <Link
          className="py-4 w-full bg-primary text-white rounded-lg text-center"
          href={`/edit/${postType}`}
        >
          수정하기
        </Link>
      ) : (
        <button
          onClick={onClick}
          className="py-4 w-full bg-primary text-white rounded-lg"
        >
          {`${category} 팀 참여 신청하기`}
        </button>
      )}
    </div>
  );
};

export default PostButtonGroup;