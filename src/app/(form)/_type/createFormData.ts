// 프로젝트 타입
// .../(form)/create/project
export interface FormFields {
  label: string;
  name: string;
  required?: boolean;
  rules?: object;
  options?: { value: string; label: string }[];
}

// 프로젝트 게시글 수정
export interface ProjectEditFormFields {
  projectName: string;
  deadline: string;
  memberCnt: string; // 프로젝트는 memberCnt 사용
  link: string;
  contents: string;
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

// 멘토링 게시글 수정
export interface MentoringEditFormFields {
  name: string;
  deadline: string;
  mentoringCnt: string; // 멘토링은 mentoringCnt 사용
  link: string;
  contents: string;
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
