export interface TeamPageInfo {
  // 권한
  authority: string;
  userRole: string;

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
};

export interface ProjectInfo {
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
}

export interface MentoringInfo {
  dto: {
    status: string;
    startDate: string;
    endDate: string;
    mentoringCnt: number;
    link: string;
    categories: string[];
    content: string;
  };
  error?: never;
  isLoading: boolean;
}