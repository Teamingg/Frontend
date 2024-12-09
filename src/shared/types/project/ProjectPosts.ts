import ProjectPost from "./ProjectPost";

export default interface ProjectPosts {
  content: ProjectPost[]; // 프로젝트 게시글 리스트
  totalPages: number; // 전체 페이지 수
  totalElements: number; // 전체 게시글 수
  size: number; // 게시글 갯수
  number: number; //
  first: boolean; // 첫 페이지
  last: boolean; // 마지막 페이지
  numberOfElements: number;
}
