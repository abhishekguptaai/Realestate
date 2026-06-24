import { Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { FolderOpen, CheckCircle, XCircle, MapPin, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminProjects() {
  const { projects } = useData();

  const statusColors: Record<string, string> = {
    pre_launch: "bg-purple-100 text-purple-700",
    new_launch: "bg-[#C4703F]/20 text-[#C4703F]",
    under_construction: "bg-amber-100 text-amber-700",
    ready_possession: "bg-green-100 text-green-700",
    pending: "bg-gray-100 text-gray-700",
    approved: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Projects</h1>
        <Button className="bg-[#C4703F] hover:bg-[#A85A2F]">Add Project</Button>
      </div>

      <div className="bg-[#1E1E1E] border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 font-medium text-white/60">Project</th>
                <th className="text-left p-4 font-medium text-white/60">Builder</th>
                <th className="text-left p-4 font-medium text-white/60">City</th>
                <th className="text-left p-4 font-medium text-white/60">Status</th>
                <th className="text-left p-4 font-medium text-white/60">Units</th>
                <th className="text-left p-4 font-medium text-white/60">Possession</th>
                <th className="text-left p-4 font-medium text-white/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={p.coverImage} alt={p.name} className="h-12 w-16 rounded object-cover" />
                      <div>
                        <p className="text-white font-medium">{p.name}</p>
                        <p className="text-xs text-white/40">{p.configurations.join(", ")}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-white/60">{p.builder}</td>
                  <td className="p-4 text-white/60"><span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{p.city}</span></td>
                  <td className="p-4"><Badge className={statusColors[p.projectStatus] || "bg-gray-100"}>{p.projectStatus.replace("_", " ")}</Badge></td>
                  <td className="p-4 text-white/60">{p.totalUnits}</td>
                  <td className="p-4 text-white/60"><span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(p.possessionDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span></td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <button onClick={() => toast.success("Approved!")} className="h-8 w-8 rounded-lg border border-green-500/30 flex items-center justify-center hover:bg-green-500/10"><CheckCircle className="h-4 w-4 text-green-400" /></button>
                      <button onClick={() => toast.info("Manage inventory")} className="h-8 w-8 rounded-lg border border-blue-500/30 flex items-center justify-center hover:bg-blue-500/10"><FolderOpen className="h-4 w-4 text-blue-400" /></button>
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
