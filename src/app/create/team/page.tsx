"use client";
import {Control, Controller, FieldValues, useForm} from "react-hook-form";
import {instance} from "@/shared/api/axiosInstance";
import {STACK_LIST} from "@/shared/Model/SelectBoxList";
import SelectCheckBox from "@/shared/components/Form/SelectCheckBox";
import FormTitle from "@/features/create/components/FormTitle";
import InputField from "@/features/create/components/InputField";
import TextareaField from "@/features/create/components/TextareaField";

interface TeamFormData {
  name: string;
  deadline: string;
  startDate: string;
  endDate: string;
  mentoringCnt: string;
  content: string;
  status: string;
  link: string;
  role: string;
  categories: number[];
}

const Page = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<TeamFormData>({
    defaultValues: {
      name: "",
      deadline: "",
      startDate: "",
      endDate: "",
      mentoringCnt: "",
      content: "",
      link: "",
      role: "",
      categories: [],
    }});

  const onSubmit = async (formData: TeamFormData) => {
    const payload = {
      name: formData.name,
      deadline: formData.deadline,
      startDate: formData.startDate,
      endDate: formData.endDate,
      mentoringCnt: Number(formData.mentoringCnt), // 문자열에서 숫자로 변환
      content: formData.content,
      link: formData.link,
      role: formData.role,
      categories: formData.categories,
      status: "RECRUITING",
    };

    try {
      const response = await instance.post("/mentoring/team", payload);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormTitle/>

      <InputField
        label="팀 이름"
        name="name"
        placeholder="팀 이름을 입력해주세요."
        register={register}
        error={errors.name?.message}/>

      <InputField
        label="모집 마감일"
        name="deadline"
        placeholder="마감 일자를 입력해 주세요."
        register={register}
        error={errors.deadline?.message}/>

      <div className="flex gap-5">
        <InputField
          label="멘토링 시작일"
          name="startDate"
          placeholder="멘토링 시작일을 입력해 주세요."
          register={register}
          error={errors.startDate?.message}/>

        <InputField
          label="멘토링 종료일"
          name="endDate"
          placeholder="멘토링 종료일을 입력해 주세요."
          register={register}
          error={errors.endDate?.message}/>
      </div>

      <div className="flex gap-5">
        <div>
          <label htmlFor="role">내역할</label>
          <select name="role" id="role" className="block">
            <option value="MENTOR">멘토</option>
            <option value="MENTEE">멘티</option>
          </select>
        </div>

        <InputField
          label="모집인원"
          name="mentoringCnt"
          placeholder="모집인원을 입력해 주세요."
          register={register}
          error={errors.mentoringCnt?.message}/>
      </div>

      <div className="flex gap-5">
        <InputField
          label="모집 카테고리"
          name="categories"
          placeholder="멘토링 종료일을 입력해 주세요."
          register={register}
          error={errors.categories?.message}/>

        <InputField
          label="연락 방법"
          name="link"
          placeholder="멘토링 종료일을 입력해 주세요."
          register={register}
          error={errors.link?.message}/>
      </div>

      <TextareaField
        label="소개"
        name="content"
        placeholder="프로젝트 소개를 입력해 주세요."
        register={register}
        error={errors.content?.message}/>

      <div className="text-center">
        <button className="w-[300px] h-[50px] mx-5 rounded-l border-2">닫기</button>
        <button className="w-[300px] h-[50px] mx-5 bg-blue-500 text-white rounded-[5px]">게시글 작성하기</button>
      </div>
    </form>
  );
};

export default Page;