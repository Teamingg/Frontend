"use client";

import { useToast } from "@/hooks/useToast";
import { useEffect } from "react";
import {
  IoMdAlert,
  IoMdCheckmarkCircle,
  IoMdCloseCircle,
} from "react-icons/io";

interface ToastItemProps {
  id: string;
  message: string;
  type: "success" | "error" | "notice";
}

const ToastItem = ({ id, message, type }: ToastItemProps) => {
  const { closeToast } = useToast();

  const size = "size-4 md:size-8";

  const typeColor =
    type === "success"
      ? "text-green-500"
      : type === "error"
      ? "text-red-500"
      : "text-blue-500";

  const typeBgColor =
    type === "success"
      ? "bg-green-200"
      : type === "error"
      ? "bg-red-200"
      : "bg-blue-200";

  const alertIcon =
    type === "success" ? (
      <IoMdCheckmarkCircle fill="#22c55e" className={size} />
    ) : type === "error" ? (
      <IoMdCloseCircle fill="#ef4444" className={size} />
    ) : (
      <IoMdAlert fill="#3b82f6" className={size} />
    );

  useEffect(() => {
    setTimeout(() => closeToast(id), 3000);
  }, [closeToast, id]);

  return (
    <li
      className={` py-2 md:py-4 pl-8 w-[400px] rounded-md flex gap-4 items-center text-base md:text-lg shadow-md ${typeColor} ${typeBgColor}`}
    >
      {alertIcon}
      <div>
        <strong className="hidden md:block">알림</strong>
        <p>{message}</p>
      </div>
    </li>
  );
};

export default ToastItem;
