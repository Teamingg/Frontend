import TeamCategory from "@/types/teamCategory";

export const myPageKeys = {
  info: ["My", "info"] as const,
  reviews: ["My", "reviews"] as const,
  team: (category: TeamCategory) => ["My", category] as const,
};

export default myPageKeys;