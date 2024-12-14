"use client";
import {Control, Controller, FieldValues, useForm} from "react-hook-form";
import {instance} from "@/shared/api/axiosInstance";
import {STACK_LIST} from "@/shared/Model/SelectBoxList";
import SelectCheckBox from "@/shared/components/Form/SelectCheckBox";
import FormTitle from "@/features/create/components/FormTitle";
import React from "react";
import InputField from "@/features/create/components/InputField";
import TextareaField from "@/features/create/components/TextareaField";

interface ProjectFormData {
  projectName: string;
  deadline: string;
  startDate: string;
  endDate: string;
  memberCnt: string;
  contents: string; // 필드 이름과 타입 확인
  link: string;
  stacks: number[];
  recruitCategoryIds: number[];
}

const Page = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<ProjectFormData>({
    defaultValues: {
      projectName: "",
      deadline: "",
      startDate: "",
      endDate: "",
      memberCnt: "",
      contents: "",
      link: "",
      stacks: [],
      recruitCategoryIds: [],
    }});

  const onSubmit = async (formData: ProjectFormData) => {
    const payload = {
      projectName: formData.projectName,
      deadline: formData.deadline,
      startDate: formData.startDate,
      endDate: formData.endDate,
      memberCnt: Number(formData.memberCnt), // 문자열에서 숫자로 변환
      contents: formData.contents,
      stackIds: formData.stacks,
      link: formData.link,
      recruitCategoryIds: formData.recruitCategoryIds,
    };

    try {
      const response = await instance.post("/project/team", payload);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormTitle highlight="팀" title="을 생성하기에 앞서 간단한 정보를 입력해주세요."/>

      <InputField
        label="팀 이름"
        name="projectName"
        placeholder="팀 이름을 입력해주세요."
        register={register}
        error={errors.projectName?.message}/>

      <InputField
        label="모집 마감일"
        name="deadline"
        placeholder="마감 일자를 입력해 주세요."
        register={register}
        error={errors.deadline?.message}/>

      <div className="w-full flex gap-5">
        <InputField
          label="프로젝트 시작일"
          name="startDate"
          placeholder="프로젝트 시작일을 선택해 주세요."
          register={register}
          error={errors.startDate?.message}/>

        <InputField
          label="프로젝트 종료일"
          name="endDate"
          placeholder="프로젝트 종료일을 입력해 주세요."
          register={register}
          error={errors.endDate?.message}/>
      </div>

      <div className="w-full flex gap-5">
        <div className="w-full">
          <label htmlFor="stacks">기술스택</label>
          <SelectCheckBox
            name="stacks"
            placeholder="사용가능한 기술스택을 선택해주세요."
            checkBoxList={STACK_LIST}
            control={control as unknown as Control<FieldValues>}
            maximum={8}
          />
        </div>

        <InputField
          label="모집인원"
          name="memberCnt"
          placeholder="모집인원을 입력해 주세요."
          register={register}
          error={errors.memberCnt?.message}/>
      </div>

      <div className="w-full flex gap-5">
        <InputField
          label="모집 구분"
          name="recruitCategoryIds"
          placeholder="모집 구분을 입력해 주세요."
          register={register}
          error={errors.recruitCategoryIds?.message}/>

        <InputField
          label="연락 방법"
          name="link"
          placeholder="연락 방법을 입력해 주세요."
          register={register}
          error={errors.link?.message}/>
      </div>

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