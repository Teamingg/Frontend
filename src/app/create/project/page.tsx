"use client";
import {Control, Controller, FieldValues, useForm} from "react-hook-form";
import {instance} from "@/shared/api/axiosInstance";
import {STACK_LIST} from "@/shared/Model/SelectBoxList";
import SelectCheckBox from "@/shared/components/Form/SelectCheckBox";

interface TeamFormData {
  projectName: string;
  deadline: string;
  startDate: string;
  endDate: string;
  memberCnt: string;
  contents: string;
  stacks: number[];
  recruitCategoryIds: number[];
}

const Page = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<TeamFormData>({
    defaultValues: {
      projectName: "",
      deadline: "",
      startDate: "",
      endDate: "",
      memberCnt: "",
      contents: "",
      stacks: [],
      recruitCategoryIds: [],
    }});

  const onSubmit = async (formData: TeamFormData) => {
    const payload = {
      projectName: formData.projectName,
      deadline: formData.deadline,
      startDate: formData.startDate,
      endDate: formData.endDate,
      memberCnt: Number(formData.memberCnt), // 문자열에서 숫자로 변환
      contents: formData.contents,
      stackIds: formData.stacks,
      recruitCategoryIds: formData.recruitCategoryIds,
    };

    try {
      const response = await instance.post("/project/team", payload);
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
            {...register('projectName', {required: '팀 이름은 필수 항목입니다.'})}
            type="text"
            id="name"
            placeholder="팀 이름을 입력해주세요."
            value="test"/>
          {errors.projectName && <p>{errors.projectName.message}</p>}
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
            <label htmlFor="startDate">프로젝트 시작일</label>
            <input
              {...register('startDate', {required: '시작일을 입력해주세요.'})}
              type="text"
              id="startDate"
              placeholder="프로젝트 시작일을 선택해 주세요."
              value="2024-12-28"/>
            {errors.startDate && <p>{errors.startDate.message}</p>}
          </div>
          <div>
            <label htmlFor="endDate">프로젝트 종료일</label>
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
            <label htmlFor="stacks">기술스택</label>
            <SelectCheckBox
              name="stacks"
              placeholder="사용가능한 기술스택을 선택해주세요."
              checkBoxList={STACK_LIST}
              control={control as unknown as Control<FieldValues>}
              maximum={8}
            />
          </div>
          <div>
            <label htmlFor="memberCnt">모집인원</label>
            <input
              {...register('memberCnt', {required: '모집인원을 입력해주세요.'})}
              type="number"
              id="memberCnt"
              placeholder="모집인원을 입력해 주세요."/>
            {errors.memberCnt && <p>{errors.memberCnt.message}</p>}
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="recruitCategoryIds">모집 구분</label>
            <input type="text" id="recruitCategoryIds" name="recruitCategoryIds"/>
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
              {...register('contents', {required: '프로젝트 소개를 입력해주세요.'})}
              id="contents"
              placeholder="프로젝트 소개를 입력해 주세요."/>
            {errors.contents && <p>{errors.contents.message}</p>}
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