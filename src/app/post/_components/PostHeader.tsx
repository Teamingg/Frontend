import Status from "@/components/common/Status";
import { TeamStatus } from "@/types/team/teamStatus";

interface PostHeaderProps {
  title: string;
  teamName: string;
  deadLine: string;
  status: TeamStatus;
}

const PostHeader = ({ title, teamName, deadLine, status }: PostHeaderProps) => {
  return (
    <div className="border-b p-4 mb-6">
      <div className="flex items-center gap-2">
        <h3 className="text-xl">{title}</h3>
        <Status status={status} />
      </div>
      <div className="flex justify-between text-gray-500 ">
        <span>{teamName}</span>
        <span>{`모집마감 : ${deadLine}`}</span>
      </div>
    </div>
  );
};

export default PostHeader;
