'use client';
import React from "react";
import {FaInfoCircle, FaRocket} from "react-icons/fa";
import TeamBasicInfo from "@/components/Team/TeamBasicInfo";
import Link from "next/link";
import STACK_LIST from "@/constant/stackList";
import {RECRUITE_CATEGORY} from "@/constant/recruiteCategory";
import useDataMap from "@/hooks/useDataMap";
import {getProgress} from "@/service/getProgress";
import ProgressBar from "@/components/DataDisplay/ProgressBar";

const ProjectInfo: React.FC<ProjectInfo> = ({data}) => {
  const tecStack = useDataMap(STACK_LIST, 'value');
  const recuruite = useDataMap(RECRUITE_CATEGORY, 'value');
  const date = new Date().toISOString().split("T")[0];
  const percentage = parseFloat(getProgress(data.startDate, data.endDate).toFixed(2));
  
  const startDate = "2025-03-01";
  const endDate = "2025-03-10";
  const testProgress = parseFloat(getProgress(startDate, endDate).toFixed(2));
  return (
    <div className="bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-semibold flex items-center mb-6">
        <FaInfoCircle className="mr-2 text-primary"/> 프로젝트 정보
      </h2>
      
      {/* 프로젝트 기본 정보 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <TeamBasicInfo title='프로젝트 시작일' data={data.startDate}/>
          <TeamBasicInfo title='프로젝트 종료일' data={data.endDate}/>
        </div>
        
        <div>
          <div className="mb-4">
            <h4 className="text-gray-500 text-xl pb-1">프로젝트 링크</h4>
            <Link href={data.link}
                  className="text-primary font-medium flex items-center hover:underline">
              <FaRocket className="mr-2"/> 프로젝트 링크
            </Link>
          </div>
          <TeamBasicInfo title='팀원 수' data={`${data.memberCnt}명`}/>
        </div>
        
        <div className="w-full mb-4 col-span-2">
          <h4 className="text-gray-500 text-xl pb-1">모집 구분</h4>
          <ul className='w-full flex justify-start gap-5'>
            {data.recruitCategories.map(index =>
              recuruite.get(index)).filter(Boolean).map(item => (
              <li key={item!.value} className="mt-2 w-full flex justify-start items-center">
                <span>{item!.label}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* 기술 스택 */}
        <div className="mb-4 col-span-2">
          <h4 className="text-gray-500 text-xl pb-1">기술 스택</h4>
          <ul className='w-full flex justify-start gap-5'>
            {data.stacks.map(index => tecStack.get(index)).filter(Boolean).map(stack => (
              <li key={stack!.value}
                  className="mt-2 w-12 h-12 flex flex-col justify-center items-center">
                {stack!.icon}
                <span>{stack!.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* 프로젝트 진행률 */}
      <div className="mt-6">
        <h4 className="text-gray-500 text-sm">프로젝트 진행률 ({percentage}%)</h4>
        {date >= data.startDate ? (
          <ProgressBar percentage={percentage} />
        ) : (
          <p>프로젝트가 시작되지 않았습니다.</p>
        )}
      </div>
      {/* 프로젝트 소개 */}
      <div className="mt-6">
        <h4 className="text-gray-500 text-sm">프로젝트 소개</h4>
        <p className="text-gray-700 mt-2 leading-relaxed">{data.contents}</p>
      </div>
    </div>
  );
};

export default ProjectInfo;