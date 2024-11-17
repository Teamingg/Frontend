"use client"
import './globals.css'
import {IoIosSearch, IoLogoJavascript} from "react-icons/io";
import Search from "@/components/main/search";
import Carousel from "@/components/main/carousel";
import MainTabMenu from "@/components/main/mainTabMenu";

export default function Home() {

  const router = useRouter();

  const OnClick = () => {
    router.push("/login");
  }

  return (
    // tailwindcss test
    <div className="flex-col">
        {/* Search Component */}
        <Search/>
        <MainTabMenu/>
    </div>
  );
}
