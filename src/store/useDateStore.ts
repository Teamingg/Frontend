import { create } from "zustand";

interface DateState {
  startMonth: string;
  startDay: string;
  endMonth: string;
  endDay: string;
  startDate: string;
  endDate: string;
  updateStartDate: (month: string, day: string) => void;
  updateEndDate: (month: string, day: string) => void;
}

const currentYear = new Date().getFullYear();
const today = new Date();
const todayMonth = String(today.getMonth() + 1).padStart(2, "0");
const todayDay = String(today.getDate()).padStart(2, "0");

// 날짜 포맷 변환
const formatDate = (month: string, day: string) => `${currentYear}-${month}-${day}`;

// 날짜 +90일 계산
const addDays = (month: number, day: number, daysToAdd: number) => {
  const date = new Date(currentYear, month - 1, day);
  date.setDate(date.getDate() + daysToAdd);
  return {
    month: String(date.getMonth() + 1).padStart(2, "0"),
    day: String(date.getDate()).padStart(2, "0"),
  };
};

export const useDateStore = create<DateState>((set) => ({
  startMonth: todayMonth,
  startDay: todayDay,
  endMonth: addDays(today.getMonth() + 1, today.getDate(), 90).month,
  endDay: addDays(today.getMonth() + 1, today.getDate(), 90).day,
  startDate: formatDate(todayMonth, todayDay),
  endDate: formatDate(
    addDays(today.getMonth() + 1, today.getDate(), 90).month,
    addDays(today.getMonth() + 1, today.getDate(), 90).day
  ),
  
  updateStartDate: (month, day) => {
    // const newEndDate = addDays(parseInt(month, 10), parseInt(day, 10), 30);
    const newEndDate = addDays(parseInt(month), parseInt(day), 30);
    set({
      startMonth: month,
      startDay: day,
      startDate: formatDate(month, day),
      endMonth: newEndDate.month,
      endDay: newEndDate.day,
      endDate: formatDate(newEndDate.month, newEndDate.day),
    });
  },
  
  updateEndDate: (month, day) => {
    set({
      endMonth: month,
      endDay: day,
      endDate: formatDate(month, day),
    });
  },
}));