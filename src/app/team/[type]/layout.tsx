import {ReactNode} from "react";
import Aside from "@/layout/AsideNav/Aside";

const Layout = async ({
  children,
  params,
} : {
  children: ReactNode,
  params: Promise<{ type: string; id: string; }>;
}) => {
  const { type, id } = await params;
  const navItems = [
    {label: '팀 소개', path: `/team/${type}/${id}/info`},
    {label: '멤버', path: `/team/${type}/${id}/member`},
    {label: '게시글', path: `/team/${type}/${id}/post`},
  ];

  return (
      <div className='w-full min-h-[calc(100vh-72px-62px)] py-10 flex justify-center max-w-sm md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto md:mx-auto'>
        <Aside navigation={navItems}/>
        <section className="w-2/3 h-full min-h-full p-6">
          {children}
        </section>
      </div>
  );
};

export default Layout;