"use client";
import React from "react";

import { instance } from "@/service/api/instance/axiosInstance";

import STACK_LIST from "@/constant/stackList";

import CreateTeamForm from "../../_components/CreateTeamForm";
import FormTitle from "../../_components/FormTitle";
import {useMutation} from "@tanstack/react-query";
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

export type ProjectForm = ProjectFormFields | ProjectFormRow;

export interface ProjectFormData {
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
    rules: { required: "팀 이름은 필수 항목입니다." },
  },
  {
    label: "모집 마감일",
    name: "deadline" as keyof ProjectFormData,
    required: true,
    rules: { required: "모집 마감일은 필수 항목입니다." },
  },
  {
    row: [
      {
        label: "프로젝트 시작일",
        name: "startDate" as keyof ProjectFormData,
        required: true,
        rules: { required: "프로젝트 시작일은 필수 항목입니다." },
      },
      {
        label: "프로젝트 종료일",
        name: "endDate" as keyof ProjectFormData,
        required: true,
        rules: { required: "프로젝트 종료일은 필수 항목입니다." },
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
        rules: { required: "기술스택은 필수 항목입니다." },
      },
      {
        label: "모집인원",
        name: "memberCnt" as keyof ProjectFormData,
        required: true,
        rules: { required: "모집인원은 필수 항목입니다." },
      },
    ],
  },
  {
    row: [
      {
        label: "연락 방법",
        name: "link" as keyof ProjectFormData,
        required: true,
        rules: { required: "연락 방법은 필수 항목입니다." },
      },
      {
        label: "모집 구분",
        name: "recruitCategoryIds" as keyof ProjectFormData,
        required: true,
        rules: { required: "모집 구분은 필수 항목입니다." },
      },
    ],
  },
];

const defaultValues = {
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
      recruitCategoryIds: [formData.recruitCategoryIds],
    };

    console.log("📌 Payload:", payload);
    try {
      const response = await instance.post("/project/team", payload);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <>
      <FormTitle
        highlight="팀"
        title="을 생성하기에 앞서 간단한 정보를 입력해주세요."
      />
      <CreateTeamForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        formFields={ProjectFormFields}
        division="stacks"
      />
    </>
  );
};

export default Page;
