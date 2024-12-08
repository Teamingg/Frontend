"use client";

import React, { ComponentProps, forwardRef } from "react";

interface TextInputProps extends ComponentProps<"input"> {
  error: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ error, ...props }: TextInputProps, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        className={`border py-2 px-4 outline-none rounded-md 
      focus:border-primary transition-colors ${error ? "border-red-400" : ""}`}
        {...props}
      />
    );
  }
);

export default TextInput;

// esLint 에러
TextInput.displayName = "Input";
