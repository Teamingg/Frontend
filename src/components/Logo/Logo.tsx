'use client';
import React, {memo} from 'react';
import Link from "next/link";
import Image from "next/image";

const Logo = memo(() => {
  return (
    <h1 className="flex items-center gap-8">
      <Link href="/" className="block relative w-[120px] md:w-[140px] h-[35px] md:h-[40px]">
        <Image src="/newLogo.png" fill alt="로고" sizes="150px" priority/>
      </Link>
    </h1>
  );
});

Logo.displayName = "Logo";
export default Logo;