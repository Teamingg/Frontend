'use client';
import React from 'react';
import TextareaField from "@/app/(form)/components/TextareaField";
import {Control, FieldValues, useForm} from "react-hook-form";
import InputField from "@/shared/components/Form/InputField";
import {MentoringPostFormData} from "@/app/(form)/model/MentoringPostFormFields";
import {PostFormData} from "@/app/(form)/model/ProjectPostFormFields";

const PostForm = ({onSubmit, formFields}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<MentoringPostFormData | PostFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formFields.map((field, index) => {
        if ("row" in field) {
          return (
            <div key={index} className="w-full flex gap-5">
              {field.row.map((rowField, index) => {
                return (
                  <div key={index} className="w-full mb-4">
                    <InputField
                      key={index}
                      label={rowField.label}
                      name={rowField.name}
                      control={control as unknown as Control<FieldValues>}
                      rules={rowField.rules}
                    />
                  </div>
                )
              })};
            </div>
          )
        }

        return (
          <div key={index} className="w-full mb-4">
            <InputField
              key={index}
              label={field.label}
              name={field.name}
              control={control as unknown as Control<FieldValues>}
              rules={field.rules}
            />
          </div>
        )
      })}

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

export default PostForm;