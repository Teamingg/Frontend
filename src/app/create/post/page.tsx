'use client';
import React from 'react';
import {useForm} from "react-hook-form";
import {instance} from "@/shared/api/axiosInstance";

interface PostFormData {
    projectName: string;
    deadline: string;
    memberCnt: string;
    link: string;
    contents: string;
}

const Page = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<PostFormData>();

    const onSubmit = async (formData: PostFormData) => {
        const response = await instance.post(
            "/mentoring/1/post", {
                projectName: formData.projectName,
                deadline: formData.deadline,
                memberCnt: formData.memberCnt,
                tags: formData.link,
                contents: formData.contents,
            });

        console.log('Submitted Data: ', formData)
        console.log('response: ', response.data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>프로젝트 게시글 작성에 필요한 정보를 입력해주세요.</h2>

                {/* 프로젝트 제목 */}
                <div>
                    <label htmlFor="projectName">제목</label>
                    <input
                        {...register("projectName", {required: "제목은 필수 항목입니다."})}
                        type="text"
                        id="projectName"
                        placeholder="제목을 입력해주세요."/>
                    {errors.projectName && <p>{errors.projectName.message}</p>}
                </div>

                {/* 모집 마감일 */}
                <div>
                    <label htmlFor="deadline">모집마감</label>
                    <input
                        {...register("deadline", {required: "모집 마감일은 필수 항목입니다."})}
                        id="deadline"
                        placeholder="마감 일자를 입력해 주세요."/>
                    {errors.deadline && <p>{errors.deadline.message}</p>}
                </div>

                {/* 모집 인원 */}
                <div>
                    <label htmlFor="memberCnt">모집인원</label>
                    <input
                        {...register("memberCnt", {required: "모집 인원은 필수 항목입니다."})}
                        type="text"
                        id="memberCnt"
                        placeholder="모집인원을 입력해 주세요."/>
                    {errors.memberCnt && <p>{errors.memberCnt.message}</p>}
                </div>

                {/* 연락 방법 (오픈카톡 링크) */}
                <div>
                    <label htmlFor="link">연락 방법</label>
                    <input
                        {...register("link", {required: "연락 방법은 필수 항목입니다."})}
                        type="text"
                        id="link"
                        placeholder="연락방법을 입력해 주세요."/>
                    {errors.link && <p>{errors.link.message}</p>}
                </div>

                {/* 프로젝트 소개 */}
                <div>
                    <label htmlFor="contents">소개</label>
                    <textarea
                        {...register("contents", {required: "소개는 필수 항목입니다."})}
                        id="contents"
                        placeholder="프로젝트 소개를 입력해 주세요."/>
                    {errors.contents && <p>{errors.contents.message}</p>}
                </div>

                {/* 버튼 */}
                <div>
                    <button type="button">닫기</button>
                    <button type="submit">게시글 작성하기</button>
                </div>
            </form>
        </div>
    );
};

export default Page;