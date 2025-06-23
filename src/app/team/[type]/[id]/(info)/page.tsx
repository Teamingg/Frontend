'use client';

import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useParams } from 'next/navigation';

const ProjectForm = dynamic(() => import("@/components/Form/ProjectForm"), {
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">로딩 중...</h2>
        <p>잠시만 기다려주세요.</p>
      </div>
    </div>
  ),
  ssr: false
});

const MentoringForm = dynamic(() => import("@/components/Form/MentoringForm"), {
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">로딩 중...</h2>
        <p>잠시만 기다려주세요.</p>
      </div>
    </div>
  ),
  ssr: false
});

interface PageProps {
    type: string;
    id: string;
}

export default function Page() {

  const params =  useParams()

  const [currentStep, setCurrentStep] = useState(1);
  const { control, watch, setValue } = useForm();

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  return (
    <div className="container mx-auto px-4 py-8">
      {params.type === "project" ? (
        <ProjectForm
          currentStep={currentStep}
          control={control}
          watch={watch}
          setValue={setValue}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      ) : (
        <MentoringForm
          currentStep={currentStep}
          control={control}
          watch={watch}
          setValue={setValue}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
    </div>
  );
} 