import React from 'react';

interface FormTitleProps {
  highlight: string;
  title: string;
}

const FormTitle:React.FC<FormTitleProps> = ({highlight, title}) => {
  return (
    <h2 className="text-center text-xl my-20">
      <span className="text-blue-500">{highlight}</span>{title}
    </h2>
  );
};

export default FormTitle;