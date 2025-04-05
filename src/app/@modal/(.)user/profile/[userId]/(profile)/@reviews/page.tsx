"use client";

import UserReviewItem from "@/components/Review/UserReviewIem";
import { useGetUserReviews } from "@/hooks/queries/user";
import Link from "next/link";
import { useParams } from "next/navigation";

const UserProfileReviewsPage = () => {
  const { userId } = useParams();

  const { data } = useGetUserReviews(userId as string);

  if (!data) {
    return <p>데이터를 불러오지 못했습니다.</p>;
  }

  return (
    <>
      {data.length === 0 && (
        <div className="min-h-[500px] max-h-[500px] flex justify-center items-center">
          <p>작성된 리뷰가 존재하지 않습니다.</p>
        </div>
      )}

      {data.length > 0 && (
        <ul>
          {data.map((review) => (
            <UserReviewItem
              key={review.revieweeId}
              id={review.revieweeId}
              name={review.reviewerName}
              content={review.content}
              date={review.createdDate}
              rate={0}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default UserProfileReviewsPage;
