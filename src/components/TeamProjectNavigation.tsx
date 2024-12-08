import React from "react";
import Link from "next/link";

const TeamProjectNavigation = () => {
  return (
    <nav className="py-6 px-4 flex justify-between items-center ">
      <ul className="flex gap-5">
        <li>
          <Link href="/">전체</Link>
        </li>
        <li>
          <Link href="/">팀 프로젝트</Link>
        </li>
        <li>
          <Link href="/">멘토링</Link>
        </li>
      </ul>
      <ul className="flex gap-5">
        <li>
          <Link href="/">팀 생성하기</Link>
        </li>
        <li>
          <Link href="/">글 작성하기</Link>
        </li>
      </ul>
    </nav>
  );
};

export default TeamProjectNavigation;
