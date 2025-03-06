import {create} from "zustand";

interface FormState {
  currentStep: number;   // 현재 진행 단계
  progress: number;      // 진행도 (%)
  isDraft: boolean;      // 임시저장 여부
  
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
  toggleDraft: (value?: boolean) => void;
}

export const useFormStore = create<FormState>((set) => ({
  currentStep: 1,
  progress: 25,
  isDraft: false,
  
  setStep: (step) => set({ currentStep: step, progress: step * 25 }),
  
  nextStep: () => set((state) => ({
    currentStep: state.currentStep + 1,
    progress: (state.currentStep + 1) * 25
  })),
  
  prevStep: () => set((state) => ({
    currentStep: state.currentStep - 1,
    progress: (state.currentStep - 1) * 25
  })),
  
  resetStep: () => set({ currentStep: 1, progress: 25 }),
  
  toggleDraft: (value) => set((state) => ({
    isDraft: value !== undefined ? value : !state.isDraft
  })),
}));