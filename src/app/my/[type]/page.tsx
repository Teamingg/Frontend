import React from 'react';

const Page = () => {
  return (
      <div>
        <h3>프로젝트 관리</h3>
        <article>
          <div>활성 프로젝트</div>
          <div>완료된 프로젝트</div>
        </article>
        <article>
          <div>진행중인 프로젝트</div>
        </article>
        <article>
          <div>종료된 프로젝트</div>
        </article>
      </div>
  );
};

export default Page;