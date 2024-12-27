import Link from "next/link";
import Status from "../Status";
import { TeamStatus } from "@/types/team/teamStatus";

type category = "mentoring" | "project";

interface PostItemProps {
  id: number;
  title: string;
  teamName: string;
  startDate: string;
  endDate: string;
  category: category;
  contents: string;
  tag: string[];
  status: TeamStatus;
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
  status,
}: PostItemProps) => {
  // 현재 카테고리

  return (
    <Link
      href={`${category}/${id}`}
      className="bg-white shadow-sm p-4 rounded-lg block"
    >
      <div className="flex justify-between text-sm text-gray-400">
        <p>
          <time dateTime={startDate}>{startDate}</time>
          <span>~</span>
          <time dateTime={endDate}>{endDate}</time>
        </p>
        <p>{category === "project" ? "프로젝트" : "멘토링"}</p>
      </div>

      <div className=" py-4">
        <div className="flex gap-2 mb-2 items-center">
          <Status status={status} />
          <h3 className="font-semibold text-xl">{title}</h3>
        </div>
        <p className=" text-sm line-clamp-1">{contents}</p>
      </div>

      <div className="flex justify-between text-sm">
        <p>{tag.join(", ")}</p>
        <p className="text-gray-400">{teamName}</p>
      </div>
    </Link>
  );
};

export default PostItem;
