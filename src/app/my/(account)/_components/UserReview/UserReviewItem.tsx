interface UserReviewItemProps {
  id: number;
  name: string;
  content: string;
  date: string;
}

const UserReviewItem = ({ id, name, content, date }: UserReviewItemProps) => {
  // name 클릭했을 때 유저 프로필 모달

  return (
    <li className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex  justify-between mb-2 border-b pb-2">
        <p className="text-lg">{name}</p>
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
