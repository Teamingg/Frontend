"use client";
import React, { useEffect } from "react";

import { VscGithubProject } from "react-icons/vsc";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";

import { queryclient } from "@/lib/getQueryClient";

import { UserInfoFormValues } from "@/types/UserInfoFormValues";

import useModal from "@/hooks/useModal";
import useUpdateUserInfo from "@/hooks/user/useUpdateUserInfo";
import { useGetMyInfo, useGetMyTeam } from "@/hooks/queries/my";
import { useToast } from "@/hooks/useToast";

import Modal from "@/components/Modal/Modal";
import EditUserForm from "@/components/My/EditUserForm";
import DashBoardFallback from "./_components/DashBoardFallback";

const Page = () => {
  const { toast } = useToast();

  const { modal: edit, openModal, closeModal } = useModal();

  const { mutate, isSuccess } = useUpdateUserInfo();

  const { userInfo, isFetching } = useGetMyInfo();
  const { data: mentoring } = useGetMyTeam("mentoring");
  const { data: projects } = useGetMyTeam("project");

  useEffect(() => {
    if (isSuccess) {
      queryclient.invalidateQueries({ queryKey: ["my", "info"] });
      closeModal();
      toast.success("정보가 수정되었습니다.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const onSubmit = async (data: UserInfoFormValues) => {
    mutate(data);
  };

  if (isFetching) return <DashBoardFallback />;

  const mentee = mentoring?.filter((item) => item.role === "LEADER");
  return (
    <>
      <article className="w-full bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">내 프로필 정보</h2>
          <button
            onClick={openModal}
            className="text-blue-500 text-sm hover:underline cursor-pointer"
          >
            수정하기
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-gray-500 text-sm">이름 (닉네임)</p>
            <p className="font-medium">{userInfo.name}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">이메일</p>
            <p className="font-medium">{userInfo.email}</p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-gray-500 text-sm">소개</p>
          <p className="font-medium text-gray-700 leading-relaxed">
            {userInfo.introduce}
          </p>
        </div>
      </article>

      <article className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 진행 중인 프로젝트 카드 */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
          <VscGithubProject className="w-12 h-12 text-blue-500 bg-blue-100 p-3 rounded-full" />
          <h4 className="text-xl font-bold mt-3">{projects?.length}</h4>
          <p className="text-gray-600 text-sm">진행 중인 프로젝트</p>
        </div>

        {/* 멘토링 세션 카드 */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
          <FaChalkboardTeacher className="w-12 h-12 text-green-500 text-4xl bg-green-100 p-3 rounded-full" />
          <h4 className="text-xl font-bold mt-3">{mentoring?.length}</h4>
          <p className="text-gray-600 text-sm">총 진행한 멘토링 세션</p>
        </div>

        {/* 멘티 카드 */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
          <PiStudentBold className="w-12 h-12 text-yellow-500 bg-yellow-100 p-3 rounded-full" />
          <h4 className="text-xl font-bold mt-3">{mentee?.length}</h4>
          <p className="text-gray-600 text-sm">현재 멘토링 중</p>
        </div>
      </article>

      {/*<article>
            <h3 className={contentTitle}>최근 활동</h3>
          </article>*/}

      {/* 정보수정 모달 */}
      {edit && (
        <Modal isOpen={edit} onClose={closeModal}>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-primary text-center text-2xl">회원정보 수정</h1>
            <button
              onClick={closeModal}
              className="px-4 py-1 cursor-pointer rounded-md  transition-colors hover:text-black/80"
            >
              닫기
            </button>
          </div>
          <EditUserForm
            onSubmit={onSubmit}
            userInfo={{
              name: userInfo!.name,
              introduce: userInfo!.introduce,
              stackIds: userInfo!.stacks,
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default Page;
