"use client";
import React from "react";
import TextareaField from "@/components/common/Input/TextArea/TextareaField";
import {FieldValues, SubmitHandler, Path, useForm} from "react-hook-form";
import InputField from "@/components/common/Input/TextInput/InputField";

interface FormField<T> {
  label: string;
  name: Path<T>;
  rules?: object;
}

interface RowField<T> {
  row: FormField<T>[];
}

type FormFields<T> = (FormField<T> | RowField<T>)[];

type CustomErrors = {
  contents?: { message: string };
  content?: { message: string };
};

interface Props<T extends FieldValues> {
  onSubmit: SubmitHandler<T>; // `onSubmit` 타입 명시
  formFields: FormFields<T>;
}

const PostForm = <T extends FieldValues>({
  onSubmit,
  formFields
}:  Props<T>): React.JSX.Element => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>();
  const customErrors = errors as CustomErrors;

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
                      name={rowField.name as Path<T>}
                      control={control}
                      rules={rowField.rules ?? {}}
                    />
                  </div>
                );
              })}
              ;
            </div>
          );
        }

        return (
          <div key={index} className="w-full mb-4">
            <InputField
              key={index}
              label={field.label}
              name={field.name}
              control={control}
              rules={field.rules ?? {}}
            />
          </div>
        );
      })}

      {/* 프로젝트 소개 */}
      <TextareaField
        label="소개"
        name={"contents" as Path<T>}
        placeholder="프로젝트 소개를 입력해 주세요."
        register={register}
        error={customErrors.contents?.message || customErrors.content?.message}
      />

      {/* 버튼 */}
      <div className="mt-16 text-center">
        <button className="w-[320px] h-[50px] mx-5 rounded-l border-2">
          닫기
        </button>
        <button className="w-[320px] h-[50px] mx-5 bg-blue-500 text-white rounded-[5px]">
          게시글 작성하기
        </button>
      </div>
    </form>
  );
};

export default PostForm;
