"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavLinkProps {
  href: string;
  className: string;
  activeClassName: string;
  children: React.ReactNode;
}

const NavLink = ({
  href,
  className,
  activeClassName,
  children,
}: NavLinkProps) => {
  const path = usePathname();
  const active = path === href;

  return (
    <Link href={href} className={active ? activeClassName : className}>
      {children}
    </Link>
  );
};

export default NavLink;
