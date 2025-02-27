import NavLink from "../../common/NavLink";
import { navPath } from "./SectionLayout";

interface SectionTabNavProps {
  navPaths: navPath[];
}

const SectionTabNav = ({ navPaths }: SectionTabNavProps) => {
  return (
    <nav>
      <ul className="flex justify-around md:block text-sm md:text-base">
        {navPaths.map((path) => (
          <li
            key={path.label}
            className="w-1/3 md:w-full text-center md:text-left"
          >
            <NavLink
              href={path.path}
              activeClassName="text-primary border-b-2 border-b-primary md:border-none md:bg-primary md:bg-black/10 md:rounded-lg"
              className="text-sm md:text-lg block w-full py-2 md:p-4 text-[rgba(0,0,0,0.5)] hover:text-primary transition-all"
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