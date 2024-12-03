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
    <section className="w-full h-full pt-4 pb-8">
      <div className="w-full h-full rounded-lg bg-[#f5f5f5] p-4">
        <div className="flex gap-4 h-full w-full">
          {/* 좌측 ( 타이틀 & 네비게이션 ) */}
          <div className="w-1/4 h-full py-4">
            <h1 className="text-2xl font-semibold mb-4 px-4">{sectionTitle}</h1>

            <SectionTabNav navPaths={navPaths} />
          </div>

          {/* 우측 ( 섹션 컨텐츠 ) */}
          <div className="w-full h-full ">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default SectionLayout;
