// 프로젝트 타입
// .../(form)/create/project
export interface FormFields {
  label: string;
  name: string;
  required?: boolean;
  rules?: object;
  options?: { value: string; label: string }[];
}

export interface ProjectFormData {
  projectName: string;
  deadline: string;
  startDate: string;
  endDate: string;
  memberCnt: string;
  contents: string; // 필드 이름과 타입 확인
  link: string;
  stacks: number[];
  recruitCategoryIds: number[];
}

export type ProjectForm = FormFields | { row: FormFields[] };

// 멘토링 타입
// .../(form)/create/mentoring
export interface FormFields {
  label: string;
  name: string;
  required?: boolean;
  rules?: object;
  options?: { value: string; label: string }[];
}

export interface MentoringFormData {
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

export type MentoringForm = FormFields | { row: FormFields[] };
