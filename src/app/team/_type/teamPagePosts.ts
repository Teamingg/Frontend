interface BasePost {
  title: string;
  startDate: string;
  endDate: string;
  contents: string;
  status: string;
}

export interface MentoringPosts extends BasePost {
  boardId: number;
  mentoringTeamName: string;
  category: string[];
}

export interface ProjectPosts extends BasePost {
  teamName: string;
  projectTeamId: number;
  postId: number;
  createdDate: string;
  stacks: string[];
}