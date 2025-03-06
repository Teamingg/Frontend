import { create } from "zustand";

interface FormState {
  startMonth: string;
  startDay: string;
  endMonth: string;
  endDay: string;
  formattedStartDate: string;
  formattedEndDate: string;
  setStartMonth: (month: string) => void;
  setStartDay: (day: string) => void;
  setEndMonth: (month: string) => void;
  setEndDay: (day: string) => void;
  updateEndDate: () => void;
}

const currentYear = new Date().getFullYear();
const today = new Date();
const todayMonth = String(today.getMonth() + 1).padStart(2, "0");
const todayDay = String(today.getDate()).padStart(2, "0");

// 날짜 포맷 변환
const formatDate = (month: string, day: string) => `${currentYear}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

// 날짜 +90일 계산
const addDays = (month: number, day: number, daysToAdd: number) => {
  const date = new Date(currentYear, month - 1, day);
  date.setDate(date.getDate() + daysToAdd);
  return {
    month: String(date.getMonth() + 1).padStart(2, "0"),
    day: String(date.getDate()).padStart(2, "0"),
  };
};

export const useFormStore = create<FormState>((set, get) => ({
  startMonth: todayMonth,
  startDay: todayDay,
  endMonth: addDays(today.getMonth() + 1, today.getDate(), 90).month,
  endDay: addDays(today.getMonth() + 1, today.getDate(), 90).day,
  formattedStartDate: formatDate(todayMonth, todayDay),
  formattedEndDate: formatDate(
    addDays(today.getMonth() + 1, today.getDate(), 90).month,
    addDays(today.getMonth() + 1, today.getDate(), 90).day
  ),
  
  setStartMonth: (month) => {
    const { startDay } = get();
    set({ startMonth: month, formattedStartDate: formatDate(month, startDay) });
    get().updateEndDate();
  },
  
  setStartDay: (day) => {
    const { startMonth } = get();
    set({ startDay: day, formattedStartDate: formatDate(startMonth, day) });
    get().updateEndDate();
  },
  
  setEndMonth: (month) => {
    const { endDay } = get();
    set({ endMonth: month, formattedEndDate: formatDate(month, endDay) });
  },
  
  setEndDay: (day) => {
    const { endMonth } = get();
    set({ endDay: day, formattedEndDate: formatDate(endMonth, day) });
  },
  
  updateEndDate: () => {
    const { startMonth, startDay } = get();
    const newEndDate = addDays(parseInt(startMonth), parseInt(startDay), 90);
    set({
      endMonth: newEndDate.month,
      endDay: newEndDate.day,
      formattedEndDate: formatDate(newEndDate.month, newEndDate.day),
    });
  },
}));