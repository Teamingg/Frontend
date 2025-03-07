'use client';
import React from 'react';
import {FaSearch, FaUserPlus} from "react-icons/fa";
import {MemberCard} from "@/components/Team";
import {useQueries, useQuery} from "@tanstack/react-query";
import {useParams} from "next/navigation";
import {getProjectPost} from "@/service/api/post";
import {getProjectMembers, getTeamMembers} from "@/service/api/team";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

const Page = () => {
  const {type, id} = useParams();
  const [mentoringMembers, memberStatus, projectMembers] = useQueries({
    queries: [
      {
        queryKey: ["mentoringMember", id],
        queryFn: () => getTeamMembers(type as string, id as string),
        enabled: type === 'mentoring',
      },
      {
        queryKey: ["projectMemberStatus", id],
        queryFn: () => getTeamMembers(type as string, id as string),
        enabled: type === 'project',
      },
      {
        queryKey: ["projectMember", id],
        queryFn: () => getProjectMembers(id as string),
        enabled: type === 'project',
      }
    ]
  });
  
  const queries = [projectMembers, memberStatus, mentoringMembers]
  const isLoading = queries.some(query => query.isLoading);
  const error = queries.find(query => query.error)?.error;
  const projectStatus = memberStatus.data;
  const members = type === 'project' ? projectMembers.data : mentoringMembers.data;
  
  // 로딩 상태 처리
  if (isLoading) return <LoadingSpinner/>
  
  // 에러 상태 처리
  if (error) {
    return <p className="text-center text-red-500">데이터를 불러오는 중 오류가 발생했습니다.</p>;
  }
  
  // 데이터가 없을 경우 처리
  if (!members || !projectStatus) {
    return <p className="text-center text-gray-500">해당 정보를 찾을 수 없습니다.</p>;
  }
  console.log('멤버 페이지 접근')
  console.log(members)
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">멤버 관리</h1>
        {/*<button className="px-4 py-2 bg-primary text-white rounded-lg flex items-center">
            <FaUserPlus className="mr-2" /> 멤버 초대
          </button>*/}
      </div>
      <div className="flex mb-6">
        <div
          className="w-full flex items-center bg-white border border-gray-200 rounded-lg px-4 py-2">
          <FaSearch className="text-gray-500"/>
          <input type="text" placeholder="이름 또는 이메일로 검색"
                 className="ml-2 w-full outline-none text-sm"/>
        </div>
        
        <div className="ml-4">
          <select
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:outline-none">
            <option value="전체">전체</option>
            <option value="멘토">멘토</option>
            <option value="멘티">멘티</option>
          </select>
        </div>
      </div>
      {/* Todo 멤버 초대 기능 */}
      {/* <InvitationList invitations={invitations} />*/}
      
      <h2 className="text-lg font-semibold mb-4 mt-8">팀 멤버</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member, index: number) => (
          <MemberCard key={index} member={member}/>
        ))}
      </div>
      
      {memberStatus.data.map((item, index) => (
        item.role === 'OWNER' && (
          <React.Fragment key={index}>
            <h2 className="text-lg font-semibold mb-4 mt-8">멤버 관리</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member, index: number) => (
                <MemberCard key={index} member={member}/>
              ))}
            </div>
          </React.Fragment>
        )))}
    </>
  );
};

export default Page;