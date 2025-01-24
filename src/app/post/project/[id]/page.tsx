import ProjectPost from "./_components/ProjectPost";

const ProjectPostPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id: postId } = await params;

  return <ProjectPost id={postId} />;
};

export default ProjectPostPage;
