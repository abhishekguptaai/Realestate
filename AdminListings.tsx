import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Search, CheckCircle, XCircle, Star, Eye, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminListings() {
  const { properties } = useData();
  const [search, setSearch] = useState("");
  const [statusTab, setStatusTab] = useState("all");

  const tabs = ["all", "pending_approval", "active", "sold", "rejected"];
  const statusLabels: Record<string, string> = {
    all: "All",
    pending_approval: "Pending",
    active: "Approved",
    sold: "Sold",
    rejected: "Rejected",
  };

  const filtered = properties.filter((p) => {
    if (statusTab !== "all" && p.status !== statusTab) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const statusColors: Record<string, string> = {
    active: "bg-green-100 text-green-700",
    pending_approval: "bg-amber-100 text-amber-700",
    sold: "bg-blue-100 text-blue-700",
    rejected: "bg-red-100 text-red-700",
    draft: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Listings Moderation</h1>
        <Input placeholder="Search listings..." value={search} onChange={(e) => setSearch(e.target.value)} className="sm:w-56 bg-[#1E1E1E] border-white/10" />
      </div>

      <div className="flex gap-2">
        {tabs.map((t) => (
          <button key={t} onClick={() => setStatusTab(t)} className={`px-4 py-2 rounded-lg text-sm transition-colors ${statusTab === t ? "bg-[#C4703F] text-white" : "bg-[#1E1E1E] text-white/60 hover:text-white"}`}>
            {statusLabels[t]} ({t === "all" ? properties.length : properties.filter((p) => p.status === t).length})
          </button>
        ))}
      </div>

      <div className="bg-[#1E1E1E] border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 font-medium text-white/60">Property</th>
                <th className="text-left p-4 font-medium text-white/60">Agent</th>
                <th className="text-left p-4 font-medium text-white/60">Price</th>
                <th className="text-left p-4 font-medium text-white/60">Status</th>
                <th className="text-left p-4 font-medium text-white/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={p.coverImage} alt={p.title} className="h-12 w-16 rounded object-cover" />
                      <div>
                        <p className="text-white font-medium">{p.title}</p>
                        <p className="text-xs text-white/40 flex items-center gap-1"><MapPin className="h-3 w-3" />{p.locality}, {p.city}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-white/60">{p.agentName}</td>
                  <td className="p-4 text-[#C4703F]">Rs. {(p.price / 100000).toFixed(1)}L</td>
                  <td className="p-4"><Badge className={statusColors[p.status] || "bg-gray-100"}>{p.status.replace("_", " ")}</Badge></td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <button onClick={() => toast.success("Listing approved!")} className="h-8 w-8 rounded-lg border border-green-500/30 flex items-center justify-center hover:bg-green-500/10">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      </button>
                      <button onClick={() => toast.info("Listing rejected")} className="h-8 w-8 rounded-lg border border-red-500/30 flex items-center justify-center hover:bg-red-500/10">
                        <XCircle className="h-4 w-4 text-red-400" />
                      </button>
                      <button onClick={() => toast.info("Featured!")} className="h-8 w-8 rounded-lg border border-yellow-500/30 flex items-center justify-center hover:bg-yellow-500/10">
                        <Star className="h-4 w-4 text-yellow-400" />
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
