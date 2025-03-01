// ✅ 멤버 상태 (MemberTables)
export interface MemberStatus {
  approved: boolean | null; // 수락 여부
  removed: boolean; // 내보내기 여부
  reported: boolean; // 신고 여부
  written: boolean; // 작성 여부
}

// ✅ 공통 멤버 인터페이스 (멘토링 & 프로젝트 멤버 포함)
export interface BaseMember {
  userId: number;
  role: "MENTOR" | "MENTEE" | string;
}

// ✅ 멘토링 멤버 인터페이스
export interface MentoringMember extends BaseMember {
  type: "MENTORING";
  username: string;
  acceptedTime: string;
  status: "ACCEPTED" | "PENDING";
  isLogined: boolean;
  isDeleted: boolean;
}

// ✅ 프로젝트 멤버 인터페이스
export interface ProjectMember extends BaseMember {
  // 타입 오류 방지를 위해 임시로 선언
  acceptedTime: string;
  username: string;
  
  type: "PROJECT";
  userName: string;
  participationId: number;
  projectTeamId: number;
  participationStatus: string;
  isDeleted: boolean;
  isExport: boolean;
  decisionDate: string;
  recruitCategory: string;
  reportingCnt: number;
  isLoginUser: boolean;
  isReported: boolean;
  isReviewed: boolean;
}

// ✅ API 응답에서 필요한 데이터만 추출
export interface MentoringTeamLeader {
  teamId: number;
  authority: "LEADER";
  details: {
    members: MentoringMember[];
  };
}

export interface MentoringTeamMember {
  teamId: number;
  authority: "MEMBER";
  details: {
    members: MentoringMember[];
  };
}

// ✅ 최종 API 응답 데이터 타입 (프로젝트와 멘토링 통합)
export type MentoringMemberResponse = MentoringTeamLeader | MentoringTeamMember;
