import { ReactNode } from "react";
import BackButton from "@/components/Button/BackButton";

const PostDetailPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="min-h-[100svh] pt-10 pb-20 relative max-w-sm md:max-w-3xl lg:max-w-7xl mx-auto md:mx-auto">
      <div className="pl-4">
        <BackButton />
      </div>
      <div className="w-full flex flex-col items-center justify-between gap-2 md:gap-4">
        {children}
      </div>
    </section>
  );
};

export default PostDetailPageLayout;
