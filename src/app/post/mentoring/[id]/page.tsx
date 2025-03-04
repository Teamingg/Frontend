import MentoringPost from "./_components/MentoringPost";

const MentoringPostPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id: postId } = await params;

  return <MentoringPost id={postId} />;
};

export default MentoringPostPage;
