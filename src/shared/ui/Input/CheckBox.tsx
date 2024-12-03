import React, { ComponentProps, forwardRef } from "react";

interface CheckBoxProps extends ComponentProps<"input"> {
  label: string;
  id: string;
}

const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ label, id, ...props }: CheckBoxProps, ref) => {
    return (
      <>
        <label htmlFor={id} className="cursor-pointer px-4 py-2 block w-full">
          {label}
        </label>
        <input
          className="hidden peer/checkbox"
          type="checkbox"
          id={id}
          ref={ref}
          {...props}
        />
      </>
    );
  }
);
export default CheckBox;

CheckBox.displayName = "Input";
