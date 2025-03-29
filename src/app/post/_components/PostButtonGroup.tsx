"use client";

import CancelJoinButton from "@/components/Button/CancelJoinButton";
import { useToast } from "@/hooks/useToast";
import { checkCookie } from "@/utils/cookies";
import Link from "next/link";
import React from "react";
import { BeatLoader } from "react-spinners";

interface PostButtonGroupProps {
  isfetch: boolean;
  isApply: boolean; // 지원여부
  isEdit: boolean; // 팀원여부
  postType: "project" | "mentoring";
  teamId: number;
  boardId: number;
  action: () => void;
}

const PostButtonGroup = ({
  isfetch,
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
    const isLoggedIn =
      (await checkCookie("accessToken")) || (await checkCookie("refreshToken"));

    if (!isLoggedIn) {
      toast.error("로그인이 필요합니다");
      return;
    }

    action();
  };

  return (
    <div className="w-full  flex flex-row  gap-4 text-sm md:text-base p-4 ">
      <Link
        href={`/team/${postType}/${teamId}/dashboard`}
        className="py-3 md:py-4 w-full border rounded-lg text-center block"
      >
        {`${category} 팀 보러가기`}
      </Link>

      {/* 패칭 중일 때 */}
      {isfetch && (
        <div
          onClick={onClick}
          className="py-3 md:py-4 h-[58px] w-full bg-gray-50 rounded-lg animate-pulse flex justify-center items-center"
        >
          <BeatLoader color="#337CEB" size={10} />
        </div>
      )}

      {!isfetch && (
        <>
          {/* 지원한 상태 */}
          {!isEdit && isApply && (
            <CancelJoinButton
              category={postType}
              teamId={teamId}
              boardId={boardId}
            >
              지원 취소하기
            </CancelJoinButton>
          )}

          {/* 팀원인 상태 */}
          {!isApply && isEdit && (
            <Link
              className="py-3 md:py-4 w-full bg-primary text-white rounded-lg text-center"
              href={`/edit/${postType}`}
            >
              수정하기
            </Link>
          )}

          {/* 지원하지 않은 상태 */}
          {!isEdit && !isApply && (
            <button
              onClick={onClick}
              className="py-3 md:py-4 w-full bg-primary text-white rounded-lg hover:bg-black/90 transition-colors"
            >
              {`${category} 팀 참여 신청하기`}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default PostButtonGroup;
