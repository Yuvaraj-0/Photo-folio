import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

export function SidebarNav({ items, onLinkClick }) {
  return (
    <nav className="flex flex-col space-y-2">
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onLinkClick}
          className={({ isActive }) =>
            clsx(
              "flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700",
              isActive ? "bg-gray-900 font-bold" : "text-gray-300"
            )
          }
        >
          {Icon && <Icon className="w-5 h-5" />}
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
