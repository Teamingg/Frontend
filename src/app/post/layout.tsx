"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const PostDetailPageLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <section className="p-6 relative">
      <div className="px-4">
        <button onClick={() => router.back()}>
          <div className="relative size-3 inline-block mr-2">
            <Image src="/icons/backArrow.svg" alt="뒤로가기 아이콘" fill />
          </div>
          <span className="text-primary">뒤로가기</span>
        </button>
      </div>
      {children}
    </section>
  );
};

export default PostDetailPageLayout;
