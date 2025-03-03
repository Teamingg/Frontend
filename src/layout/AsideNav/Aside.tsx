'use client';
import React from 'react';
import NavLink from "@/components/NavLink";

const Aside = ({
    navigation,
} : {
  navigation: {
    label: string,
    path: string
  }[]
}) => {
  return (
      <div className='w-1/4 p-8 mb-8 bg-white rounded-xl'>
        <aside className='h-full pt-3 '>
          <ul className="w-full flex justify-around md:block text-sm md:text-base">
            {navigation.map((path, index) => (
                <li key={index} className="w-full text-center md:text-left">
                  <NavLink
                      href={path.path}
                      activeClassName="text-primary border-b-2 border-b-primary md:border-none md:bg-primary md:text-white md:rounded-lg"
                      className="text-sm md:text-lg block w-full py-2 md:p-4 text-[rgba(0,0,0,0.5)] transition-all">
                    {path.label}
                  </NavLink>
                </li>
            ))}
          </ul>
        </aside>
      </div>
  );
};

export default Aside;