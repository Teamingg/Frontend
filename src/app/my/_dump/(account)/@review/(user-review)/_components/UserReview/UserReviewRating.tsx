import { FaRegStar, FaStar } from "react-icons/fa";

const UserReviewRating = ({ rate }: { rate: number }) => {
  const rateStar = [...Array(5)].map((_, idx) =>
    rate > idx ? (
      <FaStar key={idx} fill="#FDCC0D" />
    ) : (
      <FaRegStar key={idx} fill="#FDCC0D" />
    )
  );

  return <div className="flex">{rateStar}</div>;
};

export default UserReviewRating;
