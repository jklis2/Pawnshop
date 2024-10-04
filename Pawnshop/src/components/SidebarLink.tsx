import { NavLink } from "react-router-dom";

type SidebarLinkProps = {
  to: string;
  iconSrc: string;
  label: string;
};

export default function SidebarLink({ to, iconSrc, label }: SidebarLinkProps) {
  return (
    <li>
      <NavLink
        to={to}
        end
        className={({ isActive }) =>
          isActive
            ? "p-2 bg-gray-700 flex items-center"
            : "p-2 hover:bg-gray-600 flex items-center"
        }
      >
        <img src={iconSrc} alt={`${label} Icon`} className="w-6 h-6 mr-2" />
        {label}
      </NavLink>
    </li>
  );
}
