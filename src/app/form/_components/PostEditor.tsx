"use client";
import React from 'react';
import {useParams, useSearchParams} from "next/navigation";
import {ProjectFormFields} from "@/app/form/_data/createProject";
import {MentoringFormFields} from "@/app/form/_data/createMentoring";
import {SubmitHandler, useForm} from "react-hook-form";
import {MentoringPost, ProjectPost} from "@/types/form";
import {useSubmit} from "@/hooks/form/useSubmit";
import FormTitle from "@/app/form/_components/FormTitle";
import PostForm from "@/app/form/_components/PostForm";

interface Props {
  isEditMode: boolean;
}

const PostEditor: React.FC<Props> = ({isEditMode}) => {
  const {page_type, team_id} = useParams();
  const isProject = page_type === "project";
  const formFields = isProject ? ProjectFormFields : MentoringFormFields;

  // 게시글 수정 페이지일 경우 쿼리스트링을 활용하여 기존 데이터 불러오기
  const searchParams = useSearchParams();
  const pageParams = searchParams.get("page");
  const infoData = searchParams ? JSON.parse(decodeURIComponent(pageParams as string)) : null;

  // API 엔드포인트 설정
  const projectEndpoint = `/project/post/${team_id}/post_id/edit`;
  const mentoringEndpoint = `/mentoring/posts/${team_id}`;
  const endPoints = isProject ? projectEndpoint : mentoringEndpoint;

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
    onSuccess: () => alert(isEditMode ? "게시글이 수정되었습니다." : "게시글이 작성되었습니다."),
  });

  // useForm 설정
  const {control, register} = useForm<ProjectPost | MentoringPost>();
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
            infoData={infoData}
        />
        {error && <p className="text-red-500">{(error as Error).message}</p>}
        {isLoading && <p className="text-blue-500">{isEditMode ? "게시글 수정 중..." : "게시글 작성 중..."}</p>}
      </>
  );
};

export default PostEditor;