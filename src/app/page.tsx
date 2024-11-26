"use client"
import './globals.css'
// import MainBody from "@/components/main/body";
import MainBody from "@/components/main/body";
// import { useRouter } from 'next/navigation';
import {IoIosSearch, IoLogoJavascript} from "react-icons/io";
import Search from "@/components/main/search";
import Carousel from "@/components/main/carousel";
import MainTabMenu from "@/components/main/mainTabMenu";
import TeamProjectNavigation from "@/components/TeamProjectNavigation";

export default function Home() {

  // const router = useRouter();

  const OnClick = () => {
  //  router.push("/login");
  }

  return (
    // tailwindcss test
    <div className="flex-col">
        <TeamProjectNavigation/>

        {/* Search Component */}
        <Search/>

        {/* Carousel (개발용 테두리선) */}
        <section className="w-11/12 h-32 m-auto my-5 border border-black">
            <Carousel/>
        </section>

        <div>
          <button onClick={OnClick}>Login</button>
        </div>

        <div>test</div>

        {/* Carousel */}
        <div>
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>
        </div>

        <MainTabMenu/>
    </div>
  );
}
