'use client'
import React, { useState } from 'react';
import TeamCard from "@/components/main/teamCard";

const MainTabMenu = () => {
    const [activeTab, setActiveTab] = useState(0); // 클라이언트에서 탭 상태 관리
    const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];

    return (
        <div>
            {/* 탭 메뉴 */}
            <div className="w-9/12 h-10 m-auto flex justify-between items-center text-2xl">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 ${activeTab === index 
                            ? 'text-blue-500 border-b-2 border-blue-500' 
                            : 'text-gray-500'}`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* 탭에 따른 콘텐츠 */}
            <div className="my-5">
                {activeTab === 0 && (
                    <>
                        <TeamCard/>
                        <TeamCard/>
                    </>
                )}
                {activeTab === 1 && (
                    <>
                        <TeamCard/>
                        <TeamCard/>
                        <TeamCard/>
                    </>
                )}
                {activeTab === 2 && (
                    <>
                        <TeamCard/>
                        <TeamCard/>
                        <TeamCard/>
                        <TeamCard/>
                    </>
                )}
            </div>
        </div>
    );
};

export default MainTabMenu;
