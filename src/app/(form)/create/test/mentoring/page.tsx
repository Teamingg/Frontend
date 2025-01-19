"use client";
import React from "react";
import {useSubmit} from "@/hooks/form/useSubmit";
import FormTitle from "../../_components/FormTitle";
import CreateTeamForm from "../../_components/CreateTeamForm";
import {MentoringFormFields, defaultValues} from "@/app/(form)/_data/createMentoring";
import {MentoringFormData} from "@/app/(form)/_type/createFormData";

const Page = () => {
  const { submit, isLoading, error } = useSubmit<MentoringFormData>({
    endpoint: "/mentoring/teams",
    formatPayload: (formData: MentoringFormData) => ({
      name: formData.name,
      startDate: formData.startDate,
      endDate: formData.endDate,
      mentoringCnt: Number(formData.mentoringCnt), // 문자열에서 숫자로 변환
      content: formData.content,
      link: formData.link,
      role: formData.role,
      categories: Array.isArray(formData.categories)
          ? formData.categories.map(Number) // ✅ 모든 값을 숫자로 변환
          : [Number(formData.categories)], // ✅ 단일 값을 숫자로 변환
    }),
    onSuccess: () => {
      alert("멘토링 팀이 성공적으로 생성되었습니다!");
    },
  })

  return (
    <>
      <FormTitle
        highlight="팀"
        title="을 생성하기에 앞서 간단한 정보를 입력해주세요."
      />
      <CreateTeamForm
        onSubmit={(data) => submit(data)}
        defaultValues={defaultValues}
        formFields={MentoringFormFields}
        division={"select"}
      />
      {error && <p className="text-red-500">{(error as Error).message}</p>}
      {isLoading && <p className="text-blue-500">팀 생성 중...</p>}
    </>
  );
};

export default Page;
