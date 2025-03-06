'use client';
import React from "react";
import InputField from "@/components/Input/TextInput/InputField";
import {PROJECT_STEP1, PROJECT_STEP2} from "@/data/form/project";
import SelectCheckBox from "@/components/Input/SelectCheckBox/SelectCheckBox";
import TextareaField from "@/components/Input/TextArea/TextareaField";
import Select from "@/components/Input/Select";
import {formatDate, getSelectableDays, getSelectableMonths} from "@/service/date/date";

const memberOptions = Array.from({ length: 10 }, (_, i) => i + 1);

const ProjectForm = ({
  currentStep,
  control,
  setValue,
  startMonth,
  startDay,
  endMonth,
  endDay,
  updateStartDate,
  updateEndDate,
}) => {
  
  const date = new Date().toISOString().split("T")[0];
  
  // 선택 가능한 월 / 일 동적으로 계산 (일은 start, end month 에 따라 동적으로 계산)
  const months = getSelectableMonths(90, date);
  const startDays = getSelectableDays(startMonth, 90, date);
  const endDays = getSelectableDays(endMonth, 90, date, 30);
  ;
  console.log("🔍 endMonth in UI:", endMonth);
  
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
                  control={control}
                  data={months}
                  value={field.options === "start" ? startMonth : endMonth}
                  onChange={(month) => {
                    if (field.options === "start") {
                      updateStartDate(month, startDay);
                      setValue("startDate", formatDate(new Date().getFullYear(), month, startDay));
                    } else {
                      updateEndDate(month, endDay);
                      setValue("endDate", formatDate(new Date().getFullYear(), month, endDay));
                    }
                  }}/>
                <Select
                  label='일'
                  name={field.options === 'start' ? 'startDay' : 'endDay'}
                  control={control}
                  data={field.options === "start" ? startDays : endDays}
                  value={field.options === "start" ? startDay : endDay}
                  onChange={(day) => {
                    if (field.options === "start") {
                      updateStartDate(startMonth, day);
                      setValue("startDate", formatDate(new Date().getFullYear(), startMonth, day));
                    } else {
                      updateEndDate(endMonth, day);
                      setValue("endDate", formatDate(new Date().getFullYear(), endMonth, day));
                    }
                  }}/>
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
      {/* Todo 프로젝트 시작 종료일 셀렉트 박스로 변경 */}
      {currentStep === 2 && PROJECT_STEP2.map(field => (
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
              data={memberOptions}
              control={control}
              onChange={(value) => setValue("memberCnt", value)}/>
            </div>
          )}
          {field.options && (
            <div className="w-full">
              <label htmlFor="stacks">기술스택</label>
              <SelectCheckBox
                name={field.name}
                placeholder="사용가능한 기술스택을 선택해주세요."
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
      
      {currentStep === "submit" && (
        <>
          ㅅㄷㄴㅅ
        </>
      )}
    </>
  );
};

export default ProjectForm;