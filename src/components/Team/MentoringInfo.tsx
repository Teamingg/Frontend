import React from 'react';
import {FaInfoCircle} from "react-icons/fa";
import TeamBasicInfo from "@/components/Team/TeamBasicInfo";
import Link from "next/link";

const MentoringInfo: React.FC<MentoringInfo> = ({ data }) => {
  return (
      <div className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold flex items-center mb-6">
          <FaInfoCircle className="mr-2 text-primary" /> 멘토링 정보
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <TeamBasicInfo title='멘토링 기간' data={`${data.dto.startDate} ~ ${data.dto.endDate}`}/>
            <TeamBasicInfo title='멘토링 카테고리' data={data.dto.categories.join(", ")}/>
            <TeamBasicInfo title='멘토링 카테고리' data={`${data.dto.mentoringCnt} 회`}/>
          </div>

          <div>
            <TeamBasicInfo title='모집 상태' data={data.dto.status}/>
            <div className="mb-4">
              <h4 className="text-gray-500 text-xl pb-1">팀 링크</h4>
              <Link href={data.dto.link} className="text-primary font-medium hover:underline">
                멘토링 페이지 이동
              </Link>
            </div>
          </div>
        </div>

        {/* 참여한 사용자 리스트 */}
        {/*<div className="mt-6">
          <h4 className="text-gray-500 text-2xl">참여자 목록</h4>
          <ul className="list-disc pl-6 mt-2">
            {data.userParticipations.map((user, index) => (
                <li key={index} className="text-gray-700">
                  {user.username} ({user.status})
                </li>
            ))}
          </ul>
        </div>*/}
      </div>
  );
};

export default MentoringInfo;