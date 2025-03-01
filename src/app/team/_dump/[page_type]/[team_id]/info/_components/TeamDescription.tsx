const TeamDescription = ({ content }: { content?: string }) => (
  <div className="mt-4 pt-4">
    <h3 className="text-lg font-bold mb-4">My Team 소개</h3>
    <p className="text-gray-800">
      {content || "프로젝트 설명 ..."}
    </p>
  </div>
);

export default TeamDescription;