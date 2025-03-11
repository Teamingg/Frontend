'use client';
import React from 'react';
import Link from "next/link";
import {FaRegPenToSquare} from "react-icons/fa6";
import {FaSearch} from "react-icons/fa";
import PostCard from "@/components/Card/PostCard";
import {useParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {getTeamPosts} from "@/service/api/team";

const Page = () => {
  const { type, id } = useParams();
  const typeStr = Array.isArray(type) ? type[0] : type;
  const idStr = Array.isArray(id) ? id[0] : id;

  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ["teamPosts", typeStr, idStr],
    queryFn: () => getTeamPosts(typeStr, idStr),
  });

  return (
      <>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">팀 게시글</h1>
          <Link href={`/post/${type}/${id}`} className="px-4 py-2 bg-primary text-white rounded-lg flex items-center">
            <FaRegPenToSquare className="mr-2"/>새 게시글 작성
          </Link>
        </div>

        <div className="flex mb-6">
          <div className="w-full flex items-center bg-white border border-gray-200 rounded-lg px-4 py-2">
            <FaSearch className="text-gray-500"/>
            <input type="text" placeholder="제목 또는 게시글 아이디로 검색" className="ml-2 w-full outline-none text-sm"/>
          </div>
        </div>

        {/* 더미데이터 */}
        {/*<PostCard post={dummyPosts[0]}/>*/}

        {/* 로딩 중일 때 */}
        {isLoading && <p className="text-center text-gray-500">로딩 중...</p>}

        {/* 에러 발생 시 */}
        {isError && <p className="text-center text-red-500">데이터를 불러오는 중 오류가 발생했습니다.</p>}

        {/* 데이터가 존재할 경우 */}
        {!posts && posts?.length > 0
            ? posts.map((post) => <PostCard key={post.id} post={post} />)
            : <p className="min-h-96 flex items-center justify-center text-gray-500">게시글이 존재하지 않습니다.</p>
        }
      </>
  );
};

export default Page;