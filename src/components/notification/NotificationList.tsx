"use client";

import Notification from "@/types/notification";
import NotificationItem from "./NotificationItem";
import { useEffect } from "react";
import notification from "@/service/api/notification/notification";
import { queryclient } from "@/lib/getQueryClient";

const NotificationPopUp = ({
  notificationList,
}: {
  notificationList: Notification[];
}) => {
  const notificationIds = notificationList.map(
    ({ notificationId }) => notificationId
  );

  const notificationItemRead = notificationList.map(({ read }) => read);

  useEffect(() => {
    if (notificationItemRead.length > 0) {
      notification.readNotification(notificationIds).then(() => {
        queryclient.invalidateQueries({ queryKey: ["notifications"] });
      });
    }
  }, [notificationIds, notificationItemRead.length, notificationList]);

  return (
    <ul className="h-[100vh] md:max-h-[400px] overflow-y-scroll divide-y-[1px] divide-gray-200">
      {notificationList.map((notification) => (
        <NotificationItem key={notification.notificationId} {...notification} />
      ))}
    </ul>
  );
};

export default NotificationPopUp;
