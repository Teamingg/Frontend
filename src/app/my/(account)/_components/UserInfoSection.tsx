"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// types
import { UserInfoFormValues } from "@/components/user/UserInfoForm/UserInfoFormValues";

// hooks
import useUpdateUserInfo from "../../../../hooks/user/useUpdateUserInfo";
import useGetUserInfo from "../../../../hooks/user/useGetUserInfo";
import useModal from "@/hooks/useModal";

// _components
import UserInfoContent from "./UserInfoContent";
import EditUserForm from "./EditUserForm/EditUserForm";
import Modal from "@/components/common/Modal/Modal";
import LoadingIndicator from "@/components/common/LoadingIndicator";

import { filterItemsByIds } from "@/utils/filterItemsByIds";

import STACK_LIST from "@/constant/stackList";

const UserInfoSection = () => {
  const router = useRouter();

  const { modal: edit, openModal, closeModal } = useModal();

  const { userInfo, isError, isPending } = useGetUserInfo();
  const { mutate, isSuccess } = useUpdateUserInfo();

  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess, closeModal]);

  const onSubmit = async (data: UserInfoFormValues) => {
    mutate(data);
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
              stacksIds: userInfo!.stacks,
            }}
          />
        </Modal>
      )}
      <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className=" text-xl text-primary">회원정보</h2>
          {userInfo && (
            <button
              onClick={openModal}
              className="bg-primary text-sm text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors disabled:bg-opacity-90"
            >
              수정하기
            </button>
          )}
        </div>

        {isPending && (
          <div className="flex justify-center items-center h-[200px]">
            <LoadingIndicator />
          </div>
        )}

        {userInfo && (
          <UserInfoContent
            name={userInfo.name || ""}
            introduce={userInfo.introduce || ""}
            waringCnt={userInfo.waringCnt || 0}
            stacks={filterItemsByIds(userInfo.stacks, STACK_LIST) || []}
          />
        )}

        {/* 유저 정보를 불러오지 못했을 때 */}
        {isError && (
          <>
            <p className="mb-2 text-center">
              정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
            </p>
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
