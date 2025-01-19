"use client";
import React from "react";
import CreateTeamForm from "../../_components/CreateTeamForm";
import FormTitle from "../../_components/FormTitle";
import {useSubmit} from "@/hooks/form/useSubmit";
import {ProjectFormData} from "@/app/(form)/_type/createFormData";
import {ProjectFormFields, defaultValues} from "@/app/(form)/_data/createProject";

const Page = () => {
  const { submit, isLoading, error } = useSubmit<ProjectFormData>({
    endpoint: "/project/team",
    formatPayload: (formData) => ({
      projectName: formData.projectName,
      deadline: formData.deadline,
      startDate: formData.startDate,
      endDate: formData.endDate,
      memberCnt: Number(formData.memberCnt),
      contents: formData.contents,
      stackIds: formData.stacks,
      link: formData.link,
      recruitCategoryIds: [formData.recruitCategoryIds],
    }),
    onSuccess: () => {
      alert("프로젝트 팀이 성공적으로 생성되었습니다!");
    },
  });

  return (
    <>
      <FormTitle
        highlight="팀"
        title="을 생성하기에 앞서 간단한 정보를 입력해주세요."
      />
      <CreateTeamForm
        onSubmit={(data) => submit(data)}
        defaultValues={defaultValues}
        formFields={ProjectFormFields}
        division="stacks"
      />
      {error && <p className="text-red-500">{(error as Error).message}</p>}
      {isLoading && <p className="text-blue-500">팀 생성 중...</p>}
    </>
  );
};

export default Page;
