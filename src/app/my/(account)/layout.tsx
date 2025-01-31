import React from "react";

const layout = ({
  info,
  review,
}: {
  info: React.ReactNode;
  review: React.ReactNode;
}) => {
  return (
    <div className="relative h-full">
      {/* 회원정보 */}
      <section className="mb-4">
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <h2 className=" text-xl text-primary">회원정보</h2>
        </div>
        {info}
      </section>

      {/* 리뷰 */}
      <section>
        <h2 className="bg-white rounded-lg shadow-sm p-4 text-primary text-xl mb-4">
          내가 받은 후기
        </h2>
        {review}
      </section>

      <button className="absolute bottom-0 right-0 bg-red-500 py-2 px-4 rounded-md text-white">
        탈퇴하기
      </button>
    </div>
  );
};

export default layout;
