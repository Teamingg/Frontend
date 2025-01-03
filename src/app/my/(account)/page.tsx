import UserInfoSection from "@/app/my/(account)/_components/UserInfoSection";
import UserReviewList from "./_components/UserReview/UserReviewList";

const AccountPage = () => {
  return (
    <div className="relative h-full">
      {/* 유저정보 (닉네임, 자기소개, 기술스택, 경고횟수) */}
      <UserInfoSection />

      {/* 유저가 받은 평가 */}
      <div>
        <h2 className="bg-white rounded-lg shadow-sm p-4 text-primary text-xl mb-4">
          내가 받은 후기
        </h2>
        <UserReviewList />
      </div>

      <button className="absolute bottom-0 right-0 bg-red-500 py-2 px-4 rounded-md text-white">
        탈퇴하기
      </button>
    </div>
  );
};

export default AccountPage;
