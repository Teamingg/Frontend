"use client";
import { useState, useEffect, memo, useMemo } from "react";
import NavLink from "@/components/NavLink";

const TeamHeader = ({ navigation }) => {
  const [isFixed, setFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setFixed(true);
      } else {
        setFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = useMemo(
    () =>
      navigation.map((path, index) => (
        <li key={index} className="w-full text-center md:text-left">
          <NavLink
            href={path.path}
            activeClassName={
              isFixed
                ? "border-none rounded-t-lg"
                : "text-primary md:border-none md:bg-primary md:text-white md:rounded-t-lg"
            }
            className={`text-center text-sm md:text-lg block w-full py-2 md:p-4 transition-all ${
              isFixed ? "bg-primary text-white" : "text-[rgba(0,0,0,0.5)]"
            }`}
          >
            {path.label}
          </NavLink>
        </li>
      )),
    [navigation, isFixed]
  );

  return (
    <ul
      className={`w-full border-b border-b-primary flex transition-all duration-200 text-sm md:text-base ${
        isFixed
          ? "fixed top-[58px]  md:top-[75px] left-0 w-full bg-primary text-white flex-start py-2 px-6 shadow-md"
          : "justify-around"
      }`}
    >
      {navItems}
    </ul>
  );
};

export default memo(TeamHeader);
