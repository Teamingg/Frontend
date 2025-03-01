"use client";

import React, { ComponentProps, forwardRef } from "react";

interface TextInputProps extends ComponentProps<"input"> {
  error?: boolean;
  placeholder?: string;
  ariaLabel?: string; // 접근성을 위한 ARIA Label 추가
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ error, placeholder, ariaLabel, ...props }: TextInputProps, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        className={`text-sm md:text-base border py-2 px-4 outline-none rounded-md 
      focus:border-primary transition-colors ${error ? "border-red-400" : ""}`}
        aria-label={ariaLabel || placeholder} // aria-label 기본값으로 placeholder 사용
        placeholder={placeholder}
        {...props}
      />
    );
  }
);

export default TextInput;

// esLint 에러
TextInput.displayName = "Input";
