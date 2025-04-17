'use client'
import {useParams, useRouter} from "next/navigation";
import ProjectForm from "@/components/Form/ProjectForm";
import MentoringForm from "@/components/Form/MentoringForm";
import Logo from "@/components/Logo/Logo";
import React, {useEffect, useMemo} from "react";
import {useForm} from "react-hook-form";
import {useFormStore} from "@/store/formStore";
import {client} from "@/service/api/instance/client";
import {addWeeksToDate} from "@/service/date/date";
import StepProgress from "@/components/DataDisplay/StepProgress";
import { log } from "console";

const getDefaultValues = (formType: string): ProjectTeamData | MentoringTeamData => {
  const today = new Date().toISOString().split("T")[0];
  
  return formType === "project"
    ? {
      projectName: "",
      deadline: addWeeksToDate(today, 2),
      startDate: "",
      endDate: "",
      memberCnt: 1,
      link: "",
      contents: "",
      stackIds: [],
      recruitCategoryIds: [],
    }
    : {
      name: "",
      startDate: "",
      endDate: "",
      mentoringCnt: 1,
      link: "",
      content: "",
      role: "MENTOR",
      categories: [],
    };
};

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const formType = useMemo(() => params.form?.[1] || "project", [params]);
  
  const currentStep = useFormStore(state => state.currentStep);
  const nextStep = useFormStore(state => state.nextStep);
  const prevStep = useFormStore(state => state.prevStep);
  
  const methods = useForm<ProjectTeamData | MentoringTeamData>({
    defaultValues: useMemo(() => getDefaultValues(formType), [formType]),
  });
  
  const {handleSubmit, control, setValue, watch, reset} = methods;
  
  // 페이지 진입 시 기본값으로 리셋
  useEffect(() => {
    reset(getDefaultValues(formType));
    useFormStore.getState().resetStep(); // currentStep 등 초기화
  }, [formType]);
  
  const onSubmit = async (data) => {
    const isMentoring = formType === "mentoring";
    const formattedData = {
      ...data,
      ...(isMentoring ? {
        mentoringCnt: Number(data.mentoringCnt ?? 1),
        categories: Array.isArray(data.categories) ? data.categories.map(Number) : [],
      } : {
        memberCnt: Number(data.memberCnt ?? 1),
        stackIds: Array.isArray(data.stackIds) ? data.stackIds.map(Number) : [],
        recruitCategoryIds: Array.isArray(data.recruitCategoryIds) ? data.recruitCategoryIds.map(Number) : [],
      })
    }
    console.log(formattedData)
    console.log(params.form?.[1])
    try {
      const response = await client.post(`/${params.form?.[1]}/teams`, formattedData);
      if (response.status === 200) router.push('/');
    } catch (error) {
      console.error("폼 제출 중 오류 발생:", error.response);
    }
  };
  
  return (
    <div className='h-full min-h-[calc(100vh-72px-64px)] flex items-center justify-center'>
      <section className='w-1/2 lg:w-2/3 lg:max-w-xl mx-auto min-h-1/2 p-8 border border-gray-200 rounded-xl shadow-xl '>
        <header className='mt-10 mb-5 mx-auto flex flex-col items-center justify-center gap-2'>
          <Logo/>
          <h2 className="mt-3 mb-1 text-center text-base md:text-lg lg:text-xl">
            {currentStep === 1 && `${formType === "project" ? "프로젝트" : "멘토링"}팀의 이름과 진행 일정을 입력해 주세요.`}
            {currentStep === 2 && `${formType === "project" ? "프로젝트" : "멘토링"}팀에서 맡을 역할과 모집할 인원을 입력해 주세요.`}
            {currentStep === 3 && `${formType === "project" ? "프로젝트" : "멘토링"}팀을 소개해주세요. 어떤 목표와 활동을 계획하고 있나요?`}
            {currentStep === 4 && "작성한 내용을 확인해 주세요."}
          </h2>
          <StepProgress currentStep={currentStep} />
        </header>
        <form className='w-full max-w-sm mx-auto' onSubmit={handleSubmit(onSubmit)}>
          {formType === 'project'
            ? <ProjectForm
              currentStep={currentStep}
              control={control}
              watch={watch}
              setValue={setValue}
              nextStep={nextStep}
              prevStep={prevStep}/>
            : <MentoringForm
              currentStep={currentStep}
              control={control}
              watch={watch}
              setValue={setValue}
              nextStep={nextStep}
              prevStep={prevStep}/>}
        </form>
      </section>
    </div>
  );
};

export default Page;