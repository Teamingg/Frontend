"use client";

import { useState } from "react";

// types
import { UserInfoFormValues } from "@/components/user/UserInfoForm/UserInfoFormValues";

// hooks
import useUpdateUserInfo from "../../../../hooks/user/useUpdateUserInfo";
import useGetUserInfo from "../../../../hooks/user/useGetUserInfo";

// components
import Modal from "@/components/common/Modal/Modal";
import UserInfoContent from "./UserInfoContent";
import { useRouter } from "next/navigation";
import STACK_LIST from "@/constant/stackList";
import EditUserForm from "./EditUserForm/EditUserForm";

const UserInfoSection = () => {
  const router = useRouter();

  const [edit, setEdit] = useState<boolean>(false);

  const { userInfo, isError, error } = useGetUserInfo();
  const { mutate, isSuccess } = useUpdateUserInfo();
  const closeModal = () => {
    setEdit(false);
  };

  const onSubmit = async (data: UserInfoFormValues) => {
    mutate(data);

    // 성공 시 모달Close
    if (isSuccess) {
      return setEdit(false);
    }
  };

  return (
    <>
      {edit && (
        <Modal isOpen={true} onClose={closeModal}>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-primary text-center text-2xl">회원정보 수정</h1>
            <button
              onClick={closeModal}
              className=" border px-4 py-1 text-sm rounded-md hover:border-primary hover:border-opacity-30 transition-colors"
            >
              닫기
            </button>
          </div>
          <EditUserForm
            onSubmit={onSubmit}
            userInfo={{
              name: userInfo!.name,
              introduce: userInfo!.introduce,
              stacks: userInfo!.stacks,
            }}
          />
        </Modal>
      )}
      <div className="bg-white rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className=" text-xl text-primary">회원정보</h2>
          {userInfo && (
            <button
              onClick={() => setEdit(true)}
              className="bg-primary text-sm text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
            >
              수정하기
            </button>
          )}
        </div>
        {userInfo && (
          <UserInfoContent
            name={userInfo.name || ""}
            introduce={userInfo.introduce || ""}
            waringCnt={userInfo.waringCnt || 0}
            stacks={
              STACK_LIST.filter((item) =>
                userInfo.stacks.includes(item.value)
              ) || []
            }
          />
        )}

        {/* 유저 정보를 불러오지 못했을 때 */}
        {isError && (
          <>
            <p className="mb-2 text-center">{error?.message}</p>
            <button
              onClick={() => router.replace("/")}
              className="w-full py-2 bg-primary text-white rounded-lg"
            >
              처음으로 돌아가기
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default UserInfoSection;
