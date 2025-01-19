"use client";
import React from 'react';
import {useSubmit} from "@/hooks/form/useSubmit";
import {useParams} from "next/navigation";
import {MentoringPostFormData, MentoringPostFormFields} from "@/app/(form)/model/MentoringPostFormFields";
import {PostFormData, ProjectPostFormFields} from "@/app/(form)/model/ProjectPostFormFields";
import FormTitle from "@/app/(form)/_components/FormTitle";
import PostForm from "@/app/(form)/_components/PostForm";

const Page = () => {
  // 경로(page_type)에 따라 다른 페이지 출력
  const { page_type } = useParams();
  const isProject = page_type === "project";
  const formFields = isProject ? ProjectPostFormFields : MentoringPostFormFields;
  const endPoints = isProject ? "/project/1/post" : "/mentoring/1/post"

  const { submit, isLoading, error } = useSubmit<MentoringPostFormData | PostFormData>({
    endpoint: endPoints,
    formatPayload: (formData) => {
      return isProject
          // 프로젝트 데이터
          ? {
            projectName: (formData as PostFormData).projectName,
            deadline: (formData as PostFormData).deadline,
            memberCnt: (formData as PostFormData).memberCnt,
            tags: (formData as PostFormData).link,
            contents: (formData as PostFormData).contents,
          }
          // 멘토링 데이터
          : {
            name: (formData as MentoringPostFormData).name,
            deadline: (formData as MentoringPostFormData).deadline,
            mentoringCnt: (formData as MentoringPostFormData).mentoringCnt,
            link: (formData as MentoringPostFormData).link,
            contents: (formData as MentoringPostFormData).contents,
          }
    },
    onSuccess: () => alert("게시글이 작성되었습니다.")
  });
  return (
      <>
        <FormTitle
            highlight={isProject ? "프로젝트" : "멘토링"}
            title="게시글 작성에 필요한 정보를 입력해주세요."
        />
        <PostForm
            onSubmit={(data) => submit(data)}
            formFields={formFields}
        />
        {error && <p className="text-red-500">{(error as Error).message}</p>}
        {isLoading && <p className="text-blue-500">팀 생성 중...</p>}
      </>
  );
};

export default Page;