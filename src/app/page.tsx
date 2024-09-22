import './globals.css'
// import MainBody from "@/components/main/body";
import {IoIosSearch, IoLogoJavascript} from "react-icons/io";
import Search from "@/components/main/search";
import Carousel from "@/components/main/carousel";
import MainTabMenu from "@/components/main/mainTabMenu";

export default function Home() {
  return (
    // tailwindcss test
    <div className="flex-col">
        {/* Search Component */}
        <Search/>

        {/* Carousel (개발용 테두리선) */}
        <section className="w-11/12 h-32 m-auto my-5 border border-black">
            <Carousel/>
        </section>

        <MainTabMenu/>
    </div>
  );
}
