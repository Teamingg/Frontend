"use client";

import { useEffect } from "react";

// types
import { UserInfoFormValues } from "@/types/UserInfoFormValues";

// hooks
import useUpdateUserInfo from "@/hooks/user/useUpdateUserInfo";
import useGetMyInfo from "@/hooks/queries/my/useGetMyInfo";
import useModal from "@/hooks/useModal";

// _components
import UserInfoContent from "./UserInfoContent";

import Modal from "@/components/Modal/Modal";

import { filterItemsByIds } from "@/utils/filterItemsByIds";

import STACK_LIST from "@/constant/stackList";
import UserInfoFallback from "../ui/UserInfoFallback";
import { useToast } from "@/hooks/useToast";
import EditUserForm from "../EditUserForm/EditUserForm";

const UserInfoSection = () => {
  const { toast } = useToast();
  const { modal: edit, openModal, closeModal } = useModal();

  const { userInfo, isFetching } = useGetMyInfo();

  const { mutate, isSuccess } = useUpdateUserInfo();

  useEffect(() => {
    if (isSuccess) {
      closeModal();
      toast.success("정보가 수정되었습니다.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const onSubmit = async (data: UserInfoFormValues) => {
    mutate(data);
  };

  return (
    <>
      {/* 정보수정 모달 */}
      {edit && (
        <Modal isOpen={edit} onClose={closeModal}>
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

      {/* 유저정보 */}

      {/* 패칭 중일 때 */}
      {isFetching && <UserInfoFallback />}

      {/* 패칭이 끝난 후 데이터가 존재 했을 때 */}
      {!isFetching && userInfo && (
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 relative">
          <UserInfoContent
            name={userInfo.name || ""}
            introduce={userInfo.introduce || ""}
            waringCnt={userInfo.waringCnt || 0}
            stacks={filterItemsByIds(userInfo.stacks, STACK_LIST) || []}
          />

          <button
            onClick={openModal}
            className="w-full md:w-auto md:absolute right-4 bottom-4 bg-primary text-sm text-white py-2 px-4 rounded-lg hover:bg-black/90 transition-colors disabled:bg-black/90"
          >
            수정하기
          </button>
        </div>
      )}
    </>
  );
};

export default UserInfoSection;