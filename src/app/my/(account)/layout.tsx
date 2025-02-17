import React from "react";

const layout = ({
  info,
  review,
}: {
  info: React.ReactNode;
  review: React.ReactNode;
}) => {
  return (
    <div className="relative overflow-hidden h-full bg-[#f5f5f5] p-4 md:p-0">
      {/* 회원정보 */}
      <section className="mb-4">
        <div className="bg-white rounded-xl p-3 md:p-4 mb-4 shadow-sm">
          <h2 className="text-lg md:text-xl text-primary">회원정보</h2>
        </div>
        {info}
      </section>

      {/* 리뷰 */}
      <section>
        <h2 className="bg-white rounded-xl shadow-sm p-3 md:p-4 text-primary text-lg md:text-xl mb-4">
          내가 받은 후기
        </h2>
        {review}
      </section>

      <button className="w-full mt-4 md:m-0 md:w-auto md:absolute bottom-0 right-0 bg-red-500 py-2 px-4 rounded-lg text-white">
        탈퇴하기
      </button>
    </div>
  );
};

export default layout;
