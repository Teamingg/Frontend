"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const PostDetailPageLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <section className="p-4 md:p-0 h-full relative md:max-w-[1400px] md:mx-auto">
      <div className="px-2">
        <button
          onClick={() => router.back()}
          className="flex gap-2 items-center"
        >
          <div className="relative size-2 md:size-4 inline-block">
            <Image src="/icons/backArrow.svg" alt="뒤로가기 아이콘" fill />
          </div>
          <span className="text-primary text-sm md:text-base">뒤로가기</span>
        </button>
      </div>
      {children}
    </section>
  );
};

export default PostDetailPageLayout;
