import MentoringPost from "./mentoringPost";

export default interface MentoringPosts {
  content: MentoringPost[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
}
