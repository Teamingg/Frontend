import React, {useEffect, useState} from "react";
import InputField from "@/components/Input/TextInput/InputField";
import SelectCheckBox from "@/components/Input/SelectCheckBox/SelectCheckBox";
import TextareaField from "@/components/Input/TextArea/TextareaField";
import {MENTORING_STEP1, MENTORING_STEP2} from "@/data/form/mentoring";
import {useDateStore} from "@/store/useDateStore";
import {formatDate, getSelectableDays, getSelectableMonths} from "@/service/date/date";
import Select from "@/components/Input/Select";
import {useWatch} from "react-hook-form";
import Button from "@/components/Button/Button";
import Link from "next/link";

const memberOptions = Array.from({ length: 10 }, (_, i) => String(i + 1));

const labelMap: Record<string, string> = {
  name: "멘토링 이름",
  deadline: "마감일",
  startDate: "시작 날짜",
  endDate: "종료 날짜",
  memberCnt: "모집 인원",
  link: "관련 링크",
  contents: "내용",
  stackIds: "사용 기술 스택",
  recruitCategoryIds: "모집 카테고리",
};

const MentoringForm = ({
  currentStep,
  control,
  watch,
  setValue,
  nextStep,
  prevStep
}) => {
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const formValue = useWatch({ control });
  const { startMonth, startDay, endMonth, endDay, updateStartDate, updateEndDate } = useDateStore();
  
  const months = getSelectableMonths() || [];
  const startDays = getSelectableDays(startMonth, 0) || [];
  const endDays = getSelectableDays(endMonth, 30, undefined, 30) || [];
  
  // 버튼 활성화 설정
  useEffect(() => {
    const mentoringName = formValue.name;
    const startDate = formValue.startDate;
    const endDate = formValue.endDate;
    const mentoringCnt = formValue.mentoringCnt;
    const content = formValue.content;
    
    if (currentStep === 1) {
      setIsNextDisabled(!mentoringName || !startDate || !endDate);
    } else if (currentStep === 2) {
      setIsNextDisabled(mentoringCnt <= 0);
    } else if (currentStep === 3) {
      setIsNextDisabled(!content);
    } else {
      setIsNextDisabled(false);
    }
  }, [watch, currentStep, formValue.name, formValue.startDate, formValue.endDate, formValue.mentoringCnt, formValue.content]);
  
  // React Hook Form과 Zustand 동기화
  useEffect(() => {
    setValue("startDate", formatDate(new Date().getFullYear(), startMonth, startDay));
    setValue("endDate", formatDate(new Date().getFullYear(), endMonth, endDay));
  }, [startMonth, startDay, endMonth, endDay, setValue]);
  
  return (
    <>
      {currentStep === 1 && MENTORING_STEP1.map(field => (
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
                멘토링 {field.options === 'start' ? '시작일' : '종료일'}
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
      {currentStep === 2 && MENTORING_STEP2.map(field => (
        <React.Fragment key={field.name}>
          {(field.name === 'role' || field.name === 'mentoringCnt') && (
            <div className='flex'>
              {field.name === "role" && (
                <div key={field.name} className="w-full">
                  <label htmlFor="stacks">{field.label}</label>
                  <SelectCheckBox
                    name={field.name}
                    placeholder="사용가능한 기술스택을 선택해주세요."
                    checkBoxList={field.options}
                    control={control}
                    maximum={8}
                  />
                </div>
              )}
              
              {field.name === "mentoringCnt" && (
                <div className="py-2 flex flex-col w-full">
                  <p className="mb-2">모집 인원</p>
                  <Select
                    label="명"
                    name="memberCnt"
                    options={memberOptions}
                    value={String(watch("memberCnt"))}
                    onChange={(value) => setValue("memberCnt", Number(value))}
                  />
                </div>
              )}
            </div>
          )}
          {!field.options && field.name !== 'memberCnt' && (
            <InputField
              name={field.name}
              label={field.label}
              control={control}
              rules={field.rules}
            />
          )}
          {field.name === 'categories' && (
            <div key={field.name} className="w-full">
              <label htmlFor="stacks">{field.label}</label>
              <SelectCheckBox
                name={field.name}
                placeholder="포지션을 선택해 주세요."
                checkBoxList={field.options}
                control={control}
                maximum={8}
                //onChange={(selected) => setValue("categories", selected.map(Number))}
              />
            </div>
          )}
        </React.Fragment>
      ))}
      {currentStep === 3 && (
        <TextareaField
          label="소개"
          name="content"
          placeholder="멘토링 소개를 입력해 주세요."
          control={control}/>
      )}
      {currentStep === 4 &&  (
        <div className="border border-gray-300 rounded-lg p-4">
          <ul className="space-y-2">
            {Object.entries(watch()).map(([key, value]) => (
              <li key={key} className="flex justify-between border-b py-1">
                <span className="font-medium">{labelMap[key] || key}</span>
                {/* ✅ labelMap을 사용하여 키를 변환. 만약 매핑이 없으면 원래 키 출력 */}
                <span>{Array.isArray(value) ? value.join(', ') || '없음' : String(value)}</span>
              </li>
            ))}
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

export default MentoringForm;