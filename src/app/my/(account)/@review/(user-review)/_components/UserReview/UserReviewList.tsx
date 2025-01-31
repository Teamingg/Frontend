"use client";

import { useQuery } from "@tanstack/react-query";

import { getUserReviews } from "@/service/api/user/getUserReviews";

import UserReviewSkeleton from "../ui/UserReviewSkeleton";
import UserReviewItem from "./UserReviewItem";

const UserReviewList = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["user", "review"],
    queryFn: async () => await getUserReviews(),
  });

  return (
    <>
      {data && data?.length === 0 && (
        <p>
          아직 팀원들에게 받은 후기가 없습니다. 프로젝트에 참여하고 후기를
          받아보세요
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
