"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Modal = ({
  children,
  onClose,
  isOpen,
}: {
  children: React.ReactNode;
  onClose?: () => void;
  isOpen: boolean;
}) => {
  const [modal, setModal] = useState<boolean>(true);

  const modalRoot = document.getElementById("modal-root")!;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setModal(false);
    }
  }, [isOpen]);

  return createPortal(
    <>
      {modal ? (
        <div
          onClick={onClose}
          className="fixed top-0 left-0 bg-[rgba(19,17,17,0.5)] w-screen h-screen z-[90] flex justify-center items-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-md"
          >
            {children}
          </div>
        </div>
      ) : null}
    </>,
    modalRoot
  );
};

export default Modal;
