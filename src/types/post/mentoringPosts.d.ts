import MentoringPost from "./mentoringPost";

export default interface MentoringPosts {
  content: MentoringPost[]; // 프로젝트 게시글 리스트
  nextCursor: number | null;
  pageSize: number;
  last: boolean;
}
