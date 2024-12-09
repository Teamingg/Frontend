"use client"
import './globals.css'
import {IoIosSearch, IoLogoJavascript} from "react-icons/io";
import Search from "@/components/main/search";
import Carousel from "@/components/main/carousel";
import MainTabMenu from "@/components/main/mainTabMenu";
import TeamProjectNavigation from "@/components/TeamProjectNavigation";
import SlugItem from "@/components/SlugItem";
import SectioHeader from "@/components/SectioHeader";

export default function Home() {


    // const router = useRouter();

    const OnClick = () => {
        //  router.push("/login");
    }

    return (
        // tailwindcss test
        <>
            <TeamProjectNavigation/>

            <div>
                {/* team project */}
                <div>
                    <SectioHeader title="팀 프로젝트"/>
                    <div className="p-5 grid grid-cols-2 gap-5">
                        <SlugItem/>
                        <SlugItem/>
                        <SlugItem/>
                        <SlugItem/>
                    </div>
                </div>

                {/* mentoring */}
                <div className="mt-20">
                    <SectioHeader title="멘토링"/>
                    <div className="p-5 grid grid-cols-2 gap-5">
                        <SlugItem/>
                        <SlugItem/>
                        <SlugItem/>
                        <SlugItem/>
                    </div>
                </div>
            </div>
        </>
    );

}
