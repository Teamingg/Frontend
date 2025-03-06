import React from "react";
import InputField from "@/components/Input/TextInput/InputField";
import SelectCheckBox from "@/components/Input/SelectCheckBox/SelectCheckBox";
import TextareaField from "@/components/Input/TextArea/TextareaField";
import {MENTORING_STEP1, MENTORING_STEP2} from "@/data/form/mentoring";

const MentoringForm = ({
  currentStep,
  control
}) => {
  return (
    <>
      {currentStep === 1 && MENTORING_STEP1.map(field => (
        <InputField
          key={field.id}
          name={field.name}
          label={field.label}
          control={control}
          rules={field.rules}/>
      ))}
      
      {/* Todo 프로젝트 시작 종료일 셀렉트 박스로 변경 */}
      {currentStep === 2 && MENTORING_STEP2.map(field => (
        <React.Fragment key={field.name}>
          {!field.options && (
            <InputField
              name={field.name}
              label={field.label}
              control={control}
              rules={field.rules}
            />
          )}
          {field.options && (
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
        </React.Fragment>
      ))}
      
      {currentStep === 3 && (
        <TextareaField
          label="소개"
          name={"contents"}
          placeholder="멘토링 소개를 입력해 주세요."
          control={control}/>
      )}
      
      {currentStep === "submit" && (
        <>
          <h3 className="text-lg font-bold mb-2">✅ </h3>
        
        </>
      )}
    </>
  );
};

export default MentoringForm;