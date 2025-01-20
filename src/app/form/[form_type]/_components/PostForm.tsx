"use client";
import React, {useEffect} from "react";
import TextareaField from "@/components/common/Input/TextArea/TextareaField";
import {
  SubmitHandler,
  useForm,
  Control,
  UseFormRegister,
  Path,
  FieldValues,
  DefaultValues,
  PathValue
} from "react-hook-form";
import InputField from "@/components/common/Input/TextInput/InputField";
import {MentoringPost, ProjectPost} from "@/app/form/[form_type]/_type/formDataTypes";
import {TeamInfoData} from "@/app/team/[page_type]/[team_id]/(member)/info/page";

interface FormField <T extends FieldValues> {
  label: string;
  name: Path<T> | string;
  rules?: object;
}

interface RowField <T extends FieldValues> {
  row: FormField<T>[];
}

type FormFields<T extends FieldValues> = (FormField<T> | RowField<T>)[];

type CustomErrors = {
  contents?: { message: string };
  content?: { message: string };
};

interface Props<T extends FieldValues> {
  onSubmit: SubmitHandler<T>;
  formFields: FormFields<T>;
  control: Control<T>;
  register: UseFormRegister<T>;
  infoData?: TeamInfoData[];
}

const PostForm = <T extends ProjectPost | MentoringPost>(
    {
      onSubmit,
      formFields,
      control,
      register,
      infoData
    }: Props<T>): React.JSX.Element => {

  const formatValue = (value: unknown): string => {
    if (Array.isArray(value)) {
      return value.join(", "); // 배열이면 문자열로 변환
    } else if (typeof value === "object" && value !== null) {
      return JSON.stringify(value); // 객체라면 JSON 문자열 변환
    } else {
      return String(value ?? ""); // 숫자 또는 undefined면 문자열로 변환
    }
  };

  const defaultValues = formFields.reduce<Record<string, string>>((acc, field) => {
    if ("row" in field) {
      field.row.forEach(rowField => {
        const matchedInfo = infoData?.find(item => item.label === rowField.label);
        acc[String(rowField.name)] = formatValue(matchedInfo?.infoData);
      });
    } else {
      const matchedInfo = infoData?.find(item => item.label === field.label);
      acc[String(field.name)] = formatValue(matchedInfo?.infoData);
    }
    return acc;
  }, {});

  // ✅ infoData를 기반으로 defaultValues를 동적으로 설정
  const { handleSubmit, formState: { errors } } = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>
  });

  const customErrors = errors as CustomErrors;
  console.log(infoData)

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        {formFields.map((field, index) => {
          if ("row" in field) {
            return (
                <div key={index} className="w-full flex gap-5">
                  {field.row.map((rowField, subIndex) => (
                      <div key={subIndex} className="w-full mb-4">
                        <InputField
                            key={subIndex}
                            label={rowField.label}
                            name={rowField.name as Path<T>}
                            control={control}
                            rules={rowField.rules ?? {}}
                            defaultValue={defaultValues[rowField.name as string] as unknown as PathValue<T, Path<T>>}
                        />
                      </div>
                  ))}
                </div>
            );
          }

          return (
              <div key={index} className="w-full mb-4">
                <InputField
                    key={index}
                    label={field.label}
                    name={field.name as Path<T>}
                    control={control}
                    rules={field.rules ?? {}}
                    defaultValue={defaultValues[field.name as string] as unknown as PathValue<T, Path<T>>}
                />
              </div>
          );
        })}

        {/* 프로젝트 소개 */}
        <TextareaField
            label="소개"
            name={"contents" as Path<T>} // ✅ Path<T> 변환 적용
            placeholder="프로젝트 소개를 입력해 주세요."
            register={register}
            error={customErrors.contents?.message || customErrors.content?.message}
        />

        {/* 버튼 */}
        <div className="mt-16 text-center">
          <button className="w-[320px] h-[50px] mx-5 rounded-l border-2">닫기</button>
          <button className="w-[320px] h-[50px] mx-5 bg-blue-500 text-white rounded-[5px]">게시글 작성하기</button>
        </div>
      </form>
  );
};

export default PostForm;
