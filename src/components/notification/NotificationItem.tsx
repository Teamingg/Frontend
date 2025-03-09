"use client";

import Notification from "@/types/notification";
import { PiTrashSimpleFill } from "react-icons/pi";
import notification from "@/service/api/notification/notification";
import { queryclient } from "@/lib/getQueryClient";
import { useRouter } from "next/navigation";

const NotificationItem = ({
  notificationId,
  read,
  type,
  message,
  createdAt,
  category,
  teamId,
}: Notification) => {
  const router = useRouter();

  const redirectToTeamPage = () => {
    router.push(`team/${category}/${teamId}/info`);
  };

  const removeNotification = async () => {
    await notification.remove(notificationId);
    queryclient.invalidateQueries({ queryKey: ["notifications"] });
  };

  const handleClickNotification = async () => {
    if (teamId) {
      redirectToTeamPage();
    }
  };

  return (
    <li className={`relative p-4 cursor-pointer`}>
      <button
        className="cursor-pointer absolute top-4 right-4"
        onClick={removeNotification}
      >
        <PiTrashSimpleFill fill="#4a5565" />
      </button>
      <div onClick={handleClickNotification}>
        <h5 className="text-sm text-gray-700">{type}</h5>

        <p>{message}</p>
        <p className="text-xs text-gray-500">
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
    </li>
  );
};

export default NotificationItem;
