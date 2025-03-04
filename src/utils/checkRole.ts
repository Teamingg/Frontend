import { TeamRole } from "@/types/team/teamRole";

const checkRole = (role: TeamRole): string => {
  if (role === "LEADER" || role === "OWNER") {
    return "팀장";
  } else {
    return "팀원";
  }
};

export default checkRole;
