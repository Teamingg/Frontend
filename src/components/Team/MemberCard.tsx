import React from "react";
import { FaEnvelope, FaUserTag, FaTrash, FaUser } from "react-icons/fa";

const MemberCard = ({ member }) => {
  return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition">
        {/* 프로필 헤더 */}
        <div className="flex items-center border-b pb-4 mb-4">
          {/* 프로필 이미지 */}
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-primary overflow-hidden">
            <FaUser className="text-gray-500" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold">{member.name}</h3>
            <p className="text-sm text-gray-500 flex items-center">
              <FaUserTag className="mr-1 text-gray-400" /> {member.role}
            </p>
          </div>
        </div>

        {/* 상세 정보 */}
        <ul className="text-sm text-gray-700 space-y-2">
          <li className="flex items-center">
            <FaEnvelope className="text-gray-400 mr-2" />
            <span>{member.email}</span>
          </li>
          <li className="flex items-center">
            <FaUserTag className="text-gray-400 mr-2" />
            <span>분야: {member.field}</span>
          </li>
          <li className="flex items-center">
            <FaUser className="text-gray-400 mr-2" />
            <span>참여일: {member.joinDate}</span>
          </li>
        </ul>

        {/* 스킬 태그 */}
        <div className="mt-4 flex flex-wrap gap-2">
          {member.skills.map((skill, index) => (
              <span
                  key={index}
                  className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-lg font-medium"
              >
            {skill}
          </span>
          ))}
        </div>

        {/* 버튼 영역 */}
        <div className="mt-5 flex justify-between text-sm font-medium">
          <button className="text-primary hover:underline">프로필</button>
          <button className="text-red-500 hover:text-red-700 flex items-center">
            <FaTrash className="mr-1" />
            추방
          </button>
        </div>
      </div>
  );
};

export default MemberCard;