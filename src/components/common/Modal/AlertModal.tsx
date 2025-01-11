import React from "react";
import Modal from "./Modal";

interface AlertModalProps {
  onClose: () => void;
  isOpen: boolean;
  onConfirm: () => void;
  message: string;
  buttonLabel?: string;
  ConfirmButonColor?: string;
}

const AlertModal = ({
  onClose,
  isOpen,
  onConfirm,
  message,
  buttonLabel = "확인",
  ConfirmButonColor = "bg-primary",
}: AlertModalProps) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <p className="mb-6 text-xl">{message}</p>
      <div className="flex gap-4">
        <button className="py-2 border rounded-lg w-full" onClick={onClose}>
          닫기
        </button>
        <button
          className={`py-2 rounded-lg w-full text-white  ${ConfirmButonColor}`}
          onClick={onConfirm}
        >
          {buttonLabel}
        </button>
      </div>
    </Modal>
  );
};

export default AlertModal;
