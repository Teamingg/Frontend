'use client';
import React, {useEffect} from 'react';
import TeamHeader from "@/components/Team/TeamHeader";
import {useRouter} from "next/navigation";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import {useQuery} from "@tanstack/react-query";
import {
  getProjectInfo,
  getTeamInfo
} from "@/service/api/team/team";

const TeamContainer = ({
  children,
  navItems,
  type,
  id,
} : {
  children: React.ReactNode;
  navItems: {label: string; path: string}[];
  type: string;
  id: string;
}) => {
  const router = useRouter();
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
  
  const isLoading = mentoringLoading || projectLoading;
  const error = mentoringErr || projectErr;
  
  useEffect(() => {
    // 데이터가 아직 로드되지 않았다면 실행하지 않음
    if (isLoading) return;
    
    // 데이터가 로드된 후에도 undefined일 경우 처리
    if (!mentoring && !project) {
      router.replace(`/team/${type}/${id}/viewer`);
      return;
    }
    
    const role = type === "mentoring" ? mentoring?.role : project?.role;
    const userRole = type === "mentoring" ? mentoring?.userRole : project?.userRole;
    const isNotTeamMember = role === "NoAuth" || userRole === "VISITOR";
    if (isNotTeamMember) router.replace(`/team/${type}/${id}/viewer`);
  }, [mentoring, project, router, type, id, isLoading]);
  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <LoadingSpinner />;
  
  const role = type === "mentoring" ? mentoring?.role : project?.role;
  const userRole = type === "mentoring" ? mentoring?.userRole : project?.userRole;
  console.log('TeamContainer 컴포넌트 실행됨')
  console.log(mentoring);
  console.log(project);
  
  
  return (
    <div className='w-full min-h-[calc(100vh-72px-62px)] py-10 flex flex-col items-center max-w-sm md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto md:mx-auto'>
      {role !== "NoAuth" && userRole !== "VISITOR" && <TeamHeader navigation={navItems}/>}
      <section className="w-2/3 h-full min-h-full p-6 mx-auto">
        {children}
      </section>
    </div>
  );
};

export default TeamContainer;