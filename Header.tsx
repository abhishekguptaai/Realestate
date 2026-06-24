import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import {
  Sun,
  Moon,
  Heart,
  GitCompare,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Building2,
  Home,
  Store,
  Briefcase,
  Newspaper,
  Calculator,
  Phone,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { label: "Buy", href: "/properties?purpose=sale", icon: Home },
  { label: "Rent", href: "/properties?purpose=rent", icon: Building2 },
  { label: "Commercial", href: "/properties?type=commercial", icon: Store },
  { label: "Projects", href: "/projects", icon: Briefcase },
  { label: "Agents", href: "/agents", icon: User },
  { label: "Blog", href: "/blog", icon: Newspaper },
  { label: "Tools", href: "/tools", icon: Calculator },
  { label: "Contact", href: "/contact", icon: Phone },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const { savedProperties, compareList } = useData();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    return location.pathname === href.split("?")[0];
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="container-custom flex h-16 md:h-[72px] items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <Building2 className="h-7 w-7 text-[#C4703F]" />
          <span className="text-xl md:text-2xl font-semibold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Estate<span className="text-[#C4703F]">One</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive(link.href)
                  ? "text-[#C4703F] bg-[#C4703F]/10"
                  : "text-foreground/80 hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Compare */}
          <Button variant="ghost" size="icon" className="h-9 w-9 relative hidden sm:flex" asChild>
            <Link to="/dashboard/compare">
              <GitCompare className="h-4 w-4" />
              {compareList.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-[#C4703F] text-[10px] text-white flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </Link>
          </Button>

          {/* Saved */}
          <Button variant="ghost" size="icon" className="h-9 w-9 relative hidden sm:flex" asChild>
            <Link to="/dashboard/saved">
              <Heart className="h-4 w-4" />
              {savedProperties.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-[#C4703F] text-[10px] text-white flex items-center justify-center">
                  {savedProperties.length}
                </span>
              )}
            </Link>
          </Button>

          {/* Auth */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 gap-2 px-2">
                  <div className="h-7 w-7 rounded-full bg-[#C4703F]/10 flex items-center justify-center overflow-hidden">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                    ) : (
                      <User className="h-4 w-4 text-[#C4703F]" />
                    )}
                  </div>
                  <span className="hidden md:inline text-sm font-medium">{user?.name?.split(" ")[0]}</span>
                  <ChevronDown className="h-3 w-3 hidden md:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/saved">Saved Properties</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/profile">Profile Settings</Link>
                </DropdownMenuItem>
                {user?.role === "agent" && (
                  <DropdownMenuItem asChild>
                    <Link to="/agent-dashboard">Agent Panel</Link>
                  </DropdownMenuItem>
                )}
                {user?.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin">Admin Panel</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="hidden sm:flex" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button size="sm" className="bg-[#C4703F] hover:bg-[#A85A2F] text-white" asChild>
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                    <Building2 className="h-6 w-6 text-[#C4703F]" />
                    <span className="text-xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Estate<span className="text-[#C4703F]">One</span>
                    </span>
                  </Link>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive(link.href)
                          ? "text-[#C4703F] bg-[#C4703F]/10"
                          : "text-foreground/80 hover:bg-muted"
                      }`}
                    >
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="p-4 border-t space-y-2">
                  {isAuthenticated ? (
                    <>
                      <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                        <Button variant="outline" className="w-full">Dashboard</Button>
                      </Link>
                      <Button variant="ghost" className="w-full text-red-600" onClick={logout}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setMobileOpen(false)}>
                        <Button variant="outline" className="w-full">Sign In</Button>
                      </Link>
                      <Link to="/register" onClick={() => setMobileOpen(false)}>
                        <Button className="w-full bg-[#C4703F] hover:bg-[#A85A2F]">Get Started</Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
