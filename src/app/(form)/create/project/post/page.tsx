"use client";
import React from "react";
import { instance } from "@/service/api/instance/axiosInstance";
import { AxiosError } from "axios";
import FormTitle from "@/app/(form)/_components/FormTitle";
import PostForm from "@/app/(form)/_components/PostForm";
import {
  PostFormData,
  ProjectPostFormFields,
} from "@/app/(form)/model/ProjectPostFormFields";

const Page = () => {
  const onSubmit = async (formData: PostFormData) => {
    try {
      const response = await instance.post("/project/1/post", {
        projectName: formData.projectName,
        deadline: formData.deadline,
        memberCnt: formData.memberCnt,
        tags: formData.link,
        contents: formData.contents,
      });

      if (response.status === 200) {
        alert("게시글이 작성되었습니다.");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errMessage = `${error.response?.data?.message || error.message}`
        alert(`오류가 발생했습니다: ${errMessage}`);
      } else {
        alert(`예기치 않은 오류가 발생했습니다: ${String(error)}`);
      }
    }
  };

  return (
    <>
      <FormTitle
        highlight="프로젝트"
        title="게시글 작성에 필요한 정보를 입력해주세요."
      />
      <PostForm
          onSubmit={onSubmit}
          formFields={ProjectPostFormFields}
      />
    </>
  );
};

export default Page;
