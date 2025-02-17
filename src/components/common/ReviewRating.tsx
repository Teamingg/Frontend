"use client";

import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

const ReviewRating = () => {
  const [currentRate, setCurrentRate] = useState(0);

  const starColor = "#FDCC0D";
  const starSize = "32";

  // currentRate => 현재 클릭된 별 갯수 ( 리뷰 데이터 전송시 보내야하는 데이터 )
  // rateStar => 현재 별 갯수만큼 채워진 별을 렌더링 함
  const rateStar = [...Array(5)].map((_, idx) =>
    currentRate > idx ? (
      <FaStar key={idx} fill={starColor} size={starSize} />
    ) : (
      <FaRegStar key={idx} fill={starColor} size={starSize} />
    )
  );

  return (
    <ul className="flex">
      {rateStar.map((item, idx) => (
        <li
          key={idx}
          id={String(idx + 1)}
          className="cursor-pointer"
          onMouseDown={(e) => setCurrentRate(Number(e.currentTarget.id))}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default ReviewRating;
