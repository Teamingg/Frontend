import React from "react";
import { FaInfoCircle, FaRocket } from "react-icons/fa";
import ProgressBar from "../ProgressBar";
import TeamBasicInfo from "@/components/Team/TeamBasicInfo";
import Link from "next/link";

const ProjectInfo: React.FC<ProjectInfo> = ({ data }) => {
  return (
      <div className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold flex items-center mb-6">
          <FaInfoCircle className="mr-2 text-primary" /> 프로젝트 정보
        </h2>

        {/* 프로젝트 기본 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <TeamBasicInfo title='프로젝트 기간' data={`${data.startDate} ~ ${data.endDate}`}/>
            <TeamBasicInfo title='모집 구분' data={data.recruitCategories.join(", ")}/>
            {/* 기술 스택 */}
          </div>

          <div>
            <div className="mb-4">
              <h4 className="text-gray-500 text-xl pb-1">프로젝트 링크</h4>
              <Link href={data.link} className="text-primary font-medium flex items-center hover:underline">
                <FaRocket className="mr-2" /> 프로젝트 링크
              </Link>
            </div>
            <TeamBasicInfo title='팀원 수' data={`${data.memberCnt}명`}/>
          </div>
        </div>

        {/* 프로젝트 소개 */}
        <div className="mt-6">
          <h4 className="text-gray-500 text-sm">프로젝트 소개</h4>
          <p className="text-gray-700 mt-2 leading-relaxed">{data.contents}</p>
        </div>

        {/* 프로젝트 진행률 */}
        <ProgressBar percentage={40} />
      </div>
  );
};

export default ProjectInfo;