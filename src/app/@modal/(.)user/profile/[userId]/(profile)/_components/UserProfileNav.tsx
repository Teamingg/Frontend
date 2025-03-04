import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";

const UserProfileNav = () => {
  const currentPath = usePathname();
  const { userId } = useParams();
  const router = useRouter();

  const UserProfileBasicPath = `/user/profile/${userId}`;

  const navPaths = [
    {
      label: "유저정보",
      path: `${UserProfileBasicPath}`,
    },
    {
      label: "프로젝트",
      path: `${UserProfileBasicPath}/project`,
    },
    {
      label: "멘토링",
      path: `${UserProfileBasicPath}/mentoring`,
    },
  ];

  return (
    <nav>
      <ul className="flex gap-4 px-4">
        {navPaths.map((path) => (
          <li
            onClick={() => router.replace(path.path)}
            key={path.label}
            className={`cursor-pointer transition-colors ${
              path.path === currentPath ? "text-primary" : "text-black"
            }`}
          >
            {path.label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default UserProfileNav;
