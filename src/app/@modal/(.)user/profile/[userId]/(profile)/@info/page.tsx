"use client";

import { useParams } from "next/navigation";
import InfoRow from "./_components/InfoRow";
import { filterItemsByIds } from "@/utils/filterItemsByIds";
import STACK_LIST from "@/constant/stackList";
import { useGetUserInfo } from "@/hooks/queries/user";

const UserProfileInfoPage = () => {
  const { userId } = useParams();

  const { data } = useGetUserInfo(userId as string);

  if (!data) {
    return <p>정보를 불러오지 못했습니다.</p>;
  }
  const stacks = filterItemsByIds(data!.stacks, STACK_LIST);
  return (
    <>
      {data && (
        <div className="bg-white p-4 rounded-lg text-sm md:text-base">
          <div className="grid grid-cols-2 mb-2 md:mb-4">
            <InfoRow title="이름" content={data!.name} />
            <InfoRow title="경고횟수" content={`${data.waringCnt || 0}`} />
          </div>
          <div className="flex flex-col gap-2 md:grid md:grid-cols-2 mb-2 md:mb-4">
            <InfoRow title="이메일" content={data!.email} />
            <InfoRow
              title="기술스택"
              content={filterItemsByIds(data.stacks, STACK_LIST)
                .map((value) => value.label)
                .join(",")}
            />
          </div>
          <div>
            <InfoRow title="자기소개" content={data!.introduce} />
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfileInfoPage;
