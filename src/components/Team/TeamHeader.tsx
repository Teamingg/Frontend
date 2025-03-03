import React from 'react';
import NavLink from "@/components/NavLink";

const TeamHeader = ({navigation}) => {
  return (
      <ul className="w-2/3 border-b-2 border-b-primary flex justify-between text-sm md:text-base">
        {navigation.map((path, index) => (
            <li key={index} className="w-full text-center md:text-left">
              <NavLink
                  href={path.path}
                  activeClassName="text-primary border-b-2 border-b-primary md:border-none md:bg-primary md:text-white md:rounded-t-lg"
                  className="text-center text-sm md:text-lg block w-full py-2 md:p-4 text-[rgba(0,0,0,0.5)] transition-all">
                {path.label}
              </NavLink>
            </li>
        ))}
      </ul>
  );
};

export default TeamHeader;