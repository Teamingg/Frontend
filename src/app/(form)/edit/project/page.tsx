"use client";
import React from "react";
import FormTitle from "@/app/(form)/_components/FormTitle";
import PostForm from "@/app/(form)/_components/PostForm";
import {
  ProjectPostFormFields,
} from "@/app/(form)/model/ProjectPostFormFields";
import {useSubmit} from "@/hooks/form/useSubmit";
import {ProjectEditFormFields} from "@/app/(form)/_type/createFormData";

const Page = () => {
  const { submit, isLoading, error } = useSubmit<ProjectEditFormFields>({
    endpoint: "/mentoring/post/1/1/edit",
    formatPayload: (formData: ProjectEditFormFields) => ({
      projectName: formData.projectName,
      deadline: formData.deadline,
      memberCnt: formData.memberCnt,
      tags: formData.link,
      contents: formData.contents,
    }),
    onSuccess: () => {
      alert("게시글이 수정되었습니다.")
    },
  });

  return (
    <>
      <FormTitle highlight="프로젝트" title="게시글 작성에 필요한 정보를 입력해주세요."
      />
      <PostForm
          onSubmit={(data) => submit(data)}
          formFields={ProjectPostFormFields}
      />
      {error && <p className="text-red-500">{(error as Error).message}</p>}
      {isLoading && <p className="text-blue-500">게시글 수정 중...</p>}
    </>
  );
};

export default Page;
