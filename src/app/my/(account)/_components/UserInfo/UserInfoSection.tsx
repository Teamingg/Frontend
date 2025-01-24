"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// types
import { UserInfoFormValues } from "@/components/user/UserInfoForm/UserInfoFormValues";

// hooks
import useUpdateUserInfo from "../../../../../hooks/user/useUpdateUserInfo";
import useGetUserInfo from "../../../../../hooks/user/useGetUserInfo";
import useModal from "@/hooks/useModal";

// _components
import UserInfoContent from "./UserInfoContent";
import EditUserForm from "../EditUserForm/EditUserForm";
import Modal from "@/components/common/Modal/Modal";

import { filterItemsByIds } from "@/utils/filterItemsByIds";

import STACK_LIST from "@/constant/stackList";
import UserInfoFallback from "../ui/UserInfoFallback";
import { useToast } from "@/hooks/useToast";

const UserInfoSection = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { modal: edit, openModal, closeModal } = useModal();

  const { userInfo, isError, isFetching } = useGetUserInfo();
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
      <section className="mb-4">
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <h2 className=" text-xl text-primary">회원정보</h2>
        </div>

        {/* 패칭 중일 때 */}
        {isFetching && <UserInfoFallback />}

        {/* 패칭이 끝난 후 데이터가 존재 했을 때 */}
        {!isError && !isFetching && userInfo && (
          <div className="bg-white rounded-lg shadow-sm p-6 relative">
            <UserInfoContent
              name={userInfo.name || ""}
              introduce={userInfo.introduce || ""}
              waringCnt={userInfo.waringCnt || 0}
              stacks={filterItemsByIds(userInfo.stacks, STACK_LIST) || []}
            />

            <button
              onClick={openModal}
              className="absolute right-4 bottom-4 bg-primary text-sm text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors disabled:bg-opacity-90"
            >
              수정하기
            </button>
          </div>
        )}

        {/* 유저 정보를 불러오지 못했을 때 */}
        {isError && (
          <div className="bg-white rounded-lg shadow-sm p-6 relative">
            <p className="mb-2 text-center">
              정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
            </p>
            <button
              onClick={() => router.replace("/")}
              className="w-full py-2 bg-primary text-white rounded-lg"
            >
              처음으로 돌아가기
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default UserInfoSection;