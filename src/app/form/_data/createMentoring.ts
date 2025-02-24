import {FormSchema, MentoringCreationData} from "@/app/form/_type/formDataTypes";

export const MentoringFormFields: FormSchema[] = [
  {
    label: "팀 이름",
    name: "name" as keyof MentoringCreationData,
    required: true,
    rules: { required: "팀 이름은 필수 항목입니다." },
  },
  {
    label: "모집 마감일",
    name: "deadline" as keyof MentoringCreationData,
    required: true,
    rules: { required: "모집 마감일은 필수 항목입니다." },
  },
  {
    row: [
      {
        label: "멘토링 시작일",
        name: "startDate" as keyof MentoringCreationData,
        required: true,
        rules: { required: "멘토링 시작일은 필수 항목입니다." },
      },
      {
        label: "멘토링 종료일",
        name: "endDate" as keyof MentoringCreationData,
        required: true,
        rules: { required: "멘토링 종료일은 필수 항목입니다." },
      },
    ],
  },
  {
    row: [
      {
        label: "내 역할",
        name: "role" as keyof MentoringCreationData,
        options: [
          { value: "MENTOR", label: "멘토" },
          { value: "MENTEE", label: "멘티" },
        ],
        required: true,
      },
      {
        label: "모집인원",
        name: "mentoringCnt" as keyof MentoringCreationData,
        required: true,
        rules: { required: "모집인원은 필수 항목입니다." },
      },
    ],
  },
  {
    row: [
      {
        label: "모집 카테고리",
        name: "categories" as keyof MentoringCreationData,
        required: true,
      },
      {
        label: "연락 방법",
        name: "link" as keyof MentoringCreationData,
        required: true,
        rules: { required: "연락 방법은 필수 항목입니다." },
      },
    ],
  },
  {
    label: "팀 소개",
    name: "content" as keyof MentoringCreationData,
    required: true,
    rules: { required: "팀 소개는 필수 항목입니다." },
  },
];

export const defaultValues = {
  name: "",
  deadline: "",
  startDate: "",
  endDate: "",
  mentoringCnt: "",
  content: "",
  link: "",
  role: "",
  categories: [],
  status: "RECRUITING",
};