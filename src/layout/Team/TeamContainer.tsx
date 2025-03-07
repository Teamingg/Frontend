'use client';
import React, {useEffect} from 'react';
import TeamHeader from "@/components/Team/TeamHeader";
import {useRouter} from "next/navigation";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

const TeamContainer = ({
  children,
  navItems,
  team,
  type,
  id,
} : {
  children: React.ReactNode;
  navItems: {label: string; path: string}[];
  team: any;
  type: string;
  id: string;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  
  useEffect(() => {
    if (!team) {
      setIsLoading(true);
      return;
    }
    
    const isTeamMember = team.role === "NoAuth" || team.userRole === "VISITOR"
    if (!isTeamMember) router.replace(`/team/${type}/${id}/viewer`);
    else setIsLoading(false);
  }, [team, router, type, id])
  if (isLoading) return <LoadingSpinner/>
  console.log('TeamContainer 컴포넌트 실행됨')
  
  return (
    <div className='w-full min-h-[calc(100vh-72px-62px)] py-10 flex flex-col items-center max-w-sm md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto md:mx-auto'>
      {team.role === 'NoAuth' || team.userRole === 'VISITOR' && <TeamHeader navigation={navItems}/>}
      <section className="w-2/3 h-full min-h-full p-6 mx-auto">
        {children}
      </section>
    </div>
  );
};

export default TeamContainer;