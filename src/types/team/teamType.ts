import MentoringTeam from "./mentoring/mentoringTeam";
import ProjectTeam from "./project/projectTeam";

type TeamTypes = {
  project: ProjectTeam;
  mentoring: MentoringTeam;
};

type TeamType<T extends keyof TeamTypes> = TeamTypes[T];

export default TeamType;
