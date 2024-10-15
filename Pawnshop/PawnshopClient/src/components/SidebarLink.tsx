import { NavLink } from "react-router-dom";

type SidebarLinkProps = {
  to: string;
  iconSrc: string;
  label: string;
};

export default function SidebarLink({ to, iconSrc, label }: SidebarLinkProps) {
  return (
    <li className="mb-2">
      <NavLink
        to={to}
        end
        className={({ isActive }) =>
          isActive
            ? "p-2 bg-emerald-600 text-white rounded-2xl flex items-center"
            : "p-2 hover:bg-emerald-700 text-white rounded-2xl flex items-center"
        }
      >
        <img src={iconSrc} alt={`${label} Icon`} className="w-6 h-6 mr-2" />
        {label}
      </NavLink>
    </li>
  );
}
