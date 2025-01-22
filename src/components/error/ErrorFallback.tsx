"use client";
import React from 'react';
import {TbFaceIdError} from "react-icons/tb";
import {useRouter} from "next/navigation";

interface Props {
  message: string;
}

const ErrorFallback: React.FC<Props> =  ({ ...rest}) => {
  const router = useRouter();
  const handleRefresh = () => router.refresh();

  return (
      <div className="flex flex-col justify-center items-center gap-5">
        <TbFaceIdError className="w-16 h-16 text-blue-500"/>
        <span>{rest.message}</span>
        <button onClick={handleRefresh} className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
        >새로 고침</button>
      </div>
  );
};

export default ErrorFallback;