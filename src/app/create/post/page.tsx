'use client';
import React from 'react';
import {useForm} from "react-hook-form";
import {instance} from "@/shared/api/axiosInstance";
import InputField from "@/features/create/components/InputField";
import TextareaField from "@/features/create/components/TextareaField";
import FormTitle from "@/features/create/components/FormTitle";

interface PostFormData {
  projectName: string;
  deadline: string;
  memberCnt: string;
  link: string;
  contents: string;
}

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<PostFormData>();

  const onSubmit = async (formData: PostFormData) => {
    const response = await instance.post(
      "/mentoring/1/post", {
        projectName: formData.projectName,
        deadline: formData.deadline,
        memberCnt: formData.memberCnt,
        tags: formData.link,
        contents: formData.contents,
      });

    console.log('Submitted Data: ', formData)
    console.log('response: ', response.data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormTitle highlight="프로젝트" title="게시글 작성에 필요한 정보를 입력해주세요."/>

        {/* 프로젝트 제목 */}
        <InputField
          label="제목"
          name="projectName"
          placeholder="제목을 입력해 주세요."
          register={register}
          error={errors.projectName?.message}/>

        {/* 모집 마감일 */}
        <InputField
          label="모집마감"
          name="deadline"
          placeholder="모집마감을 입력해 주세요."
          register={register}
          error={errors.deadline?.message}/>

        <div className="w-full flex gap-5">
          {/* 모집 인원 */}
          <InputField
            label="모집인원"
            name="memberCnt"
            placeholder="모집인원을 입력해 주세요."
            register={register}
            error={errors.memberCnt?.message}/>

          {/* 연락 방법 (오픈카톡 링크) */}
          <InputField
            label="연락 방법"
            name="link"
            placeholder="연락 방법을 입력해 주세요."
            register={register}
            error={errors.link?.message}/>
        </div>

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
    </div>
  );
};

export default Page;