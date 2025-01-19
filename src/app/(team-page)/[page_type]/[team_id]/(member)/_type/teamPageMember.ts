// 멘토링 멤버
export interface MentoringMember {
  // 스웨거 내 데이터 부재
}

// 프로젝트 멤버
export interface ProjectMember {
  "participationId": number,
  "userId": number,
  "projectTeamId": number,
  "participationStatus": string,
  "isDeleted": boolean,
  "isExport": boolean,
  "decisionDate": string,
  "role": string,
  "recruitCategory": string,
  "reportingCnt": number,
  "isLoginUser": boolean,
  "isReported": boolean,
  "isReviewed": boolean
}