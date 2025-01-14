import { TeamStatus } from "@/types/team/teamStatus";

export default interface MentoringPost {
  boardId: number;
  teamId: number;
  title: string;
  mentoringTeamName: string;
  deadLine: string;
  status: TeamStatus;
  startDate: string;
  endDate: string;
  role: string;
  mentoringCnt: number;
  link: string;
  category: string[];
  contents: string;
  createdDate: string;
  modifiedDate: string;
  authority: string;
  isParticipate: boolean;
}
