/**
 * 특정 날짜에 지정된 주(week)만큼 더한 날짜를 반환하는 함수
 * @param dateString - 기준 날짜 (YYYY-MM-DD 형식)
 * @param weeks - 더할 주(week) 수
 * @returns - 주가 추가된 날짜 (YYYY-MM-DD 형식)
 */
export const addWeeksToDate = (dateString: string, weeks: number) => {
  const date = new Date(dateString);        // 문자열을 Date 객체로 변환
  if (isNaN(date.getTime())) throw new Error("잘못된 날짜 형식입니다. (날짜 형식: YYYY-MM-DD)");
  date.setDate(date.getDate() + weeks * 7); // 7일 * n주 추가
  return date.toISOString().split("T")[0];  // YYYY-MM-DD 형식 반환
}


export const getSelectableMonths = (baseDate: string = new Date().toISOString().split("T")[0]): string[] => {
  const [year, currentMonth] = baseDate.split("-").map(Number);
  
  // 오늘 이후의 월을 반환 (현재 월부터 12월까지)
  return Array.from({ length: 12 - (currentMonth - 1) }, (_, i) =>
    String(currentMonth + i).padStart(2, "0")
  );
};


export const getSelectableDays = (
  month?: string,
  minDays?: number,
  baseDate: string = new Date().toISOString().split("T")[0],
  maxDays?: number
): string[] => {
  if (!month) return []; // 월이 없으면 빈 배열 반환
  
  const [year, currentMonth, currentDay] = baseDate.split("-").map(Number);
  const selectedMonth = parseInt(month, 10);
  if (isNaN(selectedMonth)) return []; // 월이 숫자가 아니면 빈 배열 반환
  
  const lastDay = maxDays || new Date(year, selectedMonth, 0).getDate();
  const minDay = selectedMonth === currentMonth ? currentDay : 1;
  
  return Array.from({ length: lastDay - minDay + 1 }, (_, i) =>
    String(i + minDay).padStart(2, "0")
  );
};


// 날짜를 ISO 형식(YYYY-MM-DD)으로 변환
export const formatDate = (year: number, month: string, day: string) => {
  const monthNum = parseInt(month, 10);
  const dayNum = parseInt(day, 10);
  const date = new Date(year, monthNum - 1, dayNum);
  if (isNaN(date.getTime())) throw new Error("잘못된 날짜 입니다.");
  return date.toISOString().split("T")[0];
};