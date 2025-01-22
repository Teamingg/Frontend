"use client";
import React from 'react';
import {useParams} from "next/navigation";
import {useSubmit} from "@/hooks/form/useSubmit";
import {
  MentoringFormFields,
  defaultValues as mentoringDefaults
} from "@/app/form/_data/createMentoring";
import {
  ProjectFormFields,
  defaultValues as projectDefaults
} from "@/app/form/_data/createProject";
import { MentoringCreationData, ProjectCreationData } from "@/app/form/_type/formDataTypes";
import FormTitle from "@/app/form/_components/FormTitle";
import CreateTeamForm from "@/app/form/_components/CreateTeamForm";

const Page = () => {
  // 경로에 따라 다른 페이지 출력
  const { page_type } = useParams();
  const isProject = page_type === "project";
  const formFields = isProject ? ProjectFormFields : MentoringFormFields;
  const defaultValues = isProject ? projectDefaults : mentoringDefaults;
  const endPoints = isProject ? "/project/team" : "/mentoring/teams"

  const { submit, isLoading, error } = useSubmit<ProjectCreationData | MentoringCreationData>({
    endpoint: endPoints,
    formatPayload: (formData) => {
      return isProject
          // 프로젝트 데이터
          ? {
            projectName: (formData as ProjectCreationData).projectName,
            deadline: (formData as ProjectCreationData).deadline,
            startDate: (formData as ProjectCreationData).startDate,
            endDate: (formData as ProjectCreationData).endDate,
            memberCnt: Number((formData as ProjectCreationData).memberCnt),
            contents: (formData as ProjectCreationData).contents,
            stackIds: (formData as ProjectCreationData).stacks,
            link: (formData as ProjectCreationData).link,
            recruitCategoryIds: [(formData as ProjectCreationData).recruitCategoryIds],
          }
          // 멘토링 데이터
          : {
            name: (formData as MentoringCreationData).name,
            startDate: (formData as MentoringCreationData).startDate,
            endDate: (formData as MentoringCreationData).endDate,
            mentoringCnt: Number((formData as MentoringCreationData).mentoringCnt),
            content: (formData as MentoringCreationData).content,
            link: (formData as MentoringCreationData).link,
            role: (formData as MentoringCreationData).role,
            categories: Array.isArray((formData as MentoringCreationData).categories)
                ? (formData as MentoringCreationData).categories.map(Number)
                : [Number((formData as MentoringCreationData).categories)],
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