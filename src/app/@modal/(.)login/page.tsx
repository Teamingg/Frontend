"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import Modal from "@/components/Modal/Modal";

const oAuthList = [
  {
    name: "kakao",
    imageSrc: "oAuthLogo/kakao.svg",
  },
  {
    name: "naver",
    imageSrc: "oAuthLogo/naver.svg",
  },
  {
    name: "google",
    imageSrc: "oAuthLogo/google.svg",
  },
];

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const closeModal = () => {
    router.back();
  };

  return (
    <Modal isOpen={true} onClose={closeModal}>
      <div className="mb-6 px-4">
        <button onClick={closeModal} className="relative self-start text-sm">
          <Image
            src="icons/backArrow.svg"
            width={18}
            height={18}
            priority
            alt="아이콘"
            className="size-3 inline"
          />
          <span className="text-primary ml-1">처음으로</span>
        </button>
      </div>

      <div className="py-4">
        <div className="relative w-56 h-[85px] mx-auto mb-4">
          <Image src="/newLogo-text.png" fill alt="TeamingLogo" priority />
        </div>
        <div className="text-center">
          <p>
            <span className="text-primary">티밍</span>에 오신 것을 환영합니다,
          </p>
          <p>
            티밍에서 나와 함께 할<span className="text-primary"> 팀</span>을
            만나보세요.
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md text-center">
          {error === "auth_failed" && "로그인에 실패했습니다. 다시 시도해주세요."}
          {error === "invalid_params" && "잘못된 접근입니다."}
        </div>
      )}

      <ul className="space-y-2">
        {oAuthList.map((item) => (
          <li key={item.name}>
            <Link
              href={`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/${item.name}`}
              className="block"
            >
              <Image
                src={item.imageSrc}
                alt={item.name}
                width={200}
                height={30}
                priority
                className="w-[300px] h-[45px]"
              />
            </Link>
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default Page;