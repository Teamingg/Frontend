import React from 'react';
import {FaInfoCircle, FaRocket} from "react-icons/fa";
import TeamBasicInfo from "@/components/Team/TeamBasicInfo";
import Link from "next/link";
import useDataMap from "@/hooks/useDataMap";
import {RECRUITE_CATEGORY} from "@/constant/recruiteCategory";
import ProgressBar from "@/components/DataDisplay/ProgressBar";
import {getProgress} from "@/service/getProgress";

const MentoringInfo: React.FC<MentoringInfo> = ({ data }) => {
  const recuruite = useDataMap(RECRUITE_CATEGORY, 'value');
  const date = new Date().toISOString().split("T")[0];
  const percentage = parseFloat(getProgress(data.dto.startDate, data.dto.endDate).toFixed(2));
  return (
      <div className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold flex items-center mb-6">
          <FaInfoCircle className="mr-2 text-primary" /> 멘토링 정보
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <TeamBasicInfo title='프로젝트 시작일' data={data.dto.startDate}/>
            <TeamBasicInfo title='프로젝트 종료일' data={data.dto.endDate}/>
          </div>
          <div>
            <TeamBasicInfo title='모집 상태' data={data.dto.status}/>
            {/*<TeamBasicInfo title='멘토링 횟수' data={`${data.dto.mentoringCnt} 회`}/>*/}
            <div className="mb-4">
              <h4 className="text-gray-500 text-xl pb-1">팀 링크</h4>
              <Link href={data.dto.link} className="text-primary font-medium hover:underline flex items-center ">
                <FaRocket className="mr-2"/>멘토링 팀 링크
              </Link>
            </div>
          </div>
          <div className="w-full mb-4 col-span-2">
            <h4 className="text-gray-500 text-xl pb-1">모집 분야</h4>
            <ul className='w-full flex justify-start gap-5'>
              {data.dto.categories.map(index =>
                recuruite.get(index)).filter(Boolean).map(item => (
                <li key={item!.value} className="mt-2 w-full flex justify-start items-center">
                  <span>{item!.label}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* 멘토링 진행률 */}
          <div className="mt-6">
            <h4 className="text-gray-500 text-sm">멘토링 진행률 ({percentage}%)</h4>
            {date >= data.dto.startDate ? (
              <ProgressBar percentage={percentage} />
            ) : (
              <p>멘토링이 시작되지 않았습니다.</p>
            )}
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