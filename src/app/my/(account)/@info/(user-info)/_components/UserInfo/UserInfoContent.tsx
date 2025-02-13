import SelectBoxField from "@/types/selectBoxField";

interface UserInfoContentProps {
  name: string;
  waringCnt: number;
  introduce: string;
  stacks: SelectBoxField[];
}

const UserInfoContent = ({
  name,
  waringCnt,
  introduce,
  stacks,
}: UserInfoContentProps) => {
  return (
    <div className="mb-6 md:m-0 text-sm md:text-lg">
      <div className="flex mb-4">
        <div className="w-1/2">
          <p className="mr-4  font-semibold">닉네임</p>
          <p>{name}</p>
        </div>
        <div className="w-1/2">
          <p className="mr-4  font-semibold">경고횟수</p>
          <p>{waringCnt > 0 ? waringCnt : "0"}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className=" font-semibold">자기소개</p>
        <p className="text-black">
          {introduce.length === 0
            ? "아직 소개를 작성하지 않았습니다. 팀원들에게 나를 소개하는 글을 작성해보세요"
            : introduce}
        </p>
      </div>

      <div>
        <p className=" font-semibold mb-2">기술스택</p>
        <ul className="flex flex-wrap gap-2">
          {stacks.length === 0
            ? "선택된 기술스택이 없습니다."
            : stacks.map((stack) => (
                <li
                  className="text-xs md:text-base border rounded-md px-3 py-1"
                  key={stack.value}
                >
                  <span>{stack.label}</span>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default UserInfoContent;
