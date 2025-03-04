import React from 'react';
import {FaSearch, FaUserPlus} from "react-icons/fa";
import {MemberCard} from "@/components/Team";
const members = [
  {
    name: '김지훈',
    role: '팀장 / 멘토',
    email: 'jihoon.kim@example.com',
    field: '풀스택 개발',
    joinDate: '2025.01.15',
    skills: ['React', 'Node.js', 'TypeScript'],
    image: '/api/placeholder/120/120',
  },
  {
    name: '박소연',
    role: '멘티',
    email: 'soyeon.park@example.com',
    field: '프론트엔드 개발',
    joinDate: '2025.01.20',
    skills: ['HTML/CSS', 'JavaScript', 'React'],
    image: '/api/placeholder/120/120',
  },
];

const invitations = [
  { email: 'jongwoo.kim@example.com', date: '2025.03.01', role: '프론트엔드 개발자' },
  { email: 'minjae.lee@example.com', date: '2025.02.28', role: '백엔드 개발자' },
];
const Page = () => {
  return (
      <>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">멤버 관리</h1>
          {/*<button className="px-4 py-2 bg-primary text-white rounded-lg flex items-center">
            <FaUserPlus className="mr-2" /> 멤버 초대
          </button>*/}
        </div>
        <div className="flex mb-6">
          <div className="w-full flex items-center bg-white border border-gray-200 rounded-lg px-4 py-2">
            <FaSearch className="text-gray-500" />
            <input type="text" placeholder="이름 또는 이메일로 검색" className="ml-2 w-full outline-none text-sm" />
          </div>

          <div className="ml-4">
            <select
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            >
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
          {members.map((member, index) => (
              <MemberCard key={index} member={member} />
          ))}
        </div>
      </>
  );
};

export default Page;