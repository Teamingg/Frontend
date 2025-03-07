'use client';
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  console.log("Post params:", params);
  
  return <p>Post Form Params: {JSON.stringify(params)}</p>;
};

export default Page;