import React from "react";

const UserReviewSkeleton = ({ count }: { count: number }) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="w-[921px] h-[101px] bg-gray-200 animate-pulse rounded-lg"
        ></div>
      ))}
    </div>
  );
};

export default UserReviewSkeleton;
