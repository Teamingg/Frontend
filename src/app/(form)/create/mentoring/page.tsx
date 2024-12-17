"use client";
import {instance} from "@/shared/api/axiosInstance";
import FormTitle from "@/app/(form)/components/FormTitle";
import CreateTeamForm from "@/app/(form)/components/CreateTeamForm";
import React from "react";

export interface FormFields {
  label: string;
  name: string;
  required?: boolean;
  rules?: object;
  options?: { value: string; label: string }[];
}

interface MentoringFormRow {
  row: FormFields[];
}

type MentoringForm = FormFields | MentoringFormRow;

export interface MentoringFormData {
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

const defaultValues = {
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
    <>
      <FormTitle highlight="팀" title="을 생성하기에 앞서 간단한 정보를 입력해주세요."/>
      <CreateTeamForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        formFields={MentoringFormFields}
        division={"select"}
      />
    </>
  );
};

export default Page;