import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  FolderOpen,
  BarChart3,
  Settings,
  LogOut,
  FileText,
  Newspaper,
  MessageSquare,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Listings", href: "/admin/listings", icon: Building2 },
  { label: "Projects", href: "/admin/projects", icon: FolderOpen },
  { label: "Leads CRM", href: "/admin/leads", icon: MessageSquare },
  { label: "Blog CMS", href: "/admin/blog", icon: Newspaper },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-[#1A1A1A] border-r border-white/10 hidden lg:flex flex-col">
      <div className="p-4 border-b border-white/10">
        <Link to="/" className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-[#C4703F]" />
          <span className="text-xl font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Estate<span className="text-[#C4703F]">One</span>
          </span>
          <span className="text-xs bg-[#C4703F] text-white px-2 py-0.5 rounded-full ml-1">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {sidebarLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              location.pathname === link.href
                ? "bg-[#C4703F]/20 text-[#C4703F] border-l-2 border-[#C4703F]"
                : "text-white/70 hover:bg-white/5 hover:text-white"
            }`}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-white/10">
        <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:bg-white/5 transition-colors">
          <FileText className="h-4 w-4" />
          View Site
        </Link>
        <button onClick={logout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-950/20 transition-colors w-full">
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
