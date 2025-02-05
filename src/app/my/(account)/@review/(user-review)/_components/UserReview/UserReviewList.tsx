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
        <p className="text-center py-4 rounded-lg text-lg bg-white shadow-sm">
          아직 팀원들에게 받은 후기가 없습니다.{" "}
          <span className="text-primary">팀원들과 함께 프로젝트에 참여</span>
          하고 후기를 받아보세요 !
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
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default UserReviewList;
