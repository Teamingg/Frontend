'use client';
import React, {useEffect} from 'react';
import TeamHeader from "@/components/Team/TeamHeader";
import {useParams, useRouter} from "next/navigation";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import {useQuery} from "@tanstack/react-query";
import {
  getProjectInfo,
  getTeamInfo
} from "@/service/api/team/team";

const TeamContainer = ({
  children,
  navItems,
} : {
  children: React.ReactNode;
  navItems: {label: string; path: string}[];
}) => {
  const params = useParams();
  const router = useRouter();
  const { type, id } = params;
 
  const { data: mentoring, isLoading: mentoringLoading, error: mentoringErr } = useQuery({
    queryKey: ["MentoringTeam", id],
    queryFn: () => getTeamInfo(id as string),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱 유지
    enabled: type === 'mentoring',
  });
  
  const { data: project, isLoading: projectLoading, error: projectErr } = useQuery({
    queryKey: ["ProjectTeam", id],
    queryFn: () => getProjectInfo(id as string),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱 유지
    enabled: type === 'project',
  });
  
  useEffect(() => {
    if (!project || !mentoring) return;
    const isNotTeamMember = mentoring.role === "NoAuth" || project.userRole === "VISITOR";
    if (isNotTeamMember) router.replace(`/team/${type}/${id}/viewer`);
  }, [mentoring, project, router, type, id]);
  
  if (mentoringLoading || projectLoading) return <LoadingSpinner/>
  if (mentoringErr || projectErr) return <LoadingSpinner/>
  console.log('TeamContainer 컴포넌트 실행됨')
  console.log(mentoring);
  console.log(project);
  
  const dataRole = type === 'mentoring' ? mentoring.role : project.userRole;
  
  return (
    <div className='w-full min-h-[calc(100vh-72px-62px)] py-10 flex flex-col items-center max-w-sm md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto md:mx-auto'>
      {dataRole.role !== "NoAuth" && dataRole.userRole !== "VISITOR" && <TeamHeader navigation={navItems}/>}
      <section className="w-2/3 h-full min-h-full p-6 mx-auto">
        {children}
      </section>
    </div>
  );
};

export default TeamContainer;