import { client } from "../instance/client";

import handleError from "@/service/handleError";

const notification = {
  // 단일 삭제
  remove: async (notificationId: string) => {
    const response = await client.delete(
      `/sse/notifications/${notificationId}`
    );
    if (response.status !== 200) {
      handleError(response.status);
    }
    return response;
  },

  // 전부 삭제
  removeAll: async (notificationIds: string[]) => {
    const response = await client.delete("/sse/notifications", {
      data: {
        notificationIds,
      },
    });
    if (response.status !== 200) {
      handleError(response.status);
    }
    return response;
  },

  // 읽음 처리
  readNotification: async (notificationIds: string[]) => {
    const response = await client.put("/sse/notifications", {
      notificationIds,
    });
    if (response.status !== 200) {
      handleError(response.status);
    }
    return response;
  },
};

export default notification;
