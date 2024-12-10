"use client";
import {useForm} from "react-hook-form";

interface TeamFormData {
    name: string;
    deadline: string;
    startDate: string;
    endDate: string;
    mentoringCnt: string;
    content: string;
}

const Page = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<TeamFormData>();

    const onSubmit = (formData: TeamFormData) => {
        console.log('test', formData)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>팀을 생성하기에 앞서 간단한 정보를 입력해주세요.</h2>
                <div>
                    <input
                        {...register('name', {required: '팀 이름은 필수 항목입니다.'})}
                        type="text"
                        id="name"
                        placeholder="팀 이름을 입력해주세요."/>
                    {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div>
                    <label htmlFor="deadline">모집 마감일</label>
                    <input
                        {...register('deadline', {required: '모집 마감일을 입력해주세요.'})}
                        id="deadline"
                        placeholder="마감 일자를 입력해 주세요."/>
                    {errors.deadline && <p>{errors.deadline.message}</p>}
                </div>
                <div>
                    <div>
                        <label htmlFor="startDate">프로젝트 시작일</label>
                        <input
                            {...register('startDate', { required: '시작일을 입력해주세요.' })}
                            type="text"
                            id="startDate"
                            placeholder="프로젝트 시작일을 선택해 주세요."/>
                        {errors.startDate && <p>{errors.startDate.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="endDate">프로젝트 종료일</label>
                        <input
                            {...register('endDate', { required: '종료일을 입력해주세요.' })}
                            type="text"
                            id="endDate"
                            placeholder="프로젝트 종료일을 선택해 주세요."/>
                        {errors.endDate && <p>{errors.endDate.message}</p>}
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="tags">기술스택</label>
                        <input type="text" id="tags" name="tags"/>
                    </div>
                    <div>
                        <label htmlFor="mentoringCnt">모집인원</label>
                        <input
                            {...register('mentoringCnt', { required: '모집인원을 입력해주세요.' })}
                            type="text"
                            id="mentoringCnt"
                            placeholder="모집인원을 입력해 주세요."/>
                        {errors.mentoringCnt && <p>{errors.mentoringCnt.message}</p>}                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="tags">모집 구분</label>
                        <input type="text" id="tags" name="tags"/>
                    </div>
                    <div>
                        <label htmlFor="phone">연락 방법</label>
                        <input type="text" id="phone" name="phone"/>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="content">소개</label>
                        <textarea
                            {...register('content', { required: '프로젝트 소개를 입력해주세요.' })}
                            id="content"
                            placeholder="프로젝트 소개를 입력해 주세요."/>
                        {errors.content && <p>{errors.content.message}</p>}
                    </div>
                </div>
                <div>
                    <button>닫기</button>
                    <button>게시글 작성하기</button>
                </div>
            </form>
        </div>
    );
};

export default Page;