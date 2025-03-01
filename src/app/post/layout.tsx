import {ReactNode} from "react";
import BackButton from "@/components/Button/BackButton";

const PostDetailPageLayout = ({
  children
} : {
  children: ReactNode
}) => {
  return (
    <section className="pt-10 pb-20 relative max-w-sm md:max-w-3xl lg:max-w-7xl mx-auto md:mx-auto">
      <BackButton/>
      <div className='w-full flex flex-col lg:flex-row items-center justify-between gap-10'>
        {children}
      </div>
    </section>
  );
};

export default PostDetailPageLayout;