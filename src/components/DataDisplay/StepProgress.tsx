import { HiCheckCircle  } from "react-icons/hi";
import clsx from "clsx"; // 아이콘 추가

const steps = [
  {step: "step 1", label: "팀 정보"},
  {step: "step 2", label: "모집 정보"},
  {step: "step 3", label: "팀 소개"},
  {step: "step 4", label: "검토 및 완료"},
];

const StepProgress = ({ currentStep }: { currentStep: number }) => {
  return (
    <ul className="w-full mt-5 flex items-center justify-between">
      {steps.map((step, index) => {
        const isCompleted = index + 1 < currentStep; // 완료된 스텝
        const isActive = index + 1 === currentStep; // 현재 진행 중인 스텝
        
        const stepClass = clsx(
          "w-20 mx-auto text-center flex flex-col items-center",
          isCompleted ? "text-green-500 font-semibold" : "", // 완료된 스텝은 초록색
          isActive ? "text-blue-500 font-bold" : "text-gray-500" // 현재 스텝은 Primary 색상
        );
        
        return (
          <li key={index} className={stepClass}>
            {isCompleted ? (
              <HiCheckCircle className="w-6 h-6 text-green-500" /> // 완료된 스텝 아이콘
            ) : isActive ? (
              <HiCheckCircle className="w-6 h-6 text-blue-500" /> // 현재 스텝 아이콘
            ) : (
              <HiCheckCircle className="w-6 h-6 text-gray-300" /> // 진행되지 않은 스텝 아이콘
            )}
            <p className="mt-1">{step.label}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default StepProgress;