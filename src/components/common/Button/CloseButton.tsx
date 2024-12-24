import Image from "next/image";
import React from "react";

interface CloseButtonProps {
  onClick: () => void;
  size: number;
}

const CloseButton = ({ onClick, size }: CloseButtonProps) => {
  return (
    <button onClick={onClick} type="button" className={`size-${size}`}>
      <Image
        src="/icons/close.svg"
        width={18}
        height={18}
        priority={false}
        alt="아이콘"
        className={`size-${size}`}
      />
    </button>
  );
};

export default CloseButton;
