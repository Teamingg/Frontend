'use client'
import {useParams, useRouter} from "next/navigation";
import ProjectForm from "@/components/Form/ProjectForm";
import MentoringForm from "@/components/Form/MentoringForm";
import Logo from "@/components/Logo/Logo";
import React, {useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import {useFormStore} from "@/store/formStore";
import clsx from "clsx";
import Link from "next/link";
import {client} from "@/service/api/instance/client";
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
  mentoringName: string;
  deadline: string;
  startDate: string;
  endDate: string;
  mentoringCnt: number;
  link: string;
  contents: string;
  role: "MENTOR" | "MENTEE";
  categories: number[];
}

const steps = [
  {step: "step 1", label: "팀 정보"},
  {step: "step 2", label: "모집 정보"},
  {step: "step 3", label: "팀 소개"},
];

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const formType = useMemo(() => params.form?.[1] || "project", [params]);
  const currentStep = useFormStore(state => state.currentStep);
  const nextStep = useFormStore(state => state.nextStep);
  const prevStep = useFormStore(state => state.prevStep);
  const defaultValues = useMemo(() => {
    if (formType === "project") {
      return {
        projectName: "",
        deadline: "",
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
      mentoringName: "",
      deadline: "",
      startDate: "",
      endDate: "",
      mentoringCnt: 0,
      link: "",
      contents: "",
      role: "MENTOR",
      categories: [],
    } as MentoringFormData;
  }, [formType]);
  
  const methods = useForm<ProjectFormData | MentoringFormData>({
    defaultValues,
  });
  
  const header = formType === "project" ? '프로젝트' : '멘토링';
  const {handleSubmit, control} = methods;
  
  const onSubmit = async (data) => {
    console.log("최종 데이터:", data);
    console.log(`${params.form?.[1]}/teams`)
    try {
      const response = await client.post(`/${params.form?.[1]}/teams`, data);
      console.log("서버 응답:", response.data);
      if (response.status === 200) router.push('/');
    } catch (error) {
      console.error("폼 제출 중 오류 발생:", error.response);
    }
  };
  
  const prevClass = clsx('w-full h-[50px] rounded-xl border-1 border-gray-200 hover:bg-gray-300 cursor-pointer');
  const nextClass = clsx('w-full h-[50px] bg-blue-500 text-white rounded-xl hover:bg-blue-400 cursor-pointer');
  
  return (
    <div className='h-full min-h-full flex items-center justify-center'>
      <section
        className='w-1/2 lg:w-2/3 lg:max-w-xl mx-auto min-h-1/2 p-8 border border-gray-900 rounded-lg '>
        <header className='my-10 mx-auto flex flex-col items-center justify-center gap-2'>
          <Logo/>
          <h2 className='mt-3 mb-1 text-center text-base md:text-lg lg:text-xl'>
            {currentStep === 1 && <>{header}팀의 이름과 진행 일정을 입력해 주세요.</>}
            {currentStep === 2 && <>{header}팀에서 맡을 역할과<br/>모집할 인원을 입력해 주세요.</>}
            {currentStep === 3 && <>{header}팀을 소개해주세요.<br/>어떤 목표와 활동을 계획하고 있나요?</>}
            {currentStep === 4 && <>작성한 내용 확인해 주세요.</>}
          </h2>
          <ul className='w-full max-w-sm mx-auto flex items-center justify-between'>
            {steps.map((step, index) => (
              <li key={index} className='w-16 mx-auto text-center'>
                <p className='text-sm'>{step.step}</p>
                <p>{step.label}</p>
              </li>
            ))}
          </ul>
        </header>
        <form className='w-full max-w-sm mx-auto' onSubmit={handleSubmit(onSubmit)}>
          {formType === 'project'
            ? <ProjectForm currentStep={currentStep} control={control}/>
            : <MentoringForm currentStep={currentStep} control={control}/>}
          <div className="my-12 text-center flex flex-col-reverse gap-2 md:flex-row">
            {currentStep !== 1
              ? (<button className={prevClass} onClick={prevStep}>이전</button>)
              : (<Link href='/' className={`${prevClass} flex items-center justify-center`}>돌아가기</Link>)}
            
            {currentStep < 4 && (
              <button className={nextClass} onClick={nextStep}>다음</button>
            )}
            
            {currentStep === 4 && (
              <button type="submit" className={nextClass}>제출하기</button>
            )}
          </div>
        </form>
      </section>
    </div>
  );
};

export default Page;