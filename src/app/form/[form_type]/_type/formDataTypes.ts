// 공통 타입
export interface FormFields {
  label: string;
  name: string;
  required?: boolean;
  rules?: object;
  options?: { value: string; label: string }[];
}

interface CommonType {
  deadline: string;
  startDate: string;
  endDate: string;
  link: string;
}

/**
 * 프로젝트 타입
 * .../(form)/create/project
 */
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

// 프로젝트 게시글 수정
export interface ProjectPost {
  projectName: string;
  deadline: string;
  memberCnt: string;
  link: string;
  contents: string;
}

export type ProjectForm = FormFields | { row: FormFields[] };

/**
 * 멘토링 데이터 타입
 * .../(form)/create/mentoring
 */
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

// 멘토링 게시글 수정
export interface MentoringPost {
  name: string;
  deadline: string;
  mentoringCnt: string;
  link: string;
  contents: string;
}

export type MentoringForm = FormFields | { row: FormFields[] };
