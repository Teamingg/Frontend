"use client";
import React from "react";
import {Control, FieldValues, useForm} from "react-hook-form";
import {instance} from "@/shared/api/axiosInstance";
import {STACK_LIST} from "@/shared/Model/SelectBoxList";
import SelectCheckBox from "@/shared/components/Form/SelectCheckBox";
import FormTitle from "@/features/form/components/FormTitle";
import InputField from "@/shared/components/Form/InputField";
import TextareaField from "@/features/form/components/TextareaField";
import CreateForm from "@/app/(form)/components/CreateForm";

interface ProjectFormFields {
  label: string;
  name: string;
  required?: boolean;
  rules?: object;
  options?: { value: string; label: string }[];
}

interface ProjectFormRow {
  row: ProjectFormFields[];
}

type ProjectForm = ProjectFormFields | ProjectFormRow;

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

const ProjectFormFields: ProjectForm[] = [
  {
    label: "팀 이름",
    name: "projectName" as keyof ProjectFormData,
    required: true,
    rules: {required: "팀 이름은 필수 항목입니다."},
  },
  {
    label: "모집 마감일",
    name: "deadline" as keyof ProjectFormData,
    required: true,
    rules: {required: "모집 마감일은 필수 항목입니다."},
  },
  {
    row: [
      {
        label: "프로젝트 시작일",
        name: "startDate" as keyof ProjectFormData,
        required: true,
        rules: {required: "프로젝트 시작일은 필수 항목입니다."},
      },
      {
        label: "프로젝트 종료일",
        name: "endDate" as keyof ProjectFormData,
        required: true,
        rules: {required: "프로젝트 종료일은 필수 항목입니다."},
      },
    ],
  },
  {
    row: [
      {
        label: "기술스택",
        name: "stacks" as keyof ProjectFormData,
        options: STACK_LIST,
        required: true,
        rules: {required: "기술스택은 필수 항목입니다."},
      },
      {
        label: "모집인원",
        name: "memberCnt" as keyof ProjectFormData,
        required: true,
        rules: {required: "모집인원은 필수 항목입니다."},
      },
    ]
  },
  {
    row: [
      {
        label: "연락 방법",
        name: "link" as keyof ProjectFormData,
        required: true,
        rules: {required: "연락 방법은 필수 항목입니다."},
      },
      {
        label: "모집 구분",
        name: "recruitCategoryIds" as keyof ProjectFormData,
        required: true,
        rules: {required: "모집 구분은 필수 항목입니다."},
      },
    ]
  }
];

const DefaultValues = {
  projectName: "",
  deadline: "",
  startDate: "",
  endDate: "",
  memberCnt: "",
  contents: "",
  link: "",
  stacks: [],
  recruitCategoryIds: [],
};

const Page = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<ProjectFormData>({
    defaultValues: DefaultValues,
  });

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

      {ProjectFormFields.map((field, index) => {
        if ("row" in field) {
          return (
            <div className="w-full flex gap-5" key={index}>
              {field.row.map((rowField, index) => {
                if (rowField.options) {
                  return (
                    <div className="w-full" key={index}>
                      <label htmlFor={rowField.name}>
                        {rowField.label}
                      </label>
                      <SelectCheckBox
                        name={rowField.name}
                        placeholder="선택해주세요."
                        checkBoxList={rowField.options}
                        control={control as unknown as Control<FieldValues>}
                      />
                    </div>
                  );
                }

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
                );
              })}
            </div>
          )
        }

        if (field.options) {
          return (
            <div className="w-full" key={index}>
              <label htmlFor={field.name}>{field.label}</label>
              <SelectCheckBox
                name={field.name}
                placeholder="선택해주세요."
                checkBoxList={field.options}
                control={control as unknown as Control<FieldValues>}
              />
            </div>
          );
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