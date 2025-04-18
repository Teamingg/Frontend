import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MentoringForm from '@/components/Form/MentoringForm';

// Mock components
vi.mock('@/components/Input/TextInput/InputField', () => ({
  default: ({ label }: { label: string }) => <div>{label}</div>
}));

vi.mock('@/components/Input/Select', () => ({
  default: ({ label }: { label: string }) => <div>{label}</div>
}));

vi.mock('@/components/Input/SelectCheckBox/SelectCheckBox', () => ({
  default: ({ label }: { label: string }) => <div>{label}</div>
}));

vi.mock('@/components/Input/TextArea/TextareaField', () => ({
  default: ({ label }: { label: string }) => <div>{label}</div>
}));

vi.mock('@/components/Button/Button', () => ({
  default: ({ children }: { children: React.ReactNode }) => <button>{children}</button>
}));

// Mock hooks
vi.mock('react-hook-form', () => ({
  useForm: () => ({
    register: vi.fn(),
    handleSubmit: vi.fn(),
    control: {
      register: vi.fn(),
      unregister: vi.fn(),
      setValue: vi.fn(),
      getValues: vi.fn(),
      watch: vi.fn(),
      handleSubmit: vi.fn(),
      reset: vi.fn(),
      formState: { errors: {} },
    },
  }),
  useWatch: () => ({
    name: '',
    startDate: '',
    endDate: '',
    mentoringCnt: 1,
    content: '',
  }),
}));

vi.mock('@/store/useDateStore', () => ({
  useDateStore: () => ({
    startMonth: '4',
    startDay: '17',
    endMonth: '5',
    endDay: '17',
    updateStartDate: vi.fn(),
    updateEndDate: vi.fn(),
  }),
}));

describe('MentoringForm', () => {
  const mockProps = {
    currentStep: 1,
    control: {
      register: vi.fn(),
      unregister: vi.fn(),
      setValue: vi.fn(),
      getValues: vi.fn(),
      watch: vi.fn(),
      handleSubmit: vi.fn(),
      reset: vi.fn(),
      formState: { errors: {} },
    },
    watch: vi.fn(),
    setValue: vi.fn(),
    nextStep: vi.fn(),
    prevStep: vi.fn(),
  };

  it('renders step 1 form fields', () => {
    render(<MentoringForm {...mockProps} />);
    expect(screen.getByText('팀 이름')).toBeInTheDocument();
    expect(screen.getByText('멘토링 시작일')).toBeInTheDocument();
    expect(screen.getByText('멘토링 종료일')).toBeInTheDocument();
  });

  it('renders step 2 form fields', () => {
    render(<MentoringForm {...{...mockProps, currentStep: 2}} />);
    expect(screen.getByText('모집 인원')).toBeInTheDocument();
  });

  it('renders step 3 form fields', () => {
    render(<MentoringForm {...{...mockProps, currentStep: 3}} />);
    expect(screen.getByText('소개')).toBeInTheDocument();
  });
}); 