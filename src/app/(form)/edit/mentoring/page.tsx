"use client";
import React from "react";
import FormTitle from "@/app/(form)/_components/FormTitle";
import PostForm from "@/app/(form)/_components/PostForm";
import { MentoringPostFormFields } from "@/app/(form)/model/MentoringPostFormFields";
import {MentoringPost} from "@/app/(form)/_type/formDataTypes";
import {useSubmit} from "@/hooks/form/useSubmit";

const Page = () => {
  const { submit, isLoading, error } = useSubmit<MentoringPost>({
    endpoint: "/mentoring/team/1",
    formatPayload: (formData) => ({
      name: formData.name,
      deadline: formData.deadline,
      mentoringCnt: formData.mentoringCnt,
      tags: formData.link,
      contents: formData.contents,
    }),
    onSuccess: () => {
      alert("게시글이 수정되었습니다.")
    },
  });

  return (
    <>
      <FormTitle highlight="멘토링" title="게시글 수정에 필요한 정보를 입력해주세요."/>
      <PostForm<MentoringPost>
          onSubmit={(data) => submit(data)}
          formFields={MentoringPostFormFields}
      />
      {error && <p className="text-red-500">{(error as Error).message}</p>}
      {isLoading && <p className="text-blue-500">게시글 수정 중...</p>}
    </>
  );
};

export default Page;
