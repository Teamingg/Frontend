"use client";
import React from "react";
import { instance } from "@/service/api/instance/axiosInstance";
import { PostFormData } from "@/app/(form)/create/project/post/page";
import FormTitle from "@/app/(form)/_components/FormTitle";
import PostForm from "@/app/(form)/_components/PostForm";
import { MentoringPostFormFields } from "@/app/(form)/model/MentoringPostFormFields";

const Page = () => {
  const onSubmit = async (formData: PostFormData) => {
    try {
      const response = await instance.post("/mentoring/team/1", {
        projectName: formData.projectName,
        deadline: formData.deadline,
        memberCnt: formData.memberCnt,
        tags: formData.link,
        contents: formData.contents,
      });

      if (response.status === 200) {
        alert("게시글이 수정되었습니다.");
      }
    } catch (error) {
      alert(
        `오류가 발생했습니다: ${error.response?.data?.message || error.message}`
      );
    }
  };

  return (
    <>
      <FormTitle
        highlight="멘토링"
        title="게시글 수정에 필요한 정보를 입력해주세요."
      />
      <PostForm onSubmit={onSubmit} formFields={MentoringPostFormFields} />
    </>
  );
};

export default Page;
