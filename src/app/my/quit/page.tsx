'use client';
import React from 'react';
import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';
import {withdrawUser} from "@/service/api/my/withdrawUser";

const WithdrawPage = () => {
  const router = useRouter();
  
  const {mutate, isPending, isSuccess, isError, error} = useMutation({
    mutationFn: withdrawUser,
    onSuccess: () => {
      alert('탈퇴가 완료되었습니다. 30일간 재가입이 불가합니다.');
      router.push('/'); // 탈퇴 후 리디렉션
    },
    onError: (err: Error) => {
      alert(err.message);
    },
  });
  
  const handleCancel = () => {
    router.back();
  };
  
  return (
    <div className="mt-6 flex flex-col justify-center gap-4">
      <p className="text-base leading-relaxed text-center">
        탈퇴를 진행하시면 <strong className="text-red-600">모든 데이터가 영구 삭제</strong>되며,<br />
        <strong className="text-red-600">30일 동안 재가입이 제한</strong>됩니다.<br />
        정말 탈퇴하시겠습니까?
      </p>
      
      <button
        onClick={() => mutate()}
        disabled={isPending}
        className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50 cursor-pointer">
        {isPending ? '처리 중...' : '탈퇴하기'}
      </button>
    </div>
  
  );
};

export default WithdrawPage;