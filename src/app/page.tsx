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

        {/* Carousel */}
        <Carousel/>

        {/* Item List Component */}
        <TeamCard/>
    </div>
  );
}
