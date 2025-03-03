"use client";

import { useQuery } from "@tanstack/react-query";

import UserReviewSkeleton from "../ui/UserReviewSkeleton";
import UserReviewItem from "./UserReviewItem";
import myPageKeys from "@/hooks/queries/my/myPageKeys";
import { getMyReviews } from "@/service/api/my";

const UserReviewList = () => {
  const { data, isFetching } = useQuery({
    queryKey: myPageKeys.reviews,
    queryFn: async () => await getMyReviews(),
  });

  return (
    <>
      {data && data?.length === 0 && (
        <p className="text-center p-4 md:py-4 rounded-xl text-sm md:text-lg bg-white shadow-sm min-h-[240px] md:min-h-[420px] flex flex-col justify-center items-center">
          아직 팀원들에게 받은 후기가 없습니다.
          <br /> 팀원들과 함께 프로젝트에 참여 하고 후기를 받아보세요 !
        </p>
      )}

      {isFetching && <UserReviewSkeleton count={4} />}

      {!isFetching && data && (
        <ul className="space-y-2 overflow-y-scroll scrollbar-hide max-h-[420px]">
          {data.map((review) => (
            <UserReviewItem
              key={review.reviewerId}
              id={review.reviewerId}
              content={review.content}
              date={review.createdDate}
              name={review.reviewerName}
              rate={review.rating}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default UserReviewList;
