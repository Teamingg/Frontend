export const getProgress = (startDateStr: string, endDateStr: string): number => {
  const startDate = new Date(startDateStr).getTime(); // 시작일 (밀리초)
  const endDate = new Date(endDateStr).getTime(); // 종료일 (밀리초)
  const today = new Date().getTime(); // 현재 날짜 (밀리초)
  
  if (today < startDate) return 0; // 시작 전이면 0%
  if (today > endDate) return 100; // 종료일이 지났으면 100%
  
  const progress = ((today - startDate) / (endDate - startDate)) * 100;
  return Math.min(100, Math.max(0, progress)); // 0~100% 범위 유지
};