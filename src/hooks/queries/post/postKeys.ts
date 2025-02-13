import TeamCategory from "@/types/teamCategory";

const postKeys = {
  post: (category: TeamCategory, postId: string) => [category, "post", postId],
  posts: (category: TeamCategory) => [category, "posts"],
};

export default postKeys;
