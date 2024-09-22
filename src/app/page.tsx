import './globals.css'
// import MainBody from "@/components/main/body";
import {IoIosSearch, IoLogoJavascript} from "react-icons/io";
import Search from "@/components/main/search";
import Carousel from "@/components/main/carousel";
import TeamCard from "@/components/main/teamCard";

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

        {/* Item List Component */}
        <TeamCard/>
        <TeamCard/>
        <TeamCard/>
        <TeamCard/>
        <TeamCard/>
        <TeamCard/>
        <TeamCard/>
        <TeamCard/>
        <TeamCard/>
    </div>
  );
}
