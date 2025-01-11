"use client";

import { useEffect } from "react";

import { queryclient } from "@/lib/getQueryClient";

import useGetMentoringPost from "@/hooks/post/mentoring/useGetMentoringPost";
import useJoinMentoringTeam from "@/hooks/team/mentoring/useJoinMentoringTeam";
import { useToast } from "@/hooks/useToast";
import useModal from "@/hooks/useModal";

import AlertModal from "@/components/common/Modal/AlertModal";

import PostHeader from "../../_components/PostHeader";
import PostInfo from "../../_components/PostInfo";

import PostButtonGroup from "../../_components/PostButtonGroup";

const MentoringPostPage = ({ params }: { params: { id: string } }) => {
  const { modal, openModal, closeModal } = useModal();
  const { toast } = useToast();
  const { data } = useGetMentoringPost(params.id);

  const { mutate, isSuccess } = useJoinMentoringTeam(params.id);

  // 버튼 렌더링 이슈, SSR , prefetchQuery의 데이터가 어떻게 넘어오는지 확인하기

  useEffect(() => {
    if (isSuccess) {
      queryclient.invalidateQueries({
        queryKey: ["mentoring", "post", params.id],
      });
      toast.success("신청이 완료되었습니다.");
    }
  }, [isSuccess]);

  if (!data) {
    return null;
  }
  return (
    <>
      {/* 팀 신청 버튼 누를 시 사용자 컨펌 받는 모달 */}
      {modal && (
        <AlertModal
          onClose={closeModal}
          message="해당 팀에 지원하시겠습니까?"
          onConfirm={() => {
            closeModal();
            mutate();
          }}
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

      <PostButtonGroup
        isApply={data.authority === "NoAuth" && data.isParticipate}
        isEdit={data.authority !== "NoAuth"}
        teamId={data.teamId}
        postType="mentoring"
        action={openModal}
        boardId={data.boardId}
      />
    </>
  );
};

export default MentoringPostPage;
