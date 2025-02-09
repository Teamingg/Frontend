import NavLink from "../../common/NavLink";
import { navPath } from "./SectionLayout";

interface SectionTabNavProps {
  navPaths: navPath[];
}

const SectionTabNav = ({ navPaths }: SectionTabNavProps) => {
  return (
    <nav>
      <ul className="sm:flex sm:flex-row sm:gap-5 lg:block">
        {navPaths.map((path) => (
          <li key={path.label} className="w-full text-lg text-center lg:text-left">
            <NavLink
              href={path.path}
              activeClassName="block w-full p-4 text-primary bg-primary bg-opacity-10 rounded-lg transition-all"
              className="block w-full p-4 text-[rgba(0,0,0,0.5)] hover:text-primary transition-all">
              {path.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SectionTabNav;
