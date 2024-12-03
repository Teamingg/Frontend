"use client";

import { useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import Modal from "@/shared/ui/Modal";

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
  const closeModal = () => {
    router.back();
  };

  return (
    <Modal onClose={closeModal}>
      <button onClick={closeModal} className="relative self-start">
        <Image
          src="icons/backArrow.svg"
          width={24}
          height={24}
          priority={false}
          alt="아이콘"
          className="size-4 inline"
        />
        <span className="text-primary ml-1">처음으로</span>
      </button>
      <div className="relative w-56 h-52 mx-auto">
        <Image src="/Logo-text.svg" fill alt="TeamingLogo" priority={false} />
      </div>
      <div className="mb-8 text-center">
        <p>
          <span className="text-primary">티밍</span>에 오신 것을 환영합니다,
        </p>
        <p>
          티밍에서 나와 함께 할<span className="text-primary"> 팀</span>을
          만나보세요.
        </p>
      </div>

      <ul className="space-y-2">
        {oAuthList.map((item) => (
          <li key={item.name}>
            <Link
              href={`${process.env.NEXT_PUBLIC_AUTH_URL}/${item.name}`}
              className="block"
            >
              <Image
                src={item.imageSrc}
                alt={item.name}
                width={200}
                height={40}
                priority={false}
                className="w-[300px] h-auto"
              />
            </Link>
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default Page;
