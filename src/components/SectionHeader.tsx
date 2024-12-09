"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SectionHeader = {
  title: string;

  // 전체보기를 눌렀을 때 이동할 path / 기본값은 '/'
  path?: "project" | "mentoring" | "/";
};

const SectionHeader = ({ title, path = "/" }: SectionHeader) => {
  const currentPath = usePathname();

  return (
    <header className="px-5 py-3 mb-4 flex justify-between items-center bg-primary rounded-2xl text-white">
      <h3>{title}</h3>
      {currentPath === "/" && (
        <div>
          <Link href={path}>전체보기</Link>
        </div>
      )}
    </header>
  );
};

export default SectionHeader;
