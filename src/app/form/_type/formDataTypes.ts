// 공통 타입
export interface FormField {
  label: string;
  // name: Path<T> | string;
  name: string;
  required?: boolean;
  rules?: object;
  options?: { value: string; label: string }[];
}

// 여러 개의 필드가 한 줄에 배치되는 경우
export interface RowFormField {
  row: FormField[];
}

// 폼에서 사용할 타입 (FormField 또는 RowFormField 둘 다 가능)
export type FormSchema = FormField | RowFormField;

// 공통 데이터 타입 (프로젝트, 멘토링 공통 필드)
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
export interface ProjectCreationData extends CommonType {
  projectName: string;
  memberCnt: string;
  contents: string;
  stacks: number[];
  recruitCategoryIds: number[];
}

/**
 * 프로젝트 게시글 수정 데이터
 * URL: `/form/edit/project/{team_id}`
 */
export interface ProjectPost {
  projectName: string;
  deadline: string;
  memberCnt: string;
  link: string;
  contents: string;
}

/**
 * 멘토링 데이터 타입
 * .../(form)/create/mentoring
 */
export interface MentoringCreationData extends CommonType {
  name: string;
  mentoringCnt: string;
  content: string;
  status: string;
  role: string;
  categories: number[];
}

/**
 * 멘토링 게시글 수정 데이터
 * URL: `/form/edit/mentoring/{team_id}`
 */
export interface MentoringPost {
  name: string;
  deadline: string;
  mentoringCnt: string;
  link: string;
  contents: string;
}