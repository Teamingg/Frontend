import React from "react";
import Modal from "./Modal";

interface AlertModalProps {
  onClose: () => void;
  isOpen: boolean;
  onConfirm: () => void;
  title?: string;
  message: string;
  buttonLabel?: string;
  ConfirmButonColor?: string;
  isLoading?: boolean;
}

const AlertModal = ({
  onClose,
  isOpen,
  onConfirm,
  message,
  buttonLabel = "확인",
  title,
  ConfirmButonColor = "bg-primary",
  isLoading = false,
}: AlertModalProps) => {
  const buttonHover = "hover:bg-black/85 transition-colors";
  const buttonCommonStyle = "py-2 rounded-lg w-full";

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      {title && <h3 className="text-center text-xl mb-4">{title}</h3>}
      <p className={`mb-6 text-lg ${title && "text-gray-500"}`}>{message}</p>
      <div className="flex gap-4">
        <button className={`${buttonCommonStyle} border`} onClick={onClose}>
          닫기
        </button>
        <button
          className={`${buttonCommonStyle} text-white  ${ConfirmButonColor} ${buttonHover}`}
          onClick={onConfirm}
          disabled={isLoading}
        >
          {buttonLabel}
        </button>
      </div>
    </Modal>
  );
};

export default AlertModal;