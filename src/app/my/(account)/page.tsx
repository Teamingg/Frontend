import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { queryclient } from "@/lib/getQueryClient";

import { getUserInfo } from "@/service/api/user/getUserInfo";

import UserInfoSection from "@/app/my/(account)/_components/UserInfoSection";

const AccountPage = async () => {
  await queryclient.prefetchQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
  });

  return (
    <div className="relative h-full">
      {/* 유저정보 (닉네임, 자기소개, 기술스택, 경고횟수) */}

      <HydrationBoundary state={dehydrate(queryclient)}>
        <UserInfoSection />
      </HydrationBoundary>

      {/* 유저가 받은 평가 */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className=" text-xl text-primary mb-4">내가 받은 후기</h2>
        <p>
          아직 팀원들에게 받은 후기가 없습니다. 프로젝트에 참여하고 후기를
          받아보세요
        </p>
      </div>

      <button className="absolute bottom-0 right-0 bg-red-500 py-2 px-4 rounded-md text-white">
        탈퇴하기
      </button>
    </div>
  );
};

export default AccountPage;
