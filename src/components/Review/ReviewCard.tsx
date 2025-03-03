import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

interface ReviewCardProps {
  reviewer: string;
  date: string;
  profileImage: string;
  rating: number;
  projectTitle: string;
  reviewContent: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  reviewer,
  date,
  rating,
  projectTitle,
  reviewContent,
}) => {
  return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm transition-all hover:shadow-md">
        {/* 리뷰어 정보 */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center'>
              <p className='text-lg text-white'>{reviewer.slice(0, 1)}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">{reviewer}</h4>
              <p className="text-gray-500 text-sm">{date}</p>
            </div>
          </div>

          {/* 별점 */}
          <div className="flex gap-1 text-yellow-400 text-lg">
            {Array.from({ length: 5 }).map((_, index) =>
                index < rating ? <FaStar key={index} /> : <FaRegStar key={index} />
            )}
          </div>
        </div>

        {/* 프로젝트 정보 */}
        <div className="text-primary font-medium mb-3">{projectTitle}</div>

        {/* 리뷰 내용 */}
        <p className="text-gray-700 leading-relaxed mb-4">{reviewContent}</p>

        {/* 액션 버튼 */}
        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition">
            답변하기
          </button>
          <button className="px-4 py-2 border border-red-500 text-red-500 rounded-lg text-sm font-medium hover:bg-red-100 transition">
            신고하기
          </button>
        </div>
      </div>
  );
};

export default ReviewCard;