import {
  AppWindow,
  // BarChart3,
  CircleHelp,
  LogOut,
  // Users,
} from "lucide-react";

import {
  NavLink,
  useLocation,
} from "react-router-dom";

const menuItems = [
  {
    title: "Applications",
    path: "/dashboard",
    icon: AppWindow,
    activePaths: ["/dashboard", "/applications"],
  },
  // {
  //   title: "Registration Form",
  //   path: "/registration-form",
  //   icon: AppWindow,
  //   activePaths: ["/registration-form"],
  // },
//   {
//     title: "Users",
//     path: "/users",
//     icon: Users,
//     activePaths: ["/users"],
//   },
//   {
//     title: "Reports",
//     path: "/reports",
//     icon: BarChart3,
//     activePaths: ["/reports"],
//   },
];

export default function Sidebar() {
  const location = useLocation();

  const isMenuActive = (
    activePaths: string[]
  ) => {
    return activePaths.some((path) =>
      location.pathname.startsWith(path)
    );
  };

  return (
    <aside className="fixed left-0 top-16 z-40 hidden h-[calc(100vh-64px)] w-64 flex-col border-r border-outline-variant bg-surface-container-low p-4 md:flex">
      <div className="mb-4">
        <div className="flex items-center gap-3 rounded-xl bg-surface-container-high p-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
            <AppWindow size={21} />
          </div>
          <div>
            <div className="text-[15px] font-bold text-on-surface">
              All Applicatins
            </div>
            <div className="text-xs text-on-surface-variant">
              Management Console
            </div>
          </div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isMenuActive(
            item.activePaths
          );

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 rounded-lg p-3
                transition-all duration-200
                ${
                  active
                    ? "bg-primary-container font-bold text-[#ffffff] shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container-high"
                }
              `}
            >
              <Icon size={20} />

              <span className="text-xs uppercase tracking-wider">
                {item.title}
              </span>
            </NavLink>
          );
        })}

      </nav>

      <div className="flex flex-col gap-1 border-t border-outline-variant pt-4">

        <button className="flex items-center gap-3 rounded-lg p-3 text-on-surface-variant hover:bg-surface-container-high">
          <CircleHelp size={20} />

          <span className="text-xs uppercase tracking-wider">
            Support
          </span>
        </button>

        <button className="flex items-center gap-3 rounded-lg p-3 text-on-surface-variant hover:bg-surface-container-high">
          <LogOut size={20} />

          <span className="text-xs uppercase tracking-wider">
            Log Out
          </span>
        </button>

      </div>
    </aside>
  );
}