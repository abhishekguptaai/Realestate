import { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { Plus, Edit, Trash2, Eye, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function AgentListings() {
  const { properties } = useData();
  const [search, setSearch] = useState("");
  const myListings = properties.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>My Listings</h1>
          <p className="text-muted-foreground">{myListings.length} properties listed</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Input placeholder="Search listings..." value={search} onChange={(e) => setSearch(e.target.value)} className="sm:w-64" />
          <Link to="/agent-dashboard/add-property">
            <Button className="bg-[#C4703F] hover:bg-[#A85A2F] shrink-0">
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 font-medium">Property</th>
                <th className="text-left p-4 font-medium">Price</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Views</th>
                <th className="text-left p-4 font-medium">Leads</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myListings.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={p.coverImage} alt={p.title} className="h-12 w-12 rounded object-cover" />
                      <div>
                        <p className="font-medium">{p.title}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {p.locality}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-[#C4703F] font-medium">Rs. {(p.price / 100000).toFixed(1)}L</td>
                  <td className="p-4">
                    <Badge className={p.status === "active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}>
                      {p.status}
                    </Badge>
                  </td>
                  <td className="p-4">{p.viewCount}</td>
                  <td className="p-4">{p.enquiryCount}</td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <button className="h-8 w-8 rounded-lg border flex items-center justify-center hover:bg-muted">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="h-8 w-8 rounded-lg border flex items-center justify-center hover:bg-muted">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button onClick={() => toast.info("Delete feature coming soon")} className="h-8 w-8 rounded-lg border flex items-center justify-center hover:bg-red-50 text-red-600">
                        <Trash2 className="h-4 w-4" />
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
