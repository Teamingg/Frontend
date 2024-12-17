import TeamProjectNavigation from "@/components/layout/Layout/Header/GlobalNavigation";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <TeamProjectNavigation />

      <section className="w-full h-screen p-8 bg-[#f5f5f5] rounded-xl">
        {children}
      </section>
    </>
  );
};

export default layout;
