import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Search, Plus, Edit, Eye, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminBlog() {
  const { blogPosts } = useData();
  const [search, setSearch] = useState("");

  const filtered = blogPosts.filter((p) => !search || p.title.toLowerCase().includes(search.toLowerCase()));

  const statusColors: Record<string, string> = {
    published: "bg-green-100 text-green-700",
    draft: "bg-amber-100 text-amber-700",
    archived: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Blog CMS</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <Input placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} className="sm:w-56 bg-[#1E1E1E] border-white/10" />
          <Button className="bg-[#C4703F] hover:bg-[#A85A2F]"><Plus className="h-4 w-4 mr-1" /> New Article</Button>
        </div>
      </div>

      <div className="bg-[#1E1E1E] border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 font-medium text-white/60">Article</th>
                <th className="text-left p-4 font-medium text-white/60">Category</th>
                <th className="text-left p-4 font-medium text-white/60">Author</th>
                <th className="text-left p-4 font-medium text-white/60">Status</th>
                <th className="text-left p-4 font-medium text-white/60">Views</th>
                <th className="text-left p-4 font-medium text-white/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((post) => (
                <tr key={post.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={post.featuredImage} alt={post.title} className="h-12 w-16 rounded object-cover" />
                      <p className="text-white font-medium">{post.title}</p>
                    </div>
                  </td>
                  <td className="p-4"><Badge variant="outline" className="text-[#C4703F] border-[#C4703F]">{post.category}</Badge></td>
                  <td className="p-4 text-white/60">{post.author}</td>
                  <td className="p-4"><Badge className={statusColors[post.status] || "bg-gray-100"}>{post.status}</Badge></td>
                  <td className="p-4 text-white/60">{post.viewCount}</td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <button onClick={() => toast.info("Edit article")} className="h-8 w-8 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/10"><Edit className="h-4 w-4 text-white/60" /></button>
                      <button onClick={() => toast.info("View article")} className="h-8 w-8 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/10"><Eye className="h-4 w-4 text-white/60" /></button>
                      <button onClick={() => toast.info("Delete article")} className="h-8 w-8 rounded-lg border border-red-500/30 flex items-center justify-center hover:bg-red-500/10"><Trash2 className="h-4 w-4 text-red-400" /></button>
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
