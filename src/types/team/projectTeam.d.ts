import { TeamRole } from "./teamRole";
import { TeamStatus } from "./teamStatus";

export default interface ProjectTeam {
  teamName: string;
  startDate: string;
  endDate: string;
  status: TeamStatus;
  role: TeamRole;
  projectTeamId: number;
  createdDate: number;
}