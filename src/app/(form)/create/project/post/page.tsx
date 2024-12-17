'use client';
import React from 'react';
import {instance} from "@/shared/api/axiosInstance";
import FormTitle from "@/app/(form)/components/FormTitle";
import PostForm from "@/app/(form)/components/PostForm";
import {PostFormData, ProjectPostFormFields} from "@/app/(form)/model/ProjectPostFormFields";

const Page = () => {
  const onSubmit = async (formData: PostFormData) => {
    try {
      const response = await instance.post(
        "/project/1/post", {
          projectName: formData.projectName,
          deadline: formData.deadline,
          memberCnt: formData.memberCnt,
          tags: formData.link,
          contents: formData.contents,
        });

      if (response.status === 200) {
        alert("게시글이 작성되었습니다.");
      }
    } catch (error) {
      alert(`오류가 발생했습니다: ${error.response?.data?.message || error.message}`);
    }
  }

  return (
    <>
      <FormTitle highlight="프로젝트" title="게시글 작성에 필요한 정보를 입력해주세요."/>
      <PostForm onSubmit={onSubmit} formFields={ProjectPostFormFields}/>
    </>
  );
};

export default Page;