import React from 'react';
import Link from 'next/link';
import { TbFaceIdError } from "react-icons/tb";

const AuthErrorFallback = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <TbFaceIdError className="w-16 h-16 text-primary" />
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">로그인이 필요한 서비스입니다</h3>
        <p className="text-gray-600 mb-4">
          서비스를 이용하시려면 로그인해 주세요.
        </p>
        <Link
          href="/login"
          className="inline-block px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          로그인하기
        </Link>
      </div>
    </div>
  );
};

export default AuthErrorFallback; 