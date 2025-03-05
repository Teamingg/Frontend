'use client';
import React from "react";
import { FaEnvelope, FaUserTag, FaTrash, FaUser } from "react-icons/fa";
import {useQuery} from "@tanstack/react-query";
import {getUserInfoById} from "@/service/api/user";

const MemberCard = ({ member }) => {
  console.log(member.userId)
  const {data} = useQuery({
    queryKey: ['user', member.userId],
    queryFn: () => getUserInfoById(member.userId),
  });
  console.log(data);
  
  const role = member.role === 'OWNER' ? '팀장' : '팀원';
  return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition">
        {/* 프로필 헤더 */}
        <div className="flex items-center border-b pb-4 mb-4">
          {/* 프로필 이미지 */}
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-primary overflow-hidden">
            <FaUser className="text-gray-500" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold">{member.userName}</h3>
            <p className="text-sm text-gray-500 flex items-center">
              <FaUserTag className="mr-1 text-gray-400" /> {role}
            </p>
          </div>
        </div>

        {/* 상세 정보 */}
        <ul className="text-sm text-gray-700 space-y-2">
          <li className="flex items-center">
            <FaEnvelope className="text-gray-400 mr-2" />
            <span>{data.email}</span>
          </li>
          {/*<li className="flex items-center">
            <FaUserTag className="text-gray-400 mr-2" />
            <span>분야: {data.field}</span>
          </li>
          <li className="flex items-center">
            <FaUser className="text-gray-400 mr-2" />
            <span>참여일: {member.joinDate}</span>
          </li>*/}
        </ul>

        {/* 스킬 태그 */}
        {/*<div className="mt-4 flex flex-wrap gap-2">
          {data.stacks.map((skill, index) => (
              <span
                  key={index}
                  className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-lg font-medium"
              >
            {skill}
          </span>
          ))}
        </div>*/}

        {/* 버튼 영역 */}
        <div className="mt-5 flex justify-between text-sm font-medium">
          <button className="text-primary hover:underline">프로필</button>
          {member.role === 'OWNER' && (
            <button className="text-red-500 hover:text-red-700 flex items-center">
              <FaTrash className="mr-1" />
              추방
            </button>
          )}
        </div>
      </div>
  );
};

export default MemberCard;