"use client";

import CancelJoinButton from "@/components/CancelJoinButton";
import { useToast } from "@/hooks/useToast";
import checkCookie from "@/utils/auth/checkCookie";
import Link from "next/link";
import React from "react";

interface PostButtonGroupProps {
  isApply: boolean; // 지원여부
  isEdit: boolean; // 팀원여부
  postType: "project" | "mentoring";
  teamId: number;
  boardId: number;
  action: () => void;
}

const PostButtonGroup = ({
  isEdit,
  postType,
  teamId,
  isApply,
  boardId,
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
        href={`/team/${postType}/${teamId}/info`}
        className="py-4 w-full border rounded-lg text-center"
      >
        {`${category} 팀 보러가기`}
      </Link>

      {!isEdit && isApply && (
        <CancelJoinButton category={postType} teamId={teamId} boardId={boardId}>
          지원 취소하기
        </CancelJoinButton>
      )}

      {!isApply && isEdit && (
        <Link
          className="py-4 w-full bg-primary text-white rounded-lg text-center"
          href={`/edit/${postType}`}
        >
          수정하기
        </Link>
      )}

      {!isEdit && !isApply && (
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
