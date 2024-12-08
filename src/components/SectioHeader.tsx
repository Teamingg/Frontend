import React from "react";
import Link from "next/link";

type sectioHeaderProps = {
  title: string;
};

const SectioHeader = ({ title }: sectioHeaderProps) => {
  return (
    <header className="px-5 py-3 mb-4 flex justify-between items-center bg-blue-500 rounded-2xl text-white">
      <h3>{title}</h3>
      <div>
        <Link href="/">전체보기</Link>
      </div>
    </header>
  );
};

export default SectioHeader;
