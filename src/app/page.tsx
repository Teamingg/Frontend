"use client";

import "./globals.css";

import TeamProjectNavigation from "@/components/layout/Layout/Header/GlobalNavigation";
import SectionHeader from "@/components/layout/Main/CatrgoryHeader";
import SlugItem from "@/common/SlugItem";

export default function Home() {
  // const router = useRouter();

  const OnClick = () => {
    //  router.push("/login");
  };

  return (
    // tailwindcss test
    <>
      <TeamProjectNavigation />

      <section className="flex flex-col gap-8 pb-8">
        {/* team project */}
        <div className="p-8 rounded-xl bg-[#f5f5f5]">
          <SectionHeader title="팀 프로젝트" />
          <div className="grid grid-cols-2 gap-5">
            <SlugItem />
            <SlugItem />
            <SlugItem />
            <SlugItem />
          </div>
        </div>

        {/* mentoring */}
        <div className="p-8 rounded-xl bg-[#f5f5f5]">
          <SectionHeader title="멘토링" />
          <div className="grid grid-cols-2 gap-5">
            <SlugItem />
            <SlugItem />
            <SlugItem />
            <SlugItem />
          </div>
        </div>
      </section>
    </>
  );
}
