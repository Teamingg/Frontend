import Link from "next/link";

type category = "mentoring" | "project";

interface PostItemProps {
  id: number;
  title: string;
  teamName: string;
  startDate: string;
  endDate: string;
  category: category;
  contents: string;
  tag: string | string[];
}

const PostItem = ({
  id,
  title,
  startDate,
  endDate,
  category,
  contents,
  tag,
  teamName,
}: PostItemProps) => {
  // 현재 카테고리

  return (
    <Link
      href={`${category}/${id}`}
      className="bg-white shadow-sm p-4 rounded-lg"
    >
      <div className="flex justify-between mb-4">
        <p>
          <time dateTime={startDate}>{startDate}</time>
          <span>~</span>
          <time dateTime={endDate}>{endDate}</time>
        </p>
        <p>{category}</p>
      </div>
      <h3 className="mb-2">{title}</h3>
      <p className="mb-2">{contents}</p>
      <div className="flex justify-between">
        <p>{tag}</p>
        <p>{teamName}</p>
      </div>
    </Link>
  );
};

export default PostItem;
