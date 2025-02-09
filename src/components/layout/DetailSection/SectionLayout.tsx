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
      <div className="w-full h-[90vh] py-4 rounded-lg bg-[#f5f5f5] p-4">
        <div className="flex flex-col gap-4 h-full w-full lg:flex-row">
          {/* 좌측 ( 타이틀 & 네비게이션 ) */}
          <section className="w-full h-fit py-4 lg:w-1/4 lg:h-full">
            <h1 className="text-2xl font-semibold mb-4 px-4">{sectionTitle}</h1>
            <SectionTabNav navPaths={navPaths} />
          </section>

          {/* 우측 ( 섹션 컨텐츠 ) */}
          <section className="w-full h-full overflow-y-scroll scrollbar-hide">
            {children}
          </section>
        </div>
      </div>
  );
};

export default SectionLayout;
