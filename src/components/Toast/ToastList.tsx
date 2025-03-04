"use client";

import { createPortal } from "react-dom";
import ToastItem from "./ToastItem";
import { useToast } from "@/hooks/useToast";
import { useEffect, useState } from "react";

const ToastList = () => {
  const [client, setClient] = useState(false);

  const { toastList } = useToast();

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return null;

  return createPortal(
    <>
      {toastList.length > 0 && (
        <ul className="fixed z-[999] top-4 left-[50%] translate-x-[-50%]  space-y-4">
          {toastList.map((el) => (
            <ToastItem
              key={el.id}
              id={el.id}
              message={el.message}
              type={el.type}
            />
          ))}
        </ul>
      )}
    </>,
    document.getElementById("toast")!
  );
};

export default ToastList;
