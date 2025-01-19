import {MentoringPost} from "@/app/(form)/_type/formDataTypes";

export const MentoringPostFormFields = [
  {
    label: "제목",
    name: "projectName" as keyof MentoringPost,
    required: true,
    rules: { required: "제목은 필수 항목입니다." },
  },
  {
    row: [
      {
        label: "모집분야",
        name: "deadline" as keyof MentoringPost,
        required: true,
        rules: { required: "모집분야은 필수 항목입니다." },
      },
      {
        label: "모집인원",
        name: "memberCnt" as keyof MentoringPost,
        required: true,
        rules: { required: "모집인원은 필수 항목입니다." },
      },
    ]
  },
  {
    label: "연락 방법",
    name: "link" as keyof MentoringPost,
    required: true,
    rules: { required: "연락 방법은 필수 항목입니다." },
  },
];