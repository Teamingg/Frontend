'use client'
import {useParams, useRouter} from "next/navigation";
import ProjectForm from "@/components/Form/ProjectForm";
import MentoringForm from "@/components/Form/MentoringForm";
import Logo from "@/components/Logo/Logo";
import React, {useEffect, useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import {useFormStore} from "@/store/formStore";
import clsx from "clsx";
import Link from "next/link";
import {client} from "@/service/api/instance/client";
import {addWeeksToDate} from "@/service/date/date";
import StepProgress from "@/components/DataDisplay/StepProgress";
import Button from "@/components/Button/Button";
export interface ProjectFormData {
  projectName: string;
  deadline: string;
  startDate: string;
  endDate: string;
  memberCnt: number;
  link: string;
  contents: string;
  stackIds: number[];
  recruitCategoryIds: number[];
}

export interface MentoringFormData {
  name: string;
  //deadline: string;
  startDate: string;
  endDate: string;
  mentoringCnt: number;
  link: string;
  content: string;
  role: "MENTOR" | "MENTEE";
  categories: number[];
}

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const formType = useMemo(() => params.form?.[1] || "project", [params]);
  const header = formType === "project" ? '프로젝트' : '멘토링';
  
  const currentStep = useFormStore(state => state.currentStep);
  const nextStep = useFormStore(state => state.nextStep);
  const prevStep = useFormStore(state => state.prevStep);
  
  const today = new Date().toISOString().split("T")[0];
  const defaultValues = useMemo(() => {
    if (formType === "project") {
      return {
        projectName: "",
        deadline: addWeeksToDate(today, 2),
        startDate: "",
        endDate: "",
        memberCnt: 0,
        link: "",
        contents: "",
        stackIds: [],
        recruitCategoryIds: [],
      } as ProjectFormData;
    }
   
    return {
      name: "",
      //deadline: addWeeksToDate(today, 2),
      startDate: "",
      endDate: "",
      mentoringCnt: 0,
      link: "",
      content: "",
      role: "MENTOR",
      categories: [],
    } as MentoringFormData;
  }, [formType, today]);
  
  const methods = useForm<ProjectFormData | MentoringFormData>({defaultValues,});
  const {handleSubmit, control, setValue, watch} = methods;
  
  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      mentoringCnt: Number(data.mentoringCnt),
      categories: data.categories.map(Number),
    }
    console.log(formattedData)
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
          <h2 className='mt-3 mb-1 text-center text-base md:text-lg lg:text-xl'>
            {currentStep === 1 && <>{header}팀의 이름과 진행 일정을 입력해 주세요.</>}
            {currentStep === 2 && <>{header}팀에서 맡을 역할과<br/>모집할 인원을 입력해 주세요.</>}
            {currentStep === 3 && <>{header}팀을 소개해주세요.<br/>어떤 목표와 활동을 계획하고 있나요?</>}
            {currentStep === 4 && <>작성한 내용 확인해 주세요.</>}
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