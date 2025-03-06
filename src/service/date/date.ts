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

/**
 * 특정 기간 내에서 선택 가능한 월을 반환하는 함수
 * @param {number} limit - 최대 선택 가능 일수 (기본값: 90일)
 * @param {string} baseDate - 기준 날짜 (기본값: 오늘)
 * @returns {number[]} - 선택 가능한 월 리스트 (1~12)
 */
export const getSelectableMonths = (limit: number = 90, baseDate: string = new Date().toISOString().split("T")[0]): number[] => {
  const startDate = new Date(baseDate);
  if (isNaN(startDate.getTime())) throw new Error("잘못된 날짜 형식입니다. (날짜 형식: YYYY-MM-DD)");
  
  const maxDate = new Date(startDate);
  maxDate.setDate(startDate.getDate() + limit);
  
  const selectableMonths = new Set<number>();
  let current = new Date(startDate);
  
  while (current <= maxDate) {
    selectableMonths.add(current.getMonth() + 1); // getMonth()는 0부터 시작하므로 +1
    current.setDate(current.getDate() + 1); // 하루 증가
  }
  
  return [...selectableMonths].sort((a, b) => a - b);
};

/**
 * 특정 월의 선택 가능한 날짜(일) 목록을 반환하는 함수
 * @param {number} month - 선택할 월 (1~12)
 * @param maxLimit
 * @param {string} baseDate - 기준 날짜 (기본값: 오늘)
 * @param minLimit
 * @returns {number[]} - 선택 가능한 일 리스트 (1~31)
 */
export const getSelectableDays = (
  month: number,
  maxLimit: number = 90,
  baseDate: string = new Date().toISOString().split("T")[0],
  minLimit: number = 0
): number[] => {
  const startDate = new Date(baseDate);
  const minDate = new Date(startDate);
  minDate.setDate(startDate.getDate() + minLimit); // 최소 minLimit 일 후부터 선택 가능
  
  const maxDate = new Date(startDate);
  maxDate.setDate(startDate.getDate() + maxLimit);
  
  const selectableDays: number[] = [];
  let current = new Date(minDate);
  while (current <= maxDate) {
    if (current.getMonth() + 1 === month) {
      selectableDays.push(current.getDate());
    }
    current.setDate(current.getDate() + 1);
  }
  
  // 만약 month의 최대일(예: 30일)보다 큰 날짜가 선택되었다면 자동으로 보정
  const lastDayOfMonth = new Date(new Date().getFullYear(), month, 0).getDate();
  return selectableDays.filter((day) => day <= lastDayOfMonth);
};

/**
 * startDate로부터 최소 30일 후의 날짜를 반환하는 함수
 * @param baseDate - 기준 날짜 (YYYY-MM-DD)
 * @returns 최소 30일 후 날짜 (YYYY-MM-DD)
 */
export const getMinEndDate = (baseDate: string) => {
  const date = new Date(baseDate + "T00:00:00");
  date.setDate(date.getDate() + 30); // 30일 추가
  return formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
};


// 날짜를 ISO 형식(YYYY-MM-DD)으로 변환
export const formatDate = (year: number, month: number | number[], day: number | number[]) => {
  const date = new Date(year, month - 1, day);
  if (isNaN(date.getTime())) throw new Error("잘못된 날짜 입니다.");
  return date.toISOString().split("T")[0];
};

const testStartDate = "2025-03-06";
console.log("테스트: getMinEndDate", getMinEndDate(testStartDate));