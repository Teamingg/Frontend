import TeamCategory from "@/types/teamCategory";

export const userKeys = {
  info: (userId: string) => [userId, "info"] as const,
  reviews: (userId: string) => [userId, "reviews"] as const,
  team: (userId: string, category: TeamCategory) =>
    [userId, "team", category] as const,
};

export default userKeys;
