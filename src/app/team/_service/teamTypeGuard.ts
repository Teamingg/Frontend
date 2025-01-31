// ✅ 프로젝트 멤버인지 확인
import {MentoringMemberResponse, ProjectMember} from "@/app/team/_type/teamPageMember";

export const isProjectMember = (data: unknown): data is ProjectMember[] => {
  return Array.isArray(data) && data.every(member => "participationId" in member);
};

// ✅ 멘토링 멤버인지 확인 (리더 or 일반 멤버)
export const isMentoringMember = (data: unknown): data is MentoringMemberResponse => {
  return typeof data === "object" && data !== null && "authority" in data;
};