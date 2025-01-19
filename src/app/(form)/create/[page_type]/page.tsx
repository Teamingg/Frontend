"use client";
import React from 'react';
import {useParams} from "next/navigation";
import {useSubmit} from "@/hooks/form/useSubmit";
import {
  MentoringFormFields,
  defaultValues as mentoringDefaults
} from "@/app/(form)/_data/createMentoring";
import {
  ProjectFormFields,
  defaultValues as projectDefaults
} from "@/app/(form)/_data/createProject";
import { MentoringFormData, ProjectFormData } from "@/app/(form)/_type/createFormData";
import FormTitle from "@/app/(form)/_components/FormTitle";
import CreateTeamForm from "@/app/(form)/_components/CreateTeamForm";

const Page = () => {
  // 경로에 따라 다른 페이지 출력
  const { page_type } = useParams();
  const isProject = page_type === "project";
  const formFields = isProject ? ProjectFormFields : MentoringFormFields;
  const defaultValues = isProject ? projectDefaults : mentoringDefaults;
  const endPoints = isProject ? "/project/team" : "/mentoring/teams"

  const { submit, isLoading, error } = useSubmit<ProjectFormData | MentoringFormData>({
    endpoint: endPoints,
    formatPayload: (formData) => {
      return isProject
          // 프로젝트 데이터
          ? {
            projectName: (formData as ProjectFormData).projectName,
            deadline: (formData as ProjectFormData).deadline,
            startDate: (formData as ProjectFormData).startDate,
            endDate: (formData as ProjectFormData).endDate,
            memberCnt: Number((formData as ProjectFormData).memberCnt),
            contents: (formData as ProjectFormData).contents,
            stackIds: (formData as ProjectFormData).stacks,
            link: (formData as ProjectFormData).link,
            recruitCategoryIds: [(formData as ProjectFormData).recruitCategoryIds],
          }
          // 멘토링 데이터
          : {
            name: (formData as MentoringFormData).name,
            startDate: (formData as MentoringFormData).startDate,
            endDate: (formData as MentoringFormData).endDate,
            mentoringCnt: Number((formData as MentoringFormData).mentoringCnt),
            content: (formData as MentoringFormData).content,
            link: (formData as MentoringFormData).link,
            role: (formData as MentoringFormData).role,
            categories: Array.isArray((formData as MentoringFormData).categories)
                ? (formData as MentoringFormData).categories.map(Number)
                : [Number((formData as MentoringFormData).categories)],
          };
    },
    onSuccess: () => {
      alert(`${isProject ? "프로젝트" : "멘토링"} 팀이 성공적으로 생성되었습니다!`);
    }
  });

  return (
      <>
        <FormTitle
            highlight={isProject ? "프로젝트" : "멘토링"}
            title="팀을 생성하기에 앞서 간단한 정보를 입력해주세요."
        />
        <CreateTeamForm
            onSubmit={(data) => submit(data)}
            defaultValues={defaultValues}
            formFields={formFields}
            division={isProject ? "stacks" : "select"}
        />
        {error && <p className="text-red-500">{(error as Error).message}</p>}
        {isLoading && <p className="text-blue-500">팀 생성 중...</p>}
      </>
  );
};

export default Page;