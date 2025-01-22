import React from 'react';
import STACK_LIST from "@/constant/stackList";

interface ProjectTeamInfoTecStackProps {
  stacks: string[];
}

const ProjectTeamInfoTecStack = ({stacks}: ProjectTeamInfoTecStackProps) => {
  // STACK_LIST 를 Map 으로 변환
  const stackMap = STACK_LIST.reduce((acc, stack) => {
    acc[stack.value] = stack;
    return acc;
  }, {} as Record<string, typeof STACK_LIST[number]>)

  return (
    <div className="flex justify-between items-center">
      <label className="block text-[19px] text-gray-600">기술스택</label>
      <div className="w-10/12 flex items-center justify-center gap-2 space-x-2">
        {stacks.map(stackId => {
          const stack = stackMap[stackId];
          return stack ? (
              <div key={stack.value} className="w-12 h-12 mx-0 flex flex-col justify-center items-center">
                {stack.icon}
                <span>{stack.label}</span>
              </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default ProjectTeamInfoTecStack;