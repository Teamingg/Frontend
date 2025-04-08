'use client';

import React, {useEffect, useState} from 'react';
import Select from "@/components/Input/Select";
import Button from "@/components/Button/Button";
import {Controller, useForm} from "react-hook-form";
import {formatDate} from "@/service/date/date";

type PostFormValues = {
  title: string;
  category: string;
  memberCnt: string;
  contact: string;
  content: string;
};

const Page = () => {
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    register,
    formState: { errors }
  } = useForm<PostFormValues>({
    defaultValues: {
      title: '',
      category: '',
      memberCnt: '',
      contact: '',
      content: '',
    },
  });
  
  const onSubmit = (data: PostFormValues) => {
    console.log('📦 제출 데이터:', data);
    // API 연동 예정
  };
  
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">게시글 작성</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 제목 */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">제목</label>
          <input
            {...register("title", { required: true })}
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="제목을 입력해주세요"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">제목은 필수입니다.</p>}
        </div>
        
        {/* 모집 역할 */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">모집 역할</label>
          <select
            {...register("category", { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">카테고리를 선택해주세요</option>
            <option value="mentor">멘토</option>
            <option value="mentee">멘티</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">카테고리를 선택해주세요.</p>}
        </div>
        
        {/* 모집 인원 */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">모집 인원</label>
          <Controller
            control={control}
            name="memberCnt"
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                label="명"
                name="memberCnt"
                options={Array.from({ length: 10 }, (_, i) => String(i + 1))}
                value={field.value}
                onChange={field.onChange}/>
            )}/>
          {errors.memberCnt && <p className="text-red-500 text-sm mt-1">모집 인원을 선택해주세요.</p>}
        </div>
        
        {/* 모집 마감일 */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">모집 마감일</label>
          <input
            {...register("title", { required: true })}
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="모집 마감일을 입력해주세요(2025-01-01)"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">모집 마감일은 필수입니다.</p>}
        </div>
        {/*<div className="py-2 flex flex-col w-full">*/}
        {/*  <label className="mb-2 text-sm font-medium text-gray-700">모집 마감일</label>*/}
        {/*  <div className="w-full flex items-center gap-5">*/}
        {/*    /!* 월 선택 *!/*/}
        {/*    <Select*/}
        {/*      label="월"*/}
        {/*      name="deadlineMonth"*/}
        {/*      options={months}*/}
        {/*      value={endMonth}*/}
        {/*      onChange={(month) => updateEndDate(month, endDay)}*/}
        {/*    />*/}
        {/*    */}
        {/*    /!* 일 선택 *!/*/}
        {/*    <Select*/}
        {/*      label="일"*/}
        {/*      name="deadlineDay"*/}
        {/*      options={endDays}*/}
        {/*      value={endDay}*/}
        {/*      onChange={(day) => updateEndDate(endMonth, day)}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</div>*/}
        
        {/* 연락 방법 */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">연락 방법</label>
          <input
            {...register("contact", { required: true })}
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="오픈 카카오톡 링크 등"
          />
          {errors.contact && <p className="text-red-500 text-sm mt-1">연락 방법을 입력해주세요.</p>}
        </div>
        
        {/* 내용 */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">소개</label>
          <textarea
            {...register("content", { required: true })}
            className="w-full h-60 px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="내용을 입력해주세요"
          />
          {errors.content && <p className="text-red-500 text-sm mt-1">내용은 필수입니다.</p>}
        </div>
        
        {/* 제출 버튼 */}
        <div className="text-right">
          <Button type="submit" className='w-full'>작성 완료</Button>
        </div>
      </form>
    </div>
  );
};

export default Page;