import { ReactNode } from "react";
import BackButton from "@/components/Button/BackButton";

const PostDetailPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="h-svh px-4 md:px-6 pt-[75px] md:pt-[100px] pb-6 ">
      <div className="">
        <BackButton />
      </div>
      <div className="flex flex-col justify-between h-full">{children}</div>
    </section>
  );
};

export default PostDetailPageLayout;
