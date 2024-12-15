"use client";
import React from 'react';
import {useForm} from "react-hook-form";
import {instance} from "@/shared/api/axiosInstance";
import {PostFormData} from "@/app/(form)/create/project/post/page";
import FormTitle from "@/features/form/components/FormTitle";
import InputField from "@/features/form/components/InputField";
import TextareaField from "@/features/form/components/TextareaField";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<PostFormData>();

  const onSubmit = async (formData: PostFormData) => {
    try {
      const response = await instance.post(
        "/mentoring/1/post", {
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
  }}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormTitle highlight="멘토링" title="게시글 작성에 필요한 정보를 입력해주세요."/>

      {/* 프로젝트 제목 */}
      <InputField
        label="제목"
        name="projectName"
        placeholder="제목을 입력해 주세요."
        register={register}
        error={errors.projectName?.message}/>

      <div className="w-full flex gap-5">
        {/* 모집 분야 */}
        <InputField
          label="모집분야"
          name="deadline"
          placeholder="모집마감을 입력해 주세요."
          register={register}
          error={errors.deadline?.message}/>

        {/* 모집 인원 */}
        <InputField
          label="모집인원"
          name="memberCnt"
          placeholder="모집인원을 입력해 주세요."
          register={register}
          error={errors.memberCnt?.message}/>
      </div>

      {/* 연락 방법 (오픈카톡 링크) */}
      <InputField
        label="연락 방법"
        name="link"
        placeholder="연락 방법을 입력해 주세요."
        register={register}
        error={errors.link?.message}/>

      {/* 프로젝트 소개 */}
      <TextareaField
        label="소개"
        name="contents"
        placeholder="프로젝트 소개를 입력해 주세요."
        register={register}
        error={errors.contents?.message}/>

      {/* 버튼 */}
      <div className="mt-16 text-center">
        <button className="w-[320px] h-[50px] mx-5 rounded-l border-2">닫기</button>
        <button className="w-[320px] h-[50px] mx-5 bg-blue-500 text-white rounded-[5px]">게시글 작성하기</button>
      </div>
    </form>
  );
};

export default Page;