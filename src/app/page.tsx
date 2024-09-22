import './globals.css'
import MainBody from "@/app/components/main/body";
import {IoIosSearch, IoLogoJavascript} from "react-icons/io";

export default function Home() {
  return (
    // tailwindcss test
    <div className="flex">
        {/* Search Component */}
        <form>
            <input type="text"/>
            <button><IoIosSearch /></button>
        </form>

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
