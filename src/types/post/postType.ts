import MentoringPost from "./mentoring/mentoringPost";
import ProjectPost from "./project/projectPost";

type PostTypes = {
  project: ProjectPost;
  mentoring: MentoringPost;
};

type PostType<T extends keyof PostTypes> = PostTypes[T];

export default PostType;
