import Status from "@/components/Status";
import { TeamStatus } from "@/types/team/teamStatus";

interface PostHeaderProps {
  title: string;
  teamName: string;
  deadLine: string;
  status: TeamStatus;
}

const PostHeader = ({ title, teamName, deadLine, status }: PostHeaderProps) => {
  return (
    <div className="py-10">
      <div className="flex items-center gap-2 mb-1">
        <h3 className="text-xl md:text-2xl">{title}</h3>
        <Status status={status} />
      </div>
      <div className="flex justify-between text-gray-500 text-sm md:text-base">
        <span>{teamName}</span>
        <span>{`모집마감 : ${deadLine}`}</span>
      </div>
    </div>
  );
};

export default PostHeader;