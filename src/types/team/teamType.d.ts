import MentoringTeam from "./mentoringTeam";
import ProjectTeam from "./projectTeam";

type TeamTypes = {
  project: ProjectTeam;
  mentoring: MentoringTeam;
};

type TeamType<T extends keyof TeamTypes> = TeamTypes[T];

export default TeamType;