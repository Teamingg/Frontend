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
      href={`/post/${category}/${id}`}
      className="bg-white shadow-sm p-4 rounded-lg block"
    >
      <div className="flex justify-between items-center text-xs md:text-base text-gray-400">
        <div className="flex gap-2 items-center">
          <Status status={status} />
          <p className="text-primary bg-gray-100 rounded-full px-2">
            {category === "project" ? "프로젝트" : "멘토링"}
          </p>
        </div>
        <p className="text-gray-400">{teamName}</p>
      </div>

      <div className="py-2">
        <div className="flex gap-2 mb-1 items-center">
          {/* <Status status={status} /> */}
          <h3 className="font-semibold text-base md:text-xl line-clamp-1">
            {title}
          </h3>
        </div>
        <p className="text-xs md:text-base line-clamp-1">{contents}</p>
      </div>

      <div className="flex justify-between text-xs md:text-base">
        <p>{tag.join(", ")}</p>
        <p>
          <time dateTime={startDate}>{startDate}</time>
          <span>~</span>
          <time dateTime={endDate}>{endDate}</time>
        </p>
      </div>
    </Link>
  );
};

export default PostItem;
