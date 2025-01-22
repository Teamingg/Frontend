// 멤버의 상태 (MemberTables)
export interface MemberStatus {
  approved: boolean | null; // 수락 여부
  removed: boolean; // 내보내기 여부
  reported: boolean; // 신고 여부
  written: boolean; // 작성 여부
}

// 공통 인터페이스
interface CommonMember<T> {
  status: number;
  code: string;
  message: string;
  data: T;
}

// 리더용 반환데이터 구조
interface MentoringTeamLeaderData {
  teamId: number;
  authority: "LEADER";
  details: {
    members: {
      acceptedTime: string;
      userId: number;
      username: string;
      role: "MENTOR" | "MENTEE";
      status: "ACCEPTED" | "PENDING";
      isLogined: boolean;
      isDeleted: boolean;
    }[];
    participations: {
      participatedTime: string;
      userId: number;
      username: string;
      reportingCnt: number;
      status: "ACCEPTED" | "PENDING";
    }[];
  };
}


// 멤버용 반환데이터 구조
interface MentoringTeamMemberData {
  teamId: number;
  authority: "CREW";
  details: {
    acceptedTime: string;
    userId: number;
    username: string;
    role: "MENTOR" | "MENTEE";
    status: "ACCEPTED" | "PENDING";
    isLogined: boolean;
    isDeleted: boolean;
  }[];
}

// 프로젝트 멤버
export interface ProjectMemberData {
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

// 멘토링 리더 / 멤버
export type MentoringTeamLeader = CommonMember<MentoringTeamLeaderData>;
export type MentoringTeamMember = CommonMember<MentoringTeamMemberData>;

// 프로젝트 멤버
export type ProjectMember = CommonMember<ProjectMemberData[]>