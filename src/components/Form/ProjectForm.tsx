'use client';
import React, {useEffect, useMemo, useState} from "react";
import InputField from "@/components/Input/TextInput/InputField";
import {PROJECT_STEP1, PROJECT_STEP2} from "@/data/form/project";
import SelectCheckBox from "@/components/Input/SelectCheckBox/SelectCheckBox";
import TextareaField from "@/components/Input/TextArea/TextareaField";
import Select from "@/components/Input/Select";
import {formatDate, getSelectableDays, getSelectableMonths} from "@/service/date/date";
import { useDateStore } from "@/store/useDateStore";
import Button from "@/components/Button/Button";
import Link from "next/link";
import {useWatch} from "react-hook-form";
import {mapIdsToLabels} from "@/utils/mapIdsToLabels";
import {RECRUITE_CATEGORY} from "@/constant/recruiteCategory";
import STACK_LIST from "@/constant/stackList";

const memberOptions = Array.from({ length: 10 }, (_, i) => String(i + 1));

const labelMap: Record<string, string> = {
  projectName: "프로젝트 이름",
  deadline: "마감일",
  startDate: "시작 날짜",
  endDate: "종료 날짜",
  memberCnt: "모집 인원",
  link: "관련 링크",
  contents: "내용",
  stackIds: "사용 기술 스택",
  recruitCategoryIds: "모집 카테고리",
};

const ProjectForm = ({
  currentStep,
  control,
  watch,
  setValue,
  prevStep,
  nextStep,
}) => {
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const formValue = useWatch({ control });
  const { startMonth, startDay, endMonth, endDay, updateStartDate, updateEndDate } = useDateStore();
  
  const months = getSelectableMonths() || [];
  const startDays = getSelectableDays(startMonth, 0) || [];
  const endDays = getSelectableDays(endMonth, 30, undefined, 30) || [];
  
  // 버튼 활성화 설정
  useEffect(() => {
    const projectName = formValue.projectName;
    const startDate = formValue.startDate;
    const endDate = formValue.endDate;
    const memberCnt = formValue.memberCnt;
    const recruitCategoryIds = formValue.recruitCategoryIds;
    const contents = formValue.contents;
    
    if (currentStep === 1) {
      setIsNextDisabled(!projectName || !startDate || !endDate);
    } else if (currentStep === 2) {
      setIsNextDisabled(memberCnt <= 0 || !recruitCategoryIds || recruitCategoryIds.length === 0);
    } else if (currentStep === 3) {
      setIsNextDisabled(!contents);
    } else {
      setIsNextDisabled(false);
    }
  }, [watch, currentStep, formValue.projectName, formValue.startDate, formValue.endDate, formValue.memberCnt, formValue.recruitCategoryIds, formValue.contents]);
  
  // React Hook Form과 Zustand 동기화
  useEffect(() => {
    setValue("startDate", formatDate(new Date().getFullYear(), startMonth, startDay));
    setValue("endDate", formatDate(new Date().getFullYear(), endMonth, endDay));
  }, [startMonth, startDay, endMonth, endDay, setValue]);
  
  return (
    <>
      {currentStep === 1 && PROJECT_STEP1.map(field => (
        <React.Fragment key={field.name}>
          {!field.options && (
            <InputField
              name={field.name}
              label={field.label}
              control={control}
              rules={field.rules}/>
          )}
          {field.options && (
            <div className="py-2 flex flex-col w-full">
              <p className='mb-2'>
                프로젝트 {field.options === 'start' ? '시작일' : '종료일'}
              </p>
              <div className='w-full flex items-center gap-5'>
                <Select
                  label='월'
                  name={field.options === 'start' ? 'startMonth' : 'endMonth'}
                  options={months}
                  value={field.options === "start" ? startMonth : endMonth}
                  onChange={(month) => {
                    if (field.options === "start") {
                      updateStartDate(month, startDay);
                    } else {
                      updateEndDate(month, endDay);
                    }
                  }}/>
                <Select
                  label="일"
                  name={field.options === "start" ? "startDay" : "endDay"}
                  options={field.options === "start" ? startDays : endDays}
                  value={field.options === "start" ? startDay : endDay}
                  onChange={(day) => {
                    if (field.options === "start") {
                      updateStartDate(startMonth, day);
                    } else {
                      updateEndDate(endMonth, day);
                    }
                  }}/>
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
      {currentStep === 2 && PROJECT_STEP2.map((field, index) => (
        <React.Fragment key={field.name}>
          {!field.options && field.name !== 'memberCnt' && (
            <InputField
              name={field.name}
              label={field.label}
              control={control}
              rules={field.rules}
            />
          )}
          {field.name === 'memberCnt' && (
            <div className="py-2 flex flex-col w-full">
              <p className='mb-2'>모집 인원</p>
            <Select
              label="명"
              name='memberCnt'
              options={memberOptions}
              value={watch("memberCnt")}
              onChange={(value) => setValue("memberCnt", value)}/>
            </div>
          )}
          {field.options && (
            <div className={`w-full ${index === PROJECT_STEP2.length - 1 ? "py-2" : ""}`}>
              <label htmlFor="stacks">{field.label}</label>
              <SelectCheckBox
                title={field.label}
                name={field.name}
                placeholder={field.placeholder}
                checkBoxList={field.options}
                control={control}
                maximum={8}
              />
            </div>
          )}
        </React.Fragment>
      ))}
      {currentStep === 3 && (
        <TextareaField
          label="소개"
          name={"contents"}
          placeholder="프로젝트 소개를 입력해 주세요."
          control={control}/>
      )}
      {currentStep === 4 && (
          <div className="border border-gray-300 rounded-lg p-4">
            <ul className="space-y-2">
              {Object.entries(watch()).map(([key, value]) => {
                let displayValue: string | string[] = Array.isArray(value) ? value.join(', ') : String(value);

                if (key === "recruitCategoryIds") {
                  displayValue = mapIdsToLabels(value, RECRUITE_CATEGORY).join(', ') || '없음';
                }

                if (key === "stackIds") {
                  displayValue = mapIdsToLabels(value, STACK_LIST).join(', ') || '없음';
                }

                return (
                    <li key={key} className="flex justify-between border-b py-1">
                      <span className="font-medium">{labelMap[key] || key}</span>
                      <span>{displayValue}</span>
                    </li>
                );
              })}
            </ul>
          </div>
      )}
      
      {/* 버튼 그룹 */}
      <div className="my-12 text-center flex flex-col-reverse gap-2 md:flex-row">
        {currentStep !== 1
          ? (<Button color='secondary' className='w-full' onClick={prevStep}>이전</Button>)
          : (<Link href='/' className={`w-full h-[50px] rounded-xl border-1 border-gray-200 hover:bg-gray-300 cursor-pointer flex items-center justify-center`}>돌아가기</Link>)}
        
        {currentStep < 4 && (
          <Button color='primary' className='w-full' onClick={nextStep} disabled={isNextDisabled}>다음</Button>
        )}
        
        {currentStep === 4 && (
          <Button type="submit" className='w-full'>팀 생성하기</Button>
        )}
      </div>
    </>
  );
};

export default ProjectForm;