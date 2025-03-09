import {RECRUITE_CATEGORY} from "@/constant/recruiteCategory";

export const MENTORING_STEP1: any = [
  {
    label: "팀 이름",
    name: "name",
    required: true,
    rules: { required: "팀 이름은 필수 항목입니다." },
  },
  /*{
    label: "모집 마감일",
    name: "deadline",
    required: true,
    rules: { required: "모집 마감일은 필수 항목입니다." },
  },*/
  {
    label: "멘토링 시작일",
    options: 'start',
    name: "startDate",
    required: true,
    rules: { required: "멘토링 시작일은 필수 항목입니다." },
  },
  {
    label: "멘토링 종료일",
    options: 'end',
    name: "endDate",
    required: true,
    rules: { required: "멘토링 종료일은 필수 항목입니다." },
  },
];

export const MENTORING_STEP2: any = [
  {
    label: "내 역할",
    name: "role",
    options: [
      { value: "MENTOR", label: "멘토" },
      { value: "MENTEE", label: "멘티" },
    ],
    required: true,
  },
  {
    label: "모집인원",
    name: "mentoringCnt",
    options: 'select',
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
    name: "categories",
    options: RECRUITE_CATEGORY,
    required: true,
    rules: { required: "모집 분야는 필수 항목입니다." },
  },
]