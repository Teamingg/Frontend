import SectionTabNav from "./SectionTabNav";

export interface navPath {
  label: string;
  path: string;
}

interface SectionLayoutProps {
  children: React.ReactNode;
  sectionTitle: string;
  navPaths: navPath[];
}

const SectionLayout = ({
  children,
  sectionTitle,
  navPaths,
}: SectionLayoutProps) => {
  return (
    <div className="w-full h-full md:max-w-[1400px] md:mx-auto">
      <div className="w-full h-full rounded-lg bg-white md:bg-[#f5f5f5] md:p-4">
        <div className="block md:flex gap-4 h-full w-full bg-[#f5f5f5]">
          {/* 좌측 ( 타이틀 & 네비게이션 ) */}
          <section className="md:w-1/4 md:h-full md:py-4 bg-white md:bg-[#f5f5f5]">
            <h1 className="text-center md:text-left text-lg md:text-2xl font-semibold md:mb-4 pt-4 md:pt-0 md:px-4">
              {sectionTitle}
            </h1>
            <SectionTabNav navPaths={navPaths} />
          </section>

          {/* 우측 ( 섹션 컨텐츠 ) */}
          <section className="w-full md:h-full">{children}</section>
        </div>
      </div>
    </div>
  );
};

export default SectionLayout;
