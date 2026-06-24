import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Heart,
  GitCompare,
  MessageSquare,
  Calendar,
  User,
  Settings,
  LogOut,
  Building2,
  Bell,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Saved Properties", href: "/dashboard/saved", icon: Heart },
  { label: "Compare", href: "/dashboard/compare", icon: GitCompare },
  { label: "My Enquiries", href: "/dashboard/enquiries", icon: MessageSquare },
  { label: "Site Visits", href: "/dashboard/visits", icon: Calendar },
  { label: "Profile", href: "/dashboard/profile", icon: User },
];

export default function DashboardSidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-card border-r border-border hidden lg:flex flex-col">
      <div className="p-4 border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-[#C4703F]" />
          <span className="text-xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Estate<span className="text-[#C4703F]">One</span>
          </span>
        </Link>
      </div>

      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#C4703F]/10 flex items-center justify-center overflow-hidden">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
            ) : (
              <User className="h-5 w-5 text-[#C4703F]" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#C4703F]" />
          </Button>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-auto">
        {sidebarLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              location.pathname === link.href
                ? "bg-[#C4703F]/10 text-[#C4703F] border-l-2 border-[#C4703F]"
                : "text-foreground/70 hover:bg-muted hover:text-foreground"
            }`}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-border">
        <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground/70 hover:bg-muted transition-colors mb-1">
          <Building2 className="h-4 w-4" />
          Back to Site
        </Link>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors w-full"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
