import NavLink from "@/components/common/NavLink";

const NavPath = [
  {
    name: "전체",
    path: "/",
  },
  {
    name: "팀 프로젝트",
    path: "/project",
  },
  {
    name: "멘토링",
    path: "/mentoring",
  },
];

const LocalNavigation = () => {
  const activeClassName = "text-primary border-b-2 border-b-primary ";
  const className =
    "block py-3 w-full text-center text-black transition-colors hover:text-primary hover:text-opacity-80 hover:border-b-2 hover:border-b-primary hover:border-opacity-70";

  return (
    <nav className="md:max-w-[1400px] mx-auto mb-5">
      <ul className="flex justify-around ">
        {NavPath.map((path) => (
          <li key={path.path} className="w-1/3">
            <NavLink
              activeClassName={activeClassName}
              className={className}
              href={path.path}
            >
              {path.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LocalNavigation;