import { Suspense } from "react";
import UserReviewSkeleton from "./_components/ui/UserReviewSkeleton";
import UserInfoFallback from "./_components/ui/UserInfoFallback";
import UserReviewContainer from "./_components/UserReviewContainer";
import UserInfoContainer from "./_components/UserInfo/UserInfoContainer";

const AccountPage = async () => {
  return (
    <div className="relative h-full">
      {/* 유저정보 (닉네임, 자기소개, 기술스택, 경고횟수) */}
      <Suspense fallback={<UserInfoFallback />}>
        <UserInfoContainer />
      </Suspense>

      {/* 유저가 받은 평가 */}
      <div>
        <h2 className="bg-white rounded-lg shadow-sm p-4 text-primary text-xl mb-4">
          내가 받은 후기
        </h2>
        <Suspense fallback={<UserReviewSkeleton count={4} />}>
          <UserReviewContainer />
        </Suspense>
      </div>

      <button className="absolute bottom-0 right-0 bg-red-500 py-2 px-4 rounded-md text-white">
        탈퇴하기
      </button>
    </div>
  );
};

export default AccountPage;
