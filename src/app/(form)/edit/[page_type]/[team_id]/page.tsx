"use client";
import React from 'react';
import {useParams, useSearchParams} from "next/navigation";
import {ProjectFormFields} from "@/app/(form)/_data/createProject";
import {MentoringFormFields} from "@/app/(form)/_data/createMentoring";
import FormTitle from "@/app/(form)/_components/FormTitle";
import PostForm from "@/app/(form)/_components/PostForm";
import {useSubmit} from "@/hooks/form/useSubmit";
import {MentoringPost, ProjectPost} from "@/app/(form)/_type/formDataTypes";
import {SubmitHandler, useForm} from "react-hook-form";

const Page = () => {
  const {page_type, team_id} = useParams();
  const isProject = page_type === "project";
  const formFields = isProject ? ProjectFormFields : MentoringFormFields;

  // url 데이터 받아오기
  const queryString = useSearchParams();
  const pageParams = queryString.get("page");
  const infoData = queryString ? JSON.parse(decodeURIComponent(pageParams as string)) : null;
  console.log(infoData);

  // 프로젝트 : /project/post/{team_id}/{post_id}/edit
  // 멘토링 : /mentoring/teams/{team_id}
  const projectEndpoint = `/project/post/${team_id}/post_id/edit`;
  const mentoringEndpoint = `/mentoring/posts/${team_id}`;
  const endPoints = isProject ? projectEndpoint : mentoringEndpoint;

  // useForm 제네릭 타입 지정
  const { control, register, handleSubmit, formState: { errors } } = useForm<ProjectPost | MentoringPost>();

  // 데이터 통신
  const {submit, isLoading, error} = useSubmit<MentoringPost | ProjectPost>({
    endpoint: endPoints,
    formatPayload: (formData: ProjectPost | MentoringPost) => {
      return isProject
          ? {
            projectName: (formData as ProjectPost).projectName,
            deadline: (formData as ProjectPost).deadline,
            memberCnt: (formData as ProjectPost).memberCnt,
            link: (formData as ProjectPost).link,
            contents: (formData as ProjectPost).contents,
          }
          : {
            name: (formData as MentoringPost).name,
            deadline: (formData as MentoringPost).deadline,
            mentoringCnt: (formData as MentoringPost).mentoringCnt,
            link: (formData as MentoringPost).link,
            contents: (formData as MentoringPost).contents,
          }
    },
    onSuccess: () => alert("게시글이 수정되었습니다.")
  });

  const onSubmit: SubmitHandler<ProjectPost | MentoringPost> = (data) => {
    submit(data);
  };

  return (
      <>
        <FormTitle
            highlight={isProject ? "프로젝트" : "멘토링"}
            title="게시글 작성에 필요한 정보를 입력해주세요."
        />
        <PostForm
            onSubmit={(data) => onSubmit(data)}
            formFields={formFields}
            control={control}
            register={register}
        />
        {error && <p className="text-red-500">{(error as Error).message}</p>}
        {isLoading && <p className="text-blue-500">게시글 수정 중...</p>}
      </>
  );
};

export default Page;