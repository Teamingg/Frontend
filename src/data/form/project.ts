import STACK_LIST from "@/constant/stackList";
import {RECRUITE_CATEGORY} from "@/constant/recruiteCategory";

const currentYear = new Date().getFullYear().toString();
console.log(currentYear)
export const PROJECT_STEP1: any = [
  {
    label: "팀 이름",
    name: "projectName",
    required: true,
    rules: { required: "팀 이름은 필수 항목입니다." },
  },
  /*{
    id: 2,
    label: "모집 마감일",
    name: "deadline",
    required: true,
    rules: { required: "모집 마감일은 필수 항목입니다." },
  },*/
  {
    options: 'start',
    name: "startDate",
    required: true,
    rules: { required: "프로젝트 시작일은 필수 항목입니다." },
  },
  {
    options: 'end',
    name: "endDate",
    required: true,
    rules: { required: "프로젝트 종료일은 필수 항목입니다." },
  },
];

export const PROJECT_STEP2: any = [
  {
    label: "모집인원",
    name: "memberCnt",
    required: true,
    rules: { required: "모집인원은 필수 항목입니다." },
  },
  {
    label: "연락 방법",
    name: "link",
    required: true,
    rules: { required: "연락 방법은 필수 항목입니다." },
  },
  {
    label: "모집 분야",
    name: "recruitCategoryIds",
    options: RECRUITE_CATEGORY,
    placeholder: '모집 분야를 선택해주세요.',
    required: true,
    rules: { required: "모집 분야는 필수 항목입니다." },
  },
  {
    label: "기술스택",
    name: "stackIds",
    options: STACK_LIST,
    placeholder: '사용가능한 기술스택을 선택해주세요.',
    required: true,
    rules: { required: "기술스택은 필수 항목입니다." },
  },
]