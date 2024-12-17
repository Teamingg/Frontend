export interface PostFormData {
  projectName: string;
  deadline: string;
  memberCnt: string;
  link: string;
  contents: string;
}

export const ProjectPostFormFields = [
  {
    label: "제목",
    name: "projectName" as keyof PostFormData,
    required: true,
    rules: { required: "제목은 필수 항목입니다." },
  },
  {
    label: "모집 마감일",
    name: "deadline" as keyof PostFormData,
    required: true,
    rules: { required: "모집 마감일은 필수 항목입니다." },
  },
  {
    row: [
      {
        label: "모집인원",
        name: "memberCnt" as keyof PostFormData,
        required: true,
        rules: { required: "모집인원은 필수 항목입니다." },
      },
      {
        label: "연락 방법",
        name: "link" as keyof PostFormData,
        required: true,
        rules: { required: "연락 방법은 필수 항목입니다." },
      },
    ]
  },
];