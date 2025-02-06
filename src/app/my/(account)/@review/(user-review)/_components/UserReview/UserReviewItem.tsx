import Link from "next/link";
import { FaRegStar, FaStar } from "react-icons/fa";
import UserReviewRating from "./UserReviewRating";

interface UserReviewItemProps {
  id: number;
  name: string;
  content: string;
  date: string;
  rate: number;
}

const UserReviewItem = ({
  id,
  name,
  content,
  date,
  rate,
}: UserReviewItemProps) => {
  // name 클릭했을 때 유저 프로필 모달

  return (
    <li className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex  justify-between items-center mb-2 border-b pb-2">
        <div className="flex gap-2 items-center">
          <Link href={`/user/profile/${id}`} className="text-lg block">
            {name}
          </Link>
          <UserReviewRating rate={rate} />
        </div>
        <span className="text-gray-400 text-sm">
          {new Date(date).toLocaleDateString("en-CA")}
        </span>
      </div>
      <div>
        <p>{content}</p>
      </div>
    </li>
  );
};

export default UserReviewItem;
