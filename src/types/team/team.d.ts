interface ProjectInfo {
  data: {
    projectName: string;
    startDate: string;
    endDate: string;
    deadline: string;
    memberCnt: number;
    link: string;
    contents: string;
    createdDate: string;
    lastModifiedDate: string;
    projectId: number;
    stacks: string[];
    recruitCategories: string[];
    userRole: string;
  };
}

interface MentoringInfo {
  data: {
    dto: {
      id: number;
      name: string;
      startDate: string;
      endDate: string;
      mentoringCnt: number;
      content: string;
      status: string;
      link: string;
      categories: string[];
    };
    userParticipations: {
      participatedTime: string;
      userId: number;
      username: string;
      status: string;
      isLogined: boolean;
    }[];
    authority: string;
  };
}