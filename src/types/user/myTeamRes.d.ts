import { TeamRole } from "../team/teamRole";
import { TeamStatus } from "../team/teamStatus";

export interface MentoringTeam {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: TeamStatus;
  authority: TeamRole;
}

export interface ProjectTeam {
  teamName: string;
  startDate: string;
  endDate: string;
  status: TeamStatus;
  role: TeamRole;
  projectTeamId: number;
  createdDate: number;
}

type TeamTypes = {
  project: ProjectTeam;
  mentoring: MentoringTeam;
};

export type TeamType<T extends keyof TeamTypes> = TeamTypes[T];
