import {ProjectForm, ProjectFormData} from "@/app/form/[form_type]/_type/formDataTypes";
import STACK_LIST from "@/constant/stackList";

export const ProjectFormFields: ProjectForm[] = [
  {
    label: "팀 이름",
    name: "projectName" as keyof ProjectFormData,
    required: true,
    rules: { required: "팀 이름은 필수 항목입니다." },
  },
  {
    label: "모집 마감일",
    name: "deadline" as keyof ProjectFormData,
    required: true,
    rules: { required: "모집 마감일은 필수 항목입니다." },
  },
  {
    row: [
      {
        label: "프로젝트 시작일",
        name: "startDate" as keyof ProjectFormData,
        required: true,
        rules: { required: "프로젝트 시작일은 필수 항목입니다." },
      },
      {
        label: "프로젝트 종료일",
        name: "endDate" as keyof ProjectFormData,
        required: true,
        rules: { required: "프로젝트 종료일은 필수 항목입니다." },
      },
    ],
  },
  {
    row: [
      {
        label: "기술스택",
        name: "stacks" as keyof ProjectFormData,
        options: STACK_LIST,
        required: true,
        rules: { required: "기술스택은 필수 항목입니다." },
      },
      {
        label: "모집인원",
        name: "memberCnt" as keyof ProjectFormData,
        required: true,
        rules: { required: "모집인원은 필수 항목입니다." },
      },
    ],
  },
  {
    row: [
      {
        label: "연락 방법",
        name: "link" as keyof ProjectFormData,
        required: true,
        rules: { required: "연락 방법은 필수 항목입니다." },
      },
      {
        label: "모집 구분",
        name: "recruitCategoryIds" as keyof ProjectFormData,
        required: true,
        rules: { required: "모집 구분은 필수 항목입니다." },
      },
    ],
  },
];

export const defaultValues = {
  projectName: "",
  deadline: "",
  startDate: "",
  endDate: "",
  memberCnt: "",
  contents: "",
  link: "",
  stacks: [],
  recruitCategoryIds: [],
};