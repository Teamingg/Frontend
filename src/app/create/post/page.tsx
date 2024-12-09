import React from 'react';

const Page = () => {
    return (
        <div>
            <form action="">
                <h2>프로젝트 게시글 작성에 필요한 정보를 입력해주세요.</h2>
                <div>
                    <label htmlFor="title">제목</label>
                    <input type="text" id="title" name="title" placeholder="제목을 입력해주세요."/>
                </div>
                <div>
                    <label htmlFor="content">모집마감</label>
                    <textarea id="content" name="content" placeholder="마감 일자를 입력해 주세요."></textarea>
                </div>
                <div>
                    <div>
                        <label htmlFor="tags">모집인원</label>
                        <input type="text" id="tags" name="tags" placeholder="모집인원을 입력해 주세요."/>
                    </div>
                    <div>
                        <label htmlFor="tags">연락 방법</label>
                        <input type="text" id="tags" name="tags" placeholder="연락방법을 입력해 주세요."/>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="tags">소개</label>
                        <textarea id="tags" name="tags" placeholder="프로젝트 소개를 입력해 주세요."/>
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