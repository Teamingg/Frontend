"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type CategoryHeader = {
  title: string;

  // 전체보기를 눌렀을 때 이동할 path / 기본값은 '/'
  path?: "/project" | "/mentoring" | "/";
};

const CategoryHeader = ({ title, path = "/" }: CategoryHeader) => {
  const currentPath = usePathname();

  return (
    <header className="hidden md:flex mt-5 p-3 justify-between items-center bg-primary rounded-2xl text-[#333]">
      <h3 className='text-xl'>{title}</h3>
      {currentPath === "/" && (
        <div>
          <Link href={path}>전체보기</Link>
        </div>
      )}
    </header>
  );
};

export default CategoryHeader;