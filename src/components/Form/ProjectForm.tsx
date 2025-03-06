import InputField from "@/components/Input/TextInput/InputField";
import {PROJECT_STEP1, PROJECT_STEP2} from "@/data/form/project";
import SelectCheckBox from "@/components/Input/SelectCheckBox/SelectCheckBox";
import TextareaField from "@/components/Input/TextArea/TextareaField";
import React from "react";

const ProjectForm = ({
  currentStep,
  control
}) => {
  return (
    <>
      {currentStep === 1 && PROJECT_STEP1.map(field => (
        <InputField
          key={field.id}
          name={field.name}
          label={field.label}
          control={control}
          rules={field.rules}/>
      ))}
      
      {/* Todo 프로젝트 시작 종료일 셀렉트 박스로 변경 */}
      {currentStep === 2 && PROJECT_STEP2.map(field => (
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