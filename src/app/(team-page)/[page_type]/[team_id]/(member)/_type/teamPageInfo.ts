export interface TeamPageInfo {
  // 권한
  authority: string;

  // dto
  dto: {
    projectId: number;
    startDate: string;
    endDate: string;
    content: string;
    categories: string[];
    link: string;
    memberCnt: number;
    projectName: string;
    status: string;
    stacks: string[];
  },

  userParticipations: []
}