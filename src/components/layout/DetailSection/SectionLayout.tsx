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
    <div className="w-full h-[90vh] py-4 ">
      <div className="w-full h-full rounded-lg bg-[#f5f5f5] p-4">
        <div className="flex gap-4 h-full w-full">
          {/* 좌측 ( 타이틀 & 네비게이션 ) */}
          <section className="w-1/4 h-full py-4">
            <h1 className="text-2xl font-semibold mb-4 px-4">{sectionTitle}</h1>
            <SectionTabNav navPaths={navPaths} />
          </section>

          {/* 우측 ( 섹션 컨텐츠 ) */}
          <section className="w-full h-full ">{children}</section>
        </div>
      </div>
    </div>
  );
};

export default SectionLayout;
