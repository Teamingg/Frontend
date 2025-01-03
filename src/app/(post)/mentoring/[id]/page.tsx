"use client";

import PostHeader from "../../_components/PostHeader";
import PostInfo from "../../_components/PostInfo";
import { useMutation, useQuery } from "@tanstack/react-query";
import getMentoringPost from "@/service/api/mentoring/post/getMentoringPost";
import PostButtonGroup from "../../_components/PostButtonGroup";
import { instance } from "@/service/api/instance/axiosInstance";
import { AxiosError } from "axios";

const MentoringPostPage = ({ params }: { params: { id: string } }) => {
  const { data } = useQuery({
    queryKey: ["mentoring", "post", params.id],
    queryFn: async () => await getMentoringPost(params.id),
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      await instance.post(`/mentoring/posts/${data?.boardId}/participants`);
    },
    onError: (
      error: AxiosError<{ code: string; message: string; status: number }>
    ) => {
      switch (error.response?.data.message) {
        case "access token invalid":
          console.log("로그인이 필요합니다.");
      }
    },
  });

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
        onClick={mutate}
      />
    </>
  );
};

export default MentoringPostPage;
