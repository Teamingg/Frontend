"use client";

import SectionLayout from "@/components/layout/DetailSection/SectionLayout";

const myPagePaths = [
  {
    label: "계정정보",
    path: "/my",
  },
  {
    label: "프로젝트",
    path: "/my/project",
  },
  {
    label: "멘토링",
    path: "/my/mentoring",
  },
];

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SectionLayout sectionTitle="마이페이지" navPaths={myPagePaths}>
      {children}
    </SectionLayout>
  );
};

export default layout;
