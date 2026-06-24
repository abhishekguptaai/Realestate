import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Building2, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Login() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    }
  };

  const demoAccounts = [
    { email: "user@estateone.com", role: "Buyer Account" },
    { email: "agent@estateone.com", role: "Agent Account" },
    { email: "admin@estateone.com", role: "Admin Account" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1A1A1A] text-white flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/images/properties/prop-05.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-[#C4703F]" />
            <span className="text-2xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Estate<span className="text-[#C4703F]">One</span>
            </span>
          </Link>
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-semibold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Welcome Back
          </h2>
          <p className="text-white/70 max-w-md">
            Sign in to access your saved properties, enquiries, and personalized recommendations.
          </p>
        </div>
        <div className="relative z-10 text-sm text-white/50">
          &copy; {new Date().getFullYear()} EstateOne. All rights reserved.
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-[#C4703F] mb-8 lg:hidden">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          <div className="lg:hidden mb-8">
            <Link to="/" className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-[#C4703F]" />
              <span className="text-xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Estate<span className="text-[#C4703F]">One</span>
              </span>
            </Link>
          </div>

          <h1 className="text-2xl font-semibold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            Sign In
          </h1>
          <p className="text-muted-foreground mb-6">Enter your credentials to access your account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Password</label>
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                  {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full h-11 bg-[#C4703F] hover:bg-[#A85A2F]" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account? <Link to="/register" className="text-[#C4703F] hover:underline">Create one</Link>
          </p>

          {/* Demo Accounts */}
          <div className="mt-8 p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-3">Demo Accounts (password: "password")</p>
            <div className="space-y-2">
              {demoAccounts.map((acc) => (
                <button
                  key={acc.email}
                  onClick={() => { setEmail(acc.email); setPassword("password"); }}
                  className="w-full text-left text-sm p-2 rounded bg-background hover:bg-[#C4703F]/10 transition-colors"
                >
                  <span className="font-medium">{acc.role}</span>
                  <span className="text-muted-foreground ml-2">{acc.email}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
