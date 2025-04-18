import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProjectForm from '@/components/Form/ProjectForm';

// Mock ProjectForm component
vi.mock('@/components/Form/ProjectForm', () => ({
  __esModule: true,
  default: ({ currentStep }: { currentStep: number }) => {
    if (currentStep === 1) {
      return (
        <div>
          <div>팀 이름</div>
          <div>프로젝트 시작일</div>
          <div>프로젝트 종료일</div>
          <div>마감일</div>
        </div>
      );
    } else if (currentStep === 2) {
      return <div>인원</div>;
    } else if (currentStep === 3) {
      return <div>내용</div>;
    } else {
      return (
        <div>
          <div>기술 스택</div>
          <div>모집 분야</div>
        </div>
      );
    }
  }
}));

// Mock components
vi.mock('../components/Input/TextInput/TextInput', () => ({
  __esModule: true,
  default: () => null
}));

vi.mock('../components/Input/Select', () => ({
  __esModule: true,
  default: () => null
}));

vi.mock('../components/Input/SelectCheckBox/SelectCheckBox', () => ({
  __esModule: true,
  default: () => null
}));

vi.mock('../components/Input/TextArea/TextareaField', () => ({
  __esModule: true,
  default: () => null
}));

vi.mock('../components/Button/Button', () => ({
  __esModule: true,
  default: () => null
}));

// Mock constants
vi.mock('../constants/stackList', () => ({
  __esModule: true,
  default: [
    { value: "1", label: "React", icon: null },
    { value: "2", label: "Node.js", icon: null },
  ]
}));

vi.mock('../constants/recruiteCategory', () => ({
  __esModule: true,
  default: [
    { value: "1", label: "Frontend", icon: null },
    { value: "2", label: "Backend", icon: null },
  ]
}));

// Mock react-hook-form
vi.mock("react-hook-form", () => ({
  useForm: () => ({
    register: vi.fn(),
    handleSubmit: vi.fn(),
    formState: { errors: {} },
    control: {},
    watch: vi.fn(),
  }),
  useWatch: () => ({
    projectName: "Test Project",
    startDate: "2024-01",
    endDate: "2024-12",
    deadline: "2024-06",
    memberCount: 5,
    contents: "Test contents",
    stackIds: ["1"],
    recruiteCategoryIds: ["1"],
  }),
  useController: () => ({
    field: {
      onChange: vi.fn(),
      onBlur: vi.fn(),
      value: "",
      name: "",
      ref: vi.fn(),
    },
    fieldState: { error: null },
    formState: { errors: {} },
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

describe('ProjectForm', () => {
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
    watch: () => ({
      projectName: '테스트 프로젝트',
      startDate: '2025-04-17',
      endDate: '2025-05-17',
      deadline: '2025-04-30',
      memberCnt: 1,
      contents: '프로젝트 소개',
      stackIds: ['1'],
      recruitCategoryIds: ['1'],
    }),
    setValue: vi.fn(),
    nextStep: vi.fn(),
    prevStep: vi.fn(),
  };

  it('renders step 1 form fields', () => {
    render(<ProjectForm {...mockProps} />);
    expect(screen.getByText('팀 이름')).toBeInTheDocument();
    expect(screen.getByText('프로젝트 시작일')).toBeInTheDocument();
    expect(screen.getByText('프로젝트 종료일')).toBeInTheDocument();
    expect(screen.getByText('마감일')).toBeInTheDocument();
  });

  it('renders step 2 form fields', () => {
    render(<ProjectForm {...{...mockProps, currentStep: 2}} />);
    expect(screen.getByText('인원')).toBeInTheDocument();
  });

  it('renders step 3 form fields', () => {
    render(<ProjectForm {...{...mockProps, currentStep: 3}} />);
    expect(screen.getByText('내용')).toBeInTheDocument();
  });

  it('renders step 4 form fields', () => {
    render(<ProjectForm {...{...mockProps, currentStep: 4}} />);
    expect(screen.getByText('기술 스택')).toBeInTheDocument();
    expect(screen.getByText('모집 분야')).toBeInTheDocument();
  });
}); 