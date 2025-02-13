"use client";

import Modal from "@/components/common/Modal/Modal";
import { usePathname, useRouter } from "next/navigation";
import UserProfileNav from "./(profile)/_components/UserProfileNav";

const UserProfileModal = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  const router = useRouter();

  return (
    <Modal
      isOpen={path.includes("/user/profile")}
      onClose={() => router.back()}
    >
      <section className="min-w-[350px] md:min-w-[700px] h-full bg-gray-100 rounded-lg p-4">
        <div className="flex justify-between items-center p-4">
          <h3 className="text-xl">유저프로필</h3>
          <button onClick={() => router.back()}>닫기</button>
        </div>

        <UserProfileNav />

        {children}
      </section>
    </Modal>
  );
};

export default UserProfileModal;
