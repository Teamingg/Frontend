"use client";

import UserReviewItem from "@/app/my/(dashboard)/@review/(user-review)/_components/UserReview/UserReviewItem";
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
        <ul>
          <UserReviewItem
              key={1}
              id={1}
              name={"정민"}
              content={"좋은 팀원이었어요 !"}
              date={"2025-02-06"} rate={0}          />
        </ul>
        // <div className="min-h-[500px] max-h-[500px] flex justify-center items-center">
        //   <p>작성된 리뷰가 존재하지 않습니다.</p>
        //   <Link href={`/user/profile/2`} className="block">.
        //     유저 프로필 테스트 2
        //   </Link>
        //   <Link href={`/user/profile/1`} className="block">
        //     유저 프로필 테스트 1
        //   </Link>{" "}
        //   <Link href={`/user/profile/6`} className="block">
        //     유저 프로필 테스트 3
        //   </Link>
        // </div>
      )}

      {data.length > 0 && (
        <ul>
          {data.map((review) => (
            <UserReviewItem
                key={review.revieweeId}
                id={review.revieweeId}
                name={review.reviewerName}
                content={review.content}
                date={review.createdDate} rate={0}            />
          ))}
        </ul>
      )}
    </>
  );
};

export default UserProfileReviewsPage;