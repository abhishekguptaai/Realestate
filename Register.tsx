import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Building2, Eye, EyeOff, ArrowLeft, User, Briefcase, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Register() {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<"user" | "agent" | "builder">("user");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", password: "", phone: "", city: "",
    companyName: "", reraNumber: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        role,
        city: form.city,
        companyName: form.companyName,
        reraNumber: form.reraNumber,
      });
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    }
  };

  const roles = [
    { value: "user" as const, label: "Buyer / Renter", icon: User, desc: "Looking to buy or rent" },
    { value: "agent" as const, label: "Agent / Broker", icon: Briefcase, desc: "List and sell properties" },
    { value: "builder" as const, label: "Builder", icon: HardHat, desc: "Showcase projects" },
  ];

  return (
    <div className="min-h-screen flex">
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
            Join EstateOne
          </h2>
          <p className="text-white/70 max-w-md">
            Create your account to start your property journey. Whether you're buying, selling, or building — we've got you covered.
          </p>
        </div>
        <div className="relative z-10 text-sm text-white/50">
          &copy; {new Date().getFullYear()} EstateOne. All rights reserved.
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 md:p-12 overflow-auto">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-[#C4703F] mb-8 lg:hidden">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          <h1 className="text-2xl font-semibold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            Create Account
          </h1>
          <p className="text-muted-foreground mb-6">Choose your account type and get started</p>

          {/* Role Selection */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {roles.map((r) => (
              <button
                key={r.value}
                onClick={() => setRole(r.value)}
                className={`p-3 rounded-lg border text-center transition-colors ${
                  role === r.value ? "border-[#C4703F] bg-[#C4703F]/10" : "border-input hover:border-[#C4703F]/50"
                }`}
              >
                <r.icon className={`h-5 w-5 mx-auto mb-1 ${role === r.value ? "text-[#C4703F]" : "text-muted-foreground"}`} />
                <p className="text-xs font-medium">{r.label}</p>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Full Name *</label>
                <Input placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Phone</label>
                <Input placeholder="+91 98765 43210" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Email *</label>
              <Input type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">City</label>
              <Input placeholder="Bangalore" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            </div>
            {(role === "agent" || role === "builder") && (
              <>
                <div>
                  <label className="text-sm font-medium mb-1 block">Company Name</label>
                  <Input placeholder="ABC Realty" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">RERA Number</label>
                  <Input placeholder="RERA Registration Number" value={form.reraNumber} onChange={(e) => setForm({ ...form, reraNumber: e.target.value })} />
                </div>
              </>
            )}
            <div>
              <label className="text-sm font-medium mb-1 block">Password *</label>
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} placeholder="Min 8 characters" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                  {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full h-11 bg-[#C4703F] hover:bg-[#A85A2F]" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account? <Link to="/login" className="text-[#C4703F] hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
