import LocalNavigation from "@/layout/Navigation/LocalNavigation";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <LocalNavigation />
      <div className="p-4 md:p-8 bg-[#f5f5f5] md:max-w-[1400px] md:mx-auto md:rounded-2xl">
        {children}
      </div>
    </section>
  );
};

export default layout;
