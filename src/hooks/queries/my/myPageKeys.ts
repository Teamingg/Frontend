import TeamCategory from "@/types/teamCategory";

export const myPageKeys = {
  info: ["my", "info"] as const,
  reviews: ["my", "reviews"] as const,
  team: (category: TeamCategory) => ["my", category] as const,
};

export default myPageKeys;
