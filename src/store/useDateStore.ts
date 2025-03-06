import { create } from "zustand";
import {formatDate, getMinEndDate} from "@/service/date/date";


interface DateState {
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  startDate: string;
  endDate: string;
  updateStartDate: (month: number, day: number) => void;
  updateEndDate: (month: number, day: number) => void;
}

export const useDateStore = create<DateState>((set) => {
  const today = new Date();
  const startDate = formatDate(today.getFullYear(), today.getMonth() + 1, today.getDate());
  const endDate = getMinEndDate(startDate); // 최소 30일 후 날짜 설정
  
  return {
    startMonth: today.getMonth() + 1,
    startDay: today.getDate(),
    endMonth: new Date(endDate).getMonth() + 1,
    endDay: new Date(endDate).getDate(),
    startDate,
    endDate,
    
    updateStartDate: (month, day) =>
      set(() => {
        const newStartDate = formatDate(new Date().getFullYear(), month, day);
        // startDate 변경 시 endDate 자동 조정
        const newEndDate = getMinEndDate(newStartDate);
        return {
          startMonth: month,
          startDay: day,
          startDate: newStartDate,
          endMonth: new Date(newEndDate).getMonth() + 1,
          endDay: new Date(newEndDate).getDate(),
          endDate: newEndDate,
        };
      }),
    
    updateEndDate: (month, day) =>
      set((state) => {
        const newEndDate = formatDate(new Date().getFullYear(), month, day);
        // ✅ endDate가 startDate + 30일보다 빠르면 자동 조정
        if (new Date(newEndDate) < new Date(getMinEndDate(state.startDate))) {
          return {
            endMonth: new Date(getMinEndDate(state.startDate)).getMonth() + 1,
            endDay: new Date(getMinEndDate(state.startDate)).getDate(),
            endDate: getMinEndDate(state.startDate),
          };
        }
        return {
          endMonth: month,
          endDay: day,
          endDate: newEndDate,
        };
      }),
  };
});