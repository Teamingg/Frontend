import Notification from "@/types/notification";
import { client } from "./instance/client";
import { AxiosResponse } from "axios";

const getNotification = async (): Promise<Notification[]> => {
  const response = await client.get<AxiosResponse<Notification[]>>(
    "/sse/notifications"
  );
  return response.data.data;
};

export default getNotification;
