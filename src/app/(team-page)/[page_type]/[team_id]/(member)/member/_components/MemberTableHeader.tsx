import React from 'react';
import {TeamMemberTableName} from "@/app/(team-page)/[page_type]/[team_id]/(member)/member/page";

const MemberTableHeader: React.FC<TeamMemberTableName> = ({tableName}) => {
  return (
    <div className="flex bg-gray-200 p-2 font-semibold text-sm">
      {tableName.map(item => (
        <div key={item.id} className="w-1/4 text-center">{item.label}</div>
      ))}
    </div>
  );
};

export default MemberTableHeader;