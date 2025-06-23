'use client';
import React, {memo} from 'react';
import Image from "next/image";

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton = memo(({onClick}: CloseButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className="absolute top-0 right-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
      aria-label="닫기"
    >
      <Image 
        src="/close.svg" 
        width={24} 
        height={24} 
        alt="닫기" 
        sizes="24px"
        quality={75}
        loading="eager"
        className="object-contain"
      />
    </button>
  );
});

CloseButton.displayName = "CloseButton";
export default CloseButton;
