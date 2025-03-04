"use client";

import PostError from "../../_components/PostError";

const Error = ({ error }: { error: Error }) => {
  return <PostError message={error.message} />;
};

export default Error;
