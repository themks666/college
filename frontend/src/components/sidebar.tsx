import  { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, UserPlus, Users, BookOpen, 
  Settings, LogOut, ChevronLeft, Menu, X, ShieldAlert 
} from "lucide-react";

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { to: "/dashboard", label: "Dashboard Overview", icon: LayoutDashboard },
    { to: "/register", label: "Register Student", icon: UserPlus },
    { to: "/students", label: "Student Directory", icon: Users },
    { to: "/courses", label: "Academic Courses", icon: BookOpen },
    { to: "/settings", label: "System Control", icon: Settings },
  ];

  return (
    <>
      {/* 📱 Mobile Header Toolbar */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-40 w-full">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-700 p-2 rounded-lg text-white">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <span className="font-bold text-slate-900 text-sm tracking-tight">EduCluster Admin</span>
        </div>
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)} 
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-700 transition"
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* 📱 Mobile Backdrop Shadow */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-40 md:hidden animate-fade-in"
        />
      )}

      {/* 🖥️ Desktop / Global Sidebar Layout Shell */}
      <aside 
        className={`
          fixed top-0 bottom-0 left-0 z-50 bg-white border-r border-slate-200 
          flex flex-col justify-between transition-all duration-300 ease-out
          md:sticky md:h-screen
          ${isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0"}
          ${isCollapsed ? "md:w-20" : "md:w-64"}
        `}
      >
        {/* Top Header Identity Strip */}
        <div>
          <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
            <div className={`flex items-center gap-3 overflow-hidden whitespace-nowrap transition-opacity duration-200 ${isCollapsed ? "md:opacity-0" : "opacity-100"}`}>
              <div className="bg-linear-to-br from-emerald-600 to-teal-700 p-2 rounded-xl text-white shadow-md shadow-emerald-700/10">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-slate-950 tracking-tight text-base">EduCluster v4</span>
            </div>

            {/* Collapse Trigger Arrow */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition"
            >
              <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Navigation Items Group Container */}
          <nav className="p-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileOpen(false)}
                  className={({ isActive }) => `
                    w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold relative group transition-all duration-200
                    ${isActive 
                      ? "text-emerald-800 bg-emerald-800/20" 
                      : "text-slate-700 hover:text-slate-950 hover:bg-slate-50"
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <div className="absolute left-0 top-3 bottom-3 w-1 bg-emerald-700 rounded-r-md animate-fade-in" />
                      )}

                      <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-emerald-700" : "text-slate-500 group-hover:text-slate-800"}`} />
                      
                      <span className={`transition-all duration-200 whitespace-nowrap overflow-hidden ${isCollapsed ? "md:w-0 md:opacity-0" : "w-auto opacity-100"}`}>
                        {item.label}
                      </span>
                      {isCollapsed && (
                        <div className="absolute left-20 hidden group-hover:block bg-slate-950 text-white text-xs px-3 py-2 rounded-md shadow-lg whitespace-nowrap z-50 pointer-events-none animate-scale-up">
                          {item.label}
                        </div>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Account Pin Block at Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-3 p-2 rounded-xl overflow-hidden">
            <div className="w-9 h-9 bg-emerald-800 text-white rounded-full flex items-center justify-center font-bold text-sm uppercase shrink-0 shadow-sm">
              AD
            </div>
            <div className={`flex flex-col overflow-hidden whitespace-nowrap transition-all duration-200 ${isCollapsed ? "md:w-0 md:opacity-0" : "w-auto opacity-100"}`}>
              <span className="text-xs font-bold text-slate-950 truncate">Admin Director</span>
              <span className="text-[10px] font-medium text-slate-500 truncate">registrar@educluster.edu</span>
            </div>
          </div>

          <NavLink 
            to="/logout"
            className="w-full mt-2 flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition group"
          >
            <LogOut className="w-4 h-4 shrink-0 text-red-500 group-hover:text-red-700" />
            <span className={`transition-opacity duration-200 ${isCollapsed ? "md:opacity-0 md:w-0" : "opacity-100"}`}>
              Exit Cluster System
            </span>
          </NavLink>
        </div>
      </aside>
    </>
  );
}