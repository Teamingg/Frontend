"use client";
import {Control, FieldValues, useForm} from "react-hook-form";
import {instance} from "@/shared/api/axiosInstance";
import InputField from "@/shared/components/Form/InputField";
import FormTitle from "@/features/form/components/FormTitle";
import TextareaField from "@/features/form/components/TextareaField";

interface MentoringFormFields {
  label: string;
  name: string;
  required?: boolean;
  rules?: object;
  options?: { value: string; label: string }[];
}

interface MentoringFormRow {
  row: MentoringFormFields[];
}

type MentoringForm = MentoringFormFields | MentoringFormRow;

interface MentoringFormData {
  name: string;
  deadline: string;
  startDate: string;
  endDate: string;
  mentoringCnt: string;
  content: string;
  status: string;
  link: string;
  role: string;
  categories: number[];
}

const MentoringFormFields: MentoringForm[] = [
  {
    label: "팀 이름",
    name: "name" as keyof MentoringFormData,
    required: true,
    rules: { required: "팀 이름은 필수 항목입니다." },
  },
  {
    label: "모집 마감일",
    name: "deadline" as keyof MentoringFormData,
    required: true,
    rules: { required: "모집 마감일은 필수 항목입니다." },
  },
  {
    row: [
      {
        label: "멘토링 시작일",
        name: "startDate" as keyof MentoringFormData,
        required: true,
        rules: { required: "멘토링 시작일은 필수 항목입니다." },
      },
      {
        label: "멘토링 종료일",
        name: "endDate" as keyof MentoringFormData,
        required: true,
        rules: { required: "멘토링 종료일은 필수 항목입니다." },
      },
    ],
  },
  {
    row: [
      {
        label: "내 역할",
        name: "role" as keyof MentoringFormData,
        options: [
          { value: "MENTOR", label: "멘토" },
          { value: "MENTEE", label: "멘티" },
        ],
        required: true,
      },
      {
        label: "모집인원",
        name: "mentoringCnt" as keyof MentoringFormData,
        required: true,
        rules: { required: "모집인원은 필수 항목입니다." },
      },
    ],
  },
  {
    row: [
      {
        label: "모집 카테고리",
        name: "categories" as keyof MentoringFormData,
        required: true,
      },
      {
        label: "연락 방법",
        name: "link" as keyof MentoringFormData,
        required: true,
        rules: { required: "연락 방법은 필수 항목입니다." },
      },
    ],
  },
  {
    label: "팀 소개",
    name: "content" as keyof MentoringFormData,
    required: true,
    rules: { required: "팀 소개는 필수 항목입니다." },
  },
];

const DefaultValues = {
  name: "",
  deadline: "",
  startDate: "",
  endDate: "",
  mentoringCnt: "",
  content: "",
  link: "",
  role: "",
  categories: [],
};

const Page = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<MentoringFormData>({
    defaultValues: DefaultValues
  });

  const onSubmit = async (formData: MentoringFormData) => {
    const payload = {
      name: formData.name,
      deadline: formData.deadline,
      startDate: formData.startDate,
      endDate: formData.endDate,
      mentoringCnt: Number(formData.mentoringCnt), // 문자열에서 숫자로 변환
      content: formData.content,
      link: formData.link,
      role: formData.role,
      categories: formData.categories,
      status: "RECRUITING",
    };

    try {
      const response = await instance.post("/mentoring/team", payload);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormTitle highlight="팀" title="을 생성하기에 앞서 간단한 정보를 입력해주세요."/>

      {MentoringFormFields.map((field, index) => {
        // 같은 줄에 두 개의 필드가 있는 경우 (row)
        if ("row" in field) {
          return (
            <div key={index} className="flex gap-5 mb-4">
              {field.row.map((rowField, subIndex) => {
                // options 속성이 존재하면 select 박스 렌더링
                if (rowField.options) {
                  return (
                    <div key={subIndex} className="w-full">
                      <label htmlFor={rowField.name} className="block mb-2">{rowField.label}</label>
                      <select
                        {...register(rowField.name)}
                        id={rowField.name}
                        className="w-full p-2 border block"
                      >
                        {rowField.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                }

                return (
                  <InputField
                    key={subIndex}
                    label={rowField.label}
                    name={rowField.name}
                    control={control as unknown as Control<FieldValues>}
                    rules={rowField.rules}
                  />
                );
              })}
            </div>
          );
        }

        // 단일 필드 렌더링
        if (field.options) {
          return (
            <div key={index} className="w-full mb-4">
              <label htmlFor={field.name} className="block mb-2">{field.label}</label>
              <select
                {...register(field.name)}
                id={field.name}
                className="w-full p-2 border block"
              >
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        return (
          <div key={index} className="w-full mb-4">
            <InputField
              label={field.label}
              name={field.name}
              control={control as unknown as Control<FieldValues>}
              rules={field.rules}
            />
          </div>
        );
      })}

      <TextareaField
        label="소개"
        name="content"
        placeholder="프로젝트 소개를 입력해 주세요."
        register={register}
        error={errors.content?.message}/>

      {/* 버튼 */}
      <div className="mt-16 text-center">
        <button className="w-[320px] h-[50px] mx-5 rounded-l border-2">닫기</button>
        <button className="w-[320px] h-[50px] mx-5 bg-blue-500 text-white rounded-[5px]">게시글 작성하기</button>
      </div>
    </form>
  );
};

export default Page;