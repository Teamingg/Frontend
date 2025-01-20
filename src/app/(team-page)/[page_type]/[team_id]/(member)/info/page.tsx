"use client";
import React from 'react';
import {useQueryClient} from "@tanstack/react-query";
import TeamPageInfo from "@/app/(team-page)/[page_type]/[team_id]/(member)/info/_components/TeamPageInfo";
import {useParams} from "next/navigation";
import {MentoringInfo, ProjectInfo} from "@/app/(team-page)/[page_type]/[team_id]/(member)/_type/teamPageInfo";

export interface TeamInfoData {
  label: string;
  infoData?: string | number;
  stacks?: string[] | undefined;
}

/**  타입 가드: data 가 MentoringInfo 인지 확인 */
const isMentoringInfo = (data: unknown): data is MentoringInfo => {
  return (
      typeof data === "object" &&
      data !== null &&
      "dto" in data &&
      typeof (data as MentoringInfo).dto === "object"
  );
};

const Page = <T extends ProjectInfo | MentoringInfo> () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<T>(["teamInfo", params.page_type, params.team_id]);

  if (!data) return <div>No Data Available</div>;

  /* MentoringInfo 인지 체크 후 분기 처리 */
  const teamInfoData: TeamInfoData[] = isMentoringInfo(data)
      ? [
        { label: "시작일자", infoData: data.dto.startDate },
        { label: "종료일자", infoData: data.dto.endDate },
        { label: "모집인원", infoData: data.dto.mentoringCnt },
        { label: "연락방법", infoData: data.dto.link },
        { label: "모집마감일", infoData: data.dto.endDate },
        { label: "모집 분야", infoData: data.dto.categories?.join(", ") },
      ]
      : [
        { label: "시작일자", infoData: data.startDate },
        { label: "종료일자", infoData: data.endDate },
        { label: "모집인원", infoData: `${data.memberCnt} 명` },
        { label: "연락방법", infoData: data.link },
        { label: "기술스택", stacks: data.stacks },
        { label: "모집구분", infoData: "프론트엔드 기획자" },
        { label: "모집마감일", infoData: data.endDate },
      ];

  return (
      <TeamPageInfo
          status={"dto" in data ? data.dto.status : data.status}
          infoData={teamInfoData}
          content={"dto" in data ? data.dto.content : data.content}
          authority={"LEADER"}
          params={params ?? {page_type: "", team_id: ""}}
      />
  );
};

export default Page;
