import TeamCategory from "./teamCategory";

export default interface Notification {
  notificationId: string;
  userId: string;
  message: string;
  type: string;
  teamId: string;
  createdAt: string;
  read: boolean;
  category: TeamCategory;
}
