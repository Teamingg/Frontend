import {ProjectMember, MentoringMember} from "@/app/(team-page)/[page_type]/[team_id]/(member)/_type/teamPageMember";

type memberDataType = ProjectMember[] | MentoringMember[];

// 타입 가드 (데이터가 MentoringMember 인지 확인
const isMentoringMember = (data: never): data is MentoringMember => {
  return typeof data === "object" && data !== null && "mentoring" in data;
}

export const mapMemberData = (data: memberDataType) => {
  if (isMentoringMember(data[0])) {
    // 멘토링 멤버 데이터 바인딩
    return data.map(member => ({
      userId: 1,
      mentoringTeamId: 1,
      role: "MEMBER"
    }))
  } else {
    return data.map(member => ({
      participationId: member.participationId,
      userId: member.userId,
      projectTeamId: member.projectTeamId,
      participationStatus: member.participationStatus,
      isDeleted: member.isDeleted,
      isExpired: member.isExpired,
      decisionDate: member.decisionDate,
      role: member.role,
      recruitCategory: member.recruitCategory,
      reportingCnt: member.reportingCnt,
      isLoginUser: member.isLoginUser,
      isReported: member.isReported,
      isReviewed: member.isReviewd,
    }))
  }
}