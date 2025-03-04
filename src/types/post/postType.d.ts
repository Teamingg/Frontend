import MentoringPost from "./mentoringPost";
import ProjectPost from "./projectPost";

type PostTypes = {
  project: ProjectPost;
  mentoring: MentoringPost;
};

type PostType<T extends keyof PostTypes> = PostTypes[T];

export default PostType;