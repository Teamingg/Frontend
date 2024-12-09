import React from "react";
import Link from "next/link";
import NavLink from "@/shared/ui/NavLink";

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

const TeamProjectNavigation = () => {
  return (
    <nav className="py-6 flex justify-between items-center ">
      <ul className="flex gap-5">
        {NavPath.map((path) => (
          <li key={path.path}>
            <NavLink
              href={path.path}
              className="text-black hover:text-primary transition-colors"
              activeClassName="text-primary"
            >
              {path.name}
            </NavLink>
          </li>
        ))}
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
