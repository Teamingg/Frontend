import NavLink from "../NavLink";
import { navPath } from "./SectionLayout";

interface SectionTabNavProps {
  navPaths: navPath[];
}

const SectionTabNav = ({ navPaths }: SectionTabNavProps) => {
  return (
    <nav>
      <ul>
        {navPaths.map((path) => (
          <li key={path.label}>
            <NavLink
              href={path.path}
              activeClassName="text-lg block w-full p-4 text-primary bg-primary bg-opacity-10 rounded-lg transition-all"
              className="text-lg block w-full p-4 text-[rgba(0,0,0,0.5)] hover:text-primary transition-all"
            >
              {path.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SectionTabNav;
