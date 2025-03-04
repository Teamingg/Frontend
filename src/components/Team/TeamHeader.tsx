'use client';
import {useState, useEffect, memo, useMemo} from 'react';
import NavLink from "@/components/NavLink";

const TeamHeader = ({navigation}) => {
  const [isFixed, setFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setFixed(true);
      } else {
        setFixed(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = useMemo(() => (
    navigation.map((path, index) => (
      <li key={index} className="w-full text-center md:text-left">
        <NavLink
          href={path.path}
          activeClassName={isFixed
            ? "border-none rounded-t-lg"
            : "text-primary border-b-2 border-b-primary md:border-none md:bg-primary md:text-white md:rounded-t-lg"}
          className={`text-center text-sm md:text-lg block w-full py-2 md:p-4 transition-all ${isFixed ? "bg-primary text-white" : "text-[rgba(0,0,0,0.5)]"}`}>
          {path.label}
        </NavLink>
      </li>
    ))
  ), [navigation, isFixed]);
  
  return (
    <ul className={`w-2/3 border-b-2 border-b-primary flex transition-all duration-300 text-sm md:text-base ${isFixed ? "fixed top-[72px] left-0 w-full bg-primary text-white flex-start py-2 px-6 shadow-md" : "justify-between"}`}>
      {navItems}
    </ul>
  );
};

export default memo(TeamHeader);