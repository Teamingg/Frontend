"use client";

import React, { useState } from "react";
import NavLink from "@/components/common/NavLink";
import Modal from "@/components/common/Modal/Modal";
import Link from "next/link";
import CloseButton from "@/components/common/Button/CloseButton";

const NavPath = [
  {
    name: "전체",
    path: "/",
  },
  {
    name: "팀 프로젝트",
    path: "/project",
  },
  {
    name: "멘토링",
    path: "/mentoring",
  },
];

const GlobalNavigation = () => {
  const [modal, setModal] = useState<boolean>(false);

  const activeClassName = "text-primary";
  const className =
    "text-black transition-colors hover:text-primary hover:text-opacity-80";
  return (
    <>
      {modal && (
        <Modal isOpen={true} onClose={() => setModal(false)}>
          <div className="text-right">
            <CloseButton onClick={() => setModal(false)} size={8} />
          </div>
          <p className="mb-4 text-xl text-center">
            어떤 팀을 생성하시겠습니까?
          </p>
          <div>
            <Link
              href="/form/create/project"
              className="bg-white py-4 block text-center border rounded-md mb-4 w-[500px] text-xl hover:bg-gray-50 transition-colors"
            >
              프로젝트
            </Link>
            <Link
              href="/form/create/mentoring"
              className="bg-primary text-white py-4 block text-center rounded-md w-[500px] text-xl hover:bg-opacity-80 transition-colors"
            >
              멘토링
            </Link>
          </div>
        </Modal>
      )}

      <nav className="h-[58px] flex justify-between items-center mb-4">
        <ul className="flex gap-5">
          {NavPath.map((path) => (
            <li key={path.path}>
              <NavLink
                activeClassName={activeClassName}
                className={className}
                href={path.path}
              >
                {path.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setModal(true)}
          className="bg-primary text-white py-2 px-3 rounded-md hover:bg-opacity-90 transition-colors"
        >
          팀 생성하기
        </button>
      </nav>
    </>
  );
};

export default GlobalNavigation;
