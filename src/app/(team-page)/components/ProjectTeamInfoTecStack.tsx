import React from 'react';

interface ProjectTeamInfoTecStackProps {
  key: string | number;
}

const ProjectTeamInfoTecStack = ({key}: ProjectTeamInfoTecStackProps) => {
  return (
    <div className="flex justify-between" key={key}>
      <label className="block text-gray-600">기술스택</label>
      <div className="flex space-x-2">
        <img src="/images/stack-icon1.png" alt="stack1" className="w-8 h-8"/>
        <img src="/images/stack-icon2.png" alt="stack2" className="w-8 h-8"/>
        <img src="/images/stack-icon3.png" alt="stack3" className="w-8 h-8"/>
        <img src="/images/stack-icon4.png" alt="stack4" className="w-8 h-8"/>
      </div>
    </div>
  );
};

export default ProjectTeamInfoTecStack;