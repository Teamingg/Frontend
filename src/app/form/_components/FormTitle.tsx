import React from "react";

interface FormTitleProps {
  highlight: string;
  title: string;
}

const FormTitle = ({ highlight, title }: FormTitleProps) => {
  return (
    <h2 className="w-full max-w-60 mx-auto text-center text-xl my-4">
      <span className="text-blue-500">{highlight}</span>
      {title}
    </h2>
  );
};

export default FormTitle;
