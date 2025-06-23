"use client";

import { useState } from "react";

import Link from "next/link";

import { FaPlus } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";

import Modal from "../Modal/Modal";
import CloseButton from "./CloseButton";

const CreateTeamButton = () => {
  const [modal, setModal] = useState<boolean>(false);

  return (
    <>
      {modal && (
        <Modal isOpen={true} onClose={() => setModal(false)}>
          <div className="text-right">
            <CloseButton onClick={() => setModal(false)} />
          </div>
          <p className="mb-4 text-xl text-center">
            어떤 팀을 생성하시겠습니까?
          </p>
          <div className="text-base md:text-xl">
            <Link
              href="/form/create/project"
              className="bg-white py-4 block text-center border border-gray-200 rounded-md mb-4 hover:bg-gray-100 transition-colors md:w-[400px]"
            >
              프로젝트
            </Link>
            <Link
              href="/form/create/mentoring"
              className="bg-primary text-white py-4 block text-center rounded-md hover:bg-primary/80 transition-colors md:w-[400px]"
            >
              멘토링
            </Link>
          </div>
        </Modal>
      )}
      <button
        onClick={() => setModal(true)}
        className="bg-primary md:bg-transparent rounded-full md:rounded-none size-12 md:size-auto flex justify-center items-center md:gap-2 fixed md:static top-[92vh] right-8 cursor-pointer"
      >
        <FaPlus fill="#ffffff" size={24} className="md:hidden" />
        <CiCirclePlus size={28} className="hidden md:block" />
        <span className="hidden md:inline">팀 생성하기</span>
      </button>
    </>
  );
};

export default CreateTeamButton;
