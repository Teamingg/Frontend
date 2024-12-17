'use client';
import React from 'react';
import SelectCheckBox from "@/shared/components/Form/SelectCheckBox";
import {Control, FieldValues, useForm} from "react-hook-form";
import InputField from "@/shared/components/Form/InputField";
import {STACK_LIST} from "@/shared/Model/SelectBoxList";
import TextareaField from "@/features/form/components/TextareaField";
import {ProjectFormData} from "@/app/(form)/create/project/page";

const CreateTeamForm = ({onSubmit, defaultValues, formFields, division}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<ProjectFormData>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formFields.map((field, index) => {
        if ("row" in field) {
          return (
            <div className="w-full flex gap-5" key={index}>
              {field.row.map((rowField, index) => {
                if (rowField.options && division === "select") {
                  return (
                    <div key={index} className="w-full">
                      <label htmlFor={rowField.name} className="block mb-2">{rowField.label}</label>
                      <select
                        {...register(rowField.name)}
                        id={rowField.name}
                        className="w-full p-2 border block"
                      >
                        {rowField.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                } else if (rowField.options && division === "stacks") {
                  return (
                    <div key={index} className="w-full flex gap-5">
                      <div className="w-full">
                        <label htmlFor="stacks">기술스택</label>
                        <SelectCheckBox
                          name="stacks"
                          placeholder="사용가능한 기술스택을 선택해주세요."
                          checkBoxList={STACK_LIST}
                          control={control as unknown as Control<FieldValues>}
                          maximum={8}
                        />
                      </div>
                    </div>
                  )
                }

                return (
                  <div key={index} className="w-full mb-4">
                    <InputField
                      key={index}
                      label={rowField.label}
                      name={rowField.name}
                      control={control as unknown as Control<FieldValues>}
                      rules={rowField.rules}
                    />
                  </div>
                );
              })}
            </div>
          )
        }

        if (field.options && division === "select") {
          return (
            <div key={index} className="w-full">
              <label htmlFor={field.name} className="block mb-2">{field.label}</label>
              <select
                {...register(field.name)}
                id={field.name}
                className="w-full p-2 border block"
              >
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          );
        } else if (field.options && division === "stacks") {
          return (
            <div key={index} className="w-full flex gap-5">
              <div className="w-full">
                <label htmlFor="stacks">기술스택</label>
                <SelectCheckBox
                  name="stacks"
                  placeholder="사용가능한 기술스택을 선택해주세요."
                  checkBoxList={STACK_LIST}
                  control={control as unknown as Control<FieldValues>}
                  maximum={8}
                />
              </div>
            </div>
          )
        }

        return (
          <div key={index} className="w-full mb-4">
            <InputField
              key={index}
              label={field.label}
              name={field.name}
              control={control as unknown as Control<FieldValues>}
              rules={field.rules}
            />
          </div>
        )
      })}

      <TextareaField
        label="소개"
        name="contents"
        placeholder="프로젝트 소개를 입력해 주세요."
        register={register}
        error={errors.contents?.message}/>

      {/* 버튼 */}
      <div className="mt-16 text-center">
        <button className="w-[320px] h-[50px] mx-5 rounded-l border-2">닫기</button>
        <button className="w-[320px] h-[50px] mx-5 bg-blue-500 text-white rounded-[5px]">팀 생성하기</button>
      </div>
    </form>
  );
};

export default CreateTeamForm;