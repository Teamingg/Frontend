"use client";

import { useEffect } from "react";

import { queryclient } from "@/lib/getQueryClient";

import useGetMentoringPost from "@/hooks/post/mentoring/useGetMentoringPost";
import useJoinMentoringTeam from "@/hooks/team/mentoring/useJoinMentoringTeam";
import { useToast } from "@/hooks/useToast";
import useModal from "@/hooks/useModal";

import AlertModal from "@/components/common/Modal/AlertModal";

import PostHeader from "../../../_components/PostHeader";
import PostInfo from "../../../_components/PostInfo";

import PostButtonGroup from "../../../_components/PostButtonGroup";

const MentoringPost = ({ id }: { id: string }) => {
  const { modal, openModal, closeModal } = useModal();
  const { toast } = useToast();
  const { data, isFetching } = useGetMentoringPost(id);

  const { mutate } = useJoinMentoringTeam(id);

  const handleSubmit = () => {
    try {
      mutate();

      queryclient.invalidateQueries({
        queryKey: ["mentoring", "post", id],
      });

      toast.success("신청이 완료되었습니다.");
    } catch {
      toast.error("잠시 후 다시 시도해주세요.");
    }

    closeModal();
  };

  if (!data) {
    return null;
  }
  return (
    <>
      {/* 팀 신청 버튼 누를 시 사용자 컨펌 받는 모달 */}
      {modal && (
        <AlertModal
          onClose={closeModal}
          title="지원하기"
          message="해당 팀에 지원하시겠습니까?"
          onConfirm={handleSubmit}
          buttonLabel="네"
          isOpen={modal}
        />
      )}
      <PostHeader
        title={data.title}
        teamName={data.mentoringTeamName}
        deadLine={data.deadLine}
        status={data.status}
      />

      <div className="grid grid-cols-2 gap-4 bg-[#f5f5f5] p-6 rounded-lg">
        <PostInfo
          label="멘토링기간"
          content={`${data.startDate} ~ ${data.endDate}`}
        />
        <PostInfo label="모집분야" content="멘티" />
        <PostInfo label="모집인원" content={data.mentoringCnt.toString()} />
        <PostInfo label="모집카테고리" content="개발/프로그래밍" />
        <PostInfo label="연락수단" content={data.link} type="link" />
      </div>

      <p className="p-6">{data.contents}</p>

      {data.status === "RECRUITING" && (
        <PostButtonGroup
          isfetch={isFetching}
          isApply={data.authority === "NoAuth" && data.isParticipate}
          isEdit={data.authority !== "NoAuth"}
          teamId={data.teamId}
          postType="mentoring"
          action={openModal}
          boardId={data.boardId}
        />
      )}
    </>
  );
};

export default MentoringPost;
