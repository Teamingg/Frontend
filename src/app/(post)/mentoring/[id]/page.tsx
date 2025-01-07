"use client";

import PostHeader from "../../_components/PostHeader";
import PostInfo from "../../_components/PostInfo";

import PostButtonGroup from "../../_components/PostButtonGroup";

import useGetMentoringPost from "@/hooks/post/mentoring/useGetMentoringPost";
import useJoinMentoringTeam from "@/hooks/team/mentoring/useJoinMentoringTeam";
import { useEffect } from "react";
import { useToast } from "@/hooks/useToast";

const MentoringPostPage = ({ params }: { params: { id: string } }) => {
  const { toast } = useToast();
  const { data } = useGetMentoringPost(params.id);

  const { mutate, isSuccess } = useJoinMentoringTeam(params.id);

  useEffect(() => {
    if (isSuccess) {
      toast.success("신청이 완료되었습니다.");
    }
  }, [isSuccess, toast]);

  if (!data) {
    return null;
  }
  return (
    <>
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
        isEdit={data.authority !== "NoAuth"}
        teamId={data.teamId}
        postType={"mentoring"}
        action={mutate}
      />
    </>
  );
};

export default MentoringPostPage;
