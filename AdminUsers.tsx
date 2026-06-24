import { useState } from "react";
import { Search, Filter, MoreHorizontal, Shield, UserX, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const users = [
  { id: 1, name: "Rahul Sharma", email: "rahul@email.com", role: "user", status: "active", city: "Bangalore", lastActive: "2 min ago" },
  { id: 2, name: "Priya Patel", email: "priya@email.com", role: "agent", status: "active", city: "Hyderabad", lastActive: "5 min ago" },
  { id: 3, name: "Vikram Reddy", email: "vikram@email.com", role: "agent", status: "active", city: "Hyderabad", lastActive: "1 hour ago" },
  { id: 4, name: "Ananya Gupta", email: "ananya@email.com", role: "user", status: "inactive", city: "Mumbai", lastActive: "3 days ago" },
  { id: 5, name: "Rajesh Kumar", email: "rajesh@email.com", role: "builder", status: "pending", city: "Bangalore", lastActive: "1 day ago" },
  { id: 6, name: "Sneha Reddy", email: "sneha@email.com", role: "user", status: "active", city: "Chennai", lastActive: "10 min ago" },
  { id: 7, name: "Admin User", email: "admin@estateone.com", role: "admin", status: "active", city: "Mumbai", lastActive: "Just now" },
];

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = users.filter((u) => {
    if (roleFilter !== "all" && u.role !== roleFilter) return false;
    if (search && !u.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const roleColors: Record<string, string> = {
    admin: "bg-purple-100 text-purple-700",
    agent: "bg-blue-100 text-blue-700",
    builder: "bg-amber-100 text-amber-700",
    user: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Users</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <Input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="sm:w-56 bg-[#1E1E1E] border-white/10" />
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-white/10 bg-[#1E1E1E] text-sm text-white">
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="agent">Agent</option>
            <option value="builder">Builder</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <div className="bg-[#1E1E1E] border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 font-medium text-white/60">User</th>
                <th className="text-left p-4 font-medium text-white/60">Role</th>
                <th className="text-left p-4 font-medium text-white/60">Status</th>
                <th className="text-left p-4 font-medium text-white/60">City</th>
                <th className="text-left p-4 font-medium text-white/60">Last Active</th>
                <th className="text-left p-4 font-medium text-white/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-[#C4703F]/20 flex items-center justify-center text-[#C4703F] font-medium text-sm">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-medium">{u.name}</p>
                        <p className="text-xs text-white/40">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4"><Badge className={roleColors[u.role]}>{u.role}</Badge></td>
                  <td className="p-4">
                    <span className={`text-xs ${u.status === "active" ? "text-green-400" : u.status === "inactive" ? "text-red-400" : "text-amber-400"}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="p-4 text-white/60">{u.city}</td>
                  <td className="p-4 text-white/40 text-xs">{u.lastActive}</td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <button onClick={() => toast.info("Edit user")} className="h-8 w-8 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/10">
                        <Shield className="h-4 w-4 text-white/60" />
                      </button>
                      <button onClick={() => toast.info("Deactivate user")} className="h-8 w-8 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/10">
                        <UserX className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
