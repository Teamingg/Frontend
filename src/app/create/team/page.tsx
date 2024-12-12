"use client";
import {Control, Controller, FieldValues, useForm} from "react-hook-form";
import {instance} from "@/shared/api/axiosInstance";
import {STACK_LIST} from "@/shared/Model/SelectBoxList";
import SelectCheckBox from "@/shared/components/Form/SelectCheckBox";

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
  category: number[];
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
      category: [],
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
      category: formData.category,
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>팀을 생성하기에 앞서 간단한 정보를 입력해주세요.</h2>
        <div>
          <input
            {...register('name', {required: '팀 이름은 필수 항목입니다.'})}
            type="text"
            id="name"
            placeholder="팀 이름을 입력해주세요."
            value="test"/>
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="deadline">모집 마감일</label>
          <input
            {...register('deadline', {required: '모집 마감일을 입력해주세요.'})}
            id="deadline"
            placeholder="마감 일자를 입력해 주세요."
            value="2024-12-28"/>
          {errors.deadline && <p>{errors.deadline.message}</p>}
        </div>
        <div>
          <div>
            <label htmlFor="startDate">멘토링 시작일</label>
            <input
              {...register('startDate', {required: '시작일을 입력해주세요.'})}
              type="text"
              id="startDate"
              placeholder="프로젝트 시작일을 선택해 주세요."
              value="2024-12-28"/>
            {errors.startDate && <p>{errors.startDate.message}</p>}
          </div>
          <div>
            <label htmlFor="endDate">멘토링 종료일</label>
            <input
              {...register('endDate', {required: '종료일을 입력해주세요.'})}
              type="text"
              id="endDate"
              placeholder="프로젝트 종료일을 선택해 주세요."
              value="2025-12-25"/>
            {errors.endDate && <p>{errors.endDate.message}</p>}
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="role">내역할</label>
            <select name="role" id="role">
              <option value="MENTOR">멘토</option>
              <option value="MENTEE">멘티</option>
            </select>
          </div>
          <div>
            <label htmlFor="mentoringCnt">모집인원</label>
            <input
              {...register('mentoringCnt', {required: '모집인원을 입력해주세요.'})}
              type="number"
              id="mentoringCnt"
              placeholder="모집인원을 입력해 주세요."/>
            {errors.mentoringCnt && <p>{errors.mentoringCnt.message}</p>}
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="categories">모집 카테고리</label>
            <input type="text" id="categories" name="categories"/>
          </div>
          <div>
            <label htmlFor="link">연락 방법</label>
            <input type="text" id="link" name="link"/>
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="content">소개</label>
            <textarea
              {...register('content', {required: '프로젝트 소개를 입력해주세요.'})}
              id="content"
              placeholder="프로젝트 소개를 입력해 주세요."/>
            {errors.content && <p>{errors.content.message}</p>}
          </div>
        </div>
        <div>
          <button>닫기</button>
          <button>게시글 작성하기</button>
        </div>
      </form>
    </div>
  );
};

export default Page;