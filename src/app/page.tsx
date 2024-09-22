"use client"
import './globals.css'
import MainBody from "@/components/main/body";
import { useRouter } from 'next/navigation';
import {IoIosSearch, IoLogoJavascript} from "react-icons/io";

export default function Home() {

  const router = useRouter();

  const OnClick = () => {
    router.push("/login");
  }

  return (
    // tailwindcss test
    <div className="flex">
        {/* Search Component */}
        <form>
            <input type="text"/>
            <button><IoIosSearch /></button>
        </form>

        <div>
          <button onClick={OnClick}>Login</button>
        </div>

        {/* Carousel */}
        <div>
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>
        </div>

        {/* Item List Component */}
        <div>
            <div><IoLogoJavascript /></div>
            <div>name</div>
            <div>date</div>
        </div>
    </div>
  );
}
