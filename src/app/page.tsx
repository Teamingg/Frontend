import './globals.css'
import MainBody from "@/app/components/main/body";
import {IoIosSearch, IoLogoJavascript} from "react-icons/io";

export default function Home() {
  return (
    // tailwindcss test
    <div className="flex-col">
        {/* Search Component */}
        <div className="w-full h-14">
            <form className="w-[650px] h-full m-auto p-3 border rounded-3xl flex">
                <input className="w-[600px] h-full" type="text"/>
                <button className="w-[50px] h-full text-2xl flex justify-center items-center" type="submit">
                    <IoIosSearch/>
                </button>
            </form>
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
