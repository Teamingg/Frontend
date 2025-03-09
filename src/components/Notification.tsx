"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { PiBellThin, PiTrashSimpleFill } from "react-icons/pi";

import getNotification from "@/service/api/getNotification";
import connectNotification from "@/service/api/notification/connectNotification";
import notification from "@/service/api/notification/notification";

import { queryclient } from "@/lib/getQueryClient";

import NotificationList from "./notification/NotificationList";
import Link from "next/link";
import Image from "next/image";

const Notification = () => {
  const notificationPopUpRef = useRef<HTMLDivElement>(null);
  const path = usePathname();
  const [openNotification, setOpenNotification] = useState(false);

  const { data: notificationList } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => await getNotification(),
  });

  const unReadNotification = notificationList?.filter(
    (notification) => notification.read !== true
  );

  const notificationIds = notificationList?.map(
    ({ notificationId }) => notificationId
  );

  const removeAllNotification = async (notificationIds: string[]) => {
    if (notificationList.length === 0) return;

    await notification.removeAll(notificationIds);
    queryclient.invalidateQueries({ queryKey: ["notifications"] });
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationPopUpRef.current &&
        !notificationPopUpRef.current.contains(event.target)
      ) {
        setOpenNotification(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationPopUpRef]);

  useEffect(() => {
    const eventSource = connectNotification();

    eventSource.addEventListener("sse", (data) => {
      queryclient.invalidateQueries({ queryKey: ["notifications"] });
    });

    return () => {
      queryclient.removeQueries({ queryKey: ["notifications"] });
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    setOpenNotification(false);
  }, [path]);

  return (
    <>
      <div
        className="md:flex items-center gap-2 cursor-pointer"
        onClick={() => setOpenNotification((prev) => !prev)}
      >
        <div className="relative">
          <PiBellThin size={28} />
          {unReadNotification?.length > 0 && (
            <span className="border-3 text-xs bg-red-500 rounded-full absolute -top-1 -right-1 size-5 flex justify-center items-center text-white">
              {unReadNotification.length}
            </span>
          )}
        </div>
        <span className="hidden md:inline">알림</span>
      </div>

      {openNotification && (
        <div
          ref={notificationPopUpRef}
          className="fixed top-0 right-0 md:right-[20px] md:top-[60px]  bg-white z-50 w-full md:max-w-[500px] rounded-lg overflow-hidden drop-shadow-md"
        >
          <div className="flex justify-between  border-b border-b-gray-200 p-4">
            <button
              onClick={() => setOpenNotification((prev) => !prev)}
              className="cursor-pointer md:hidden"
            >
              <Image
                src="/icons/backArrow.svg"
                width={8}
                height={8}
                priority
                alt="아이콘"
              />
            </button>
            <h3 className="flex items-center gap-2">
              알림
              {notificationList && (
                <span className="text-white bg-red-500 text-xs size-[20px] flex items-center justify-center rounded-sm">
                  {notificationList.length}
                </span>
              )}
            </h3>
            <div className="flex gap-4 text-sm">
              <button
                className="text-red-400 cursor-pointer text-sm md:text-base"
                onClick={() => removeAllNotification(notificationIds)}
              >
                <PiTrashSimpleFill fill="#4a5565" />
              </button>
            </div>
          </div>
          {notificationList?.length === 0 && (
            <p className="p-4 text-center h-[100svh] md:h-auto">
              알림이 존재하지 않습니다.
            </p>
          )}
          {notificationList?.length > 0 && (
            <NotificationList notificationList={notificationList} />
          )}
        </div>
      )}
    </>
  );
};

export default Notification;
