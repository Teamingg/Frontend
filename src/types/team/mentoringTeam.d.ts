import { TeamRole } from "./teamRole";
import { TeamStatus } from "./teamStatus";

export default interface MentoringTeam {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: TeamStatus;
  authority: TeamRole;
}