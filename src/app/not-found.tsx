"use client";

import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <section className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <div className="text-center">
        <h3 className="text-5xl font-extrabold mb-4">
          <span className="text-primary">404</span> Not Found
        </h3>
        <p className="text-2xl mb-12">
          죄송합니다. 요청하신 페이지를{" "}
          <span className="text-primary">찾을 수 없습니다.</span>
        </p>
        <button
          onClick={() => router.replace("/")}
          className="bg-primary text-white rounded-lg px-8 py-3 text-lg hover:bg-black/90 transition-colors"
        >
          홈으로 돌아가기
        </button>
      </div>
    </section>
  );
};

export default NotFound;