'use client';
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useFormStore } from "@/store/testStore";
import ReusableSelect from "@/components/Input/ReusableSelect/ReusableSelect";

const currentYear = new Date().getFullYear();
const today = new Date();

// 월 옵션 (오늘 이후만 출력)
const monthOptions = Array.from({ length: 12 - today.getMonth() }, (_, i) => ({
  value: String(today.getMonth() + 1 + i).padStart(2, "0"),
  label: `${today.getMonth() + 1 + i}월`,
}));

// 특정 월의 마지막 날짜 계산
const getDaysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate();

const DateSelectForm: React.FC = () => {
  const {
    startMonth, startDay, endMonth, endDay, formattedStartDate, formattedEndDate,
    setStartMonth, setStartDay, setEndMonth, setEndDay, updateEndDate
  } = useFormStore();
  const { handleSubmit } = useForm();
  const [startDayOptions, setStartDayOptions] = useState<{ value: string; label: string }[]>([]);
  const [endDayOptions, setEndDayOptions] = useState<{ value: string; label: string }[]>([]);
  
  // 시작 월 변경 시 가능한 일 수 업데이트
  useEffect(() => {
    const daysInMonth = getDaysInMonth(currentYear, parseInt(startMonth));
    const newOptions = Array.from({ length: daysInMonth - (startMonth === String(today.getMonth() + 1).padStart(2, "0") ? today.getDate() - 1 : 0) }, (_, i) => ({
      value: String(i + (startMonth === String(today.getMonth() + 1).padStart(2, "0") ? today.getDate() : 1)).padStart(2, "0"),
      label: `${i + (startMonth === String(today.getMonth() + 1).padStart(2, "0") ? today.getDate() : 1)}일`,
    }));
    setStartDayOptions(newOptions);
  }, [startMonth]);
  
  useEffect(() => {
    updateEndDate();
  }, [startMonth, startDay, updateEndDate]);
  
  // 종료 월 변경 시 최소 시작일 +90일 이후만 선택 가능하도록 제한
  useEffect(() => {
    const daysInMonth = getDaysInMonth(currentYear, parseInt(endMonth));
    const minEndDate = new Date(currentYear, parseInt(startMonth) - 1, parseInt(startDay));
    minEndDate.setDate(minEndDate.getDate() + 90);
    const minEndDay = minEndDate.getDate();
    
    const newOptions = Array.from({ length: daysInMonth - minEndDay + 1 }, (_, i) => ({
      value: String(i + minEndDay).padStart(2, "0"),
      label: `${i + minEndDay}일`,
    }));
    setEndDayOptions(newOptions);
  }, [endMonth, startMonth, startDay]);
  
  const onSubmit = () => {
    console.log("시작일:", formattedStartDate);
    console.log("종료일:", formattedEndDate);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>시작 날짜</h3>
      <ReusableSelect name="startMonth" value={startMonth} options={monthOptions} label="월 선택" onChange={setStartMonth} />
      <ReusableSelect name="startDay" value={startDay} options={startDayOptions} label="일 선택" onChange={setStartDay} />
      
      <h3>종료 날짜</h3>
      <ReusableSelect name="endMonth" value={endMonth} options={monthOptions} label="월 선택" onChange={setEndMonth} />
      <ReusableSelect name="endDay" value={endDay} options={endDayOptions} label="일 선택" onChange={setEndDay} />
      
      <p>선택한 시작일: {formattedStartDate}</p>
      <p>선택한 종료일: {formattedEndDate}</p>
      
      <button type="submit">제출</button>
    </form>
  );
};

export default DateSelectForm;