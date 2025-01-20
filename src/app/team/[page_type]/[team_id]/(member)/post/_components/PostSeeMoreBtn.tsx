import React from 'react';
import Link from "next/link";

const PostSeeMoreBtn = () => {
  return (
    <Link href="#" className="w-full mt-20 mx-auto h-[50px] p-3 block rounded-2xl bg-blue-500 text-white text-center text-xl font-bold">
      <span>더보기</span>
    </Link>
  );
};

export default PostSeeMoreBtn;