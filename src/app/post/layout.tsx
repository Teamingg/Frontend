import {ReactNode} from "react";
import BackButton from "@/components/Button/BackButton";

const PostDetailPageLayout = ({
  children
} : {
  children: ReactNode
}) => {
  return (
    <section className="pt-10 pb-20 relative max-w-2xl md:max-w-3xl lg:max-w-6xl mx-auto md:mx-auto">
      <BackButton/>
      <div className='flex items-center justify-between'>
        {children}
      </div>
    </section>
  );
};

export default PostDetailPageLayout;