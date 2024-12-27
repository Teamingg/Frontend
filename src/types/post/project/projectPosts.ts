import ProjectPost from "./projectPost";

export default interface ProjectPosts {
  content: ProjectPost[]; // 프로젝트 게시글 리스트
  nextCursor: number | null;
  pageSize: number;
  last: boolean;
}
