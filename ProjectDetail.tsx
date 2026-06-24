import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { toast } from "sonner";
import {
  MapPin, ArrowLeft, Calendar, Building2, CheckCircle, BadgeCheck,
  Phone, MessageSquare, Star, FileText, Play, Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { getProjectBySlug } = useData();
  const project = getProjectBySlug(slug || "");
  const [visitForm, setVisitForm] = useState({ name: "", phone: "", email: "", date: "", time: "", message: "" });

  if (!project) {
    return (
      <div className="container-custom py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Project Not Found</h2>
        <Link to="/projects">
          <Button>Browse Projects</Button>
        </Link>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    pre_launch: "bg-[#6B4C8A]",
    new_launch: "bg-[#C4703F]",
    under_construction: "bg-[#B8860B]",
    ready_possession: "bg-[#2D7D4A]",
    completed: "bg-[#2B6CB0]",
  };

  const handleVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Site visit scheduled! We will contact you shortly.");
    setVisitForm({ name: "", phone: "", email: "", date: "", time: "", message: "" });
  };

  return (
    <div>
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px]">
        <img src={project.coverImage} alt={project.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container-custom">
            <Link to="/projects" className="text-white/70 hover:text-white text-sm flex items-center gap-1 mb-4">
              <ArrowLeft className="h-4 w-4" /> Back to Projects
            </Link>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className={`${statusColors[project.projectStatus]} text-white`}>
                {project.projectStatus.replace("_", " ")}
              </Badge>
              {project.isVerified && (
                <Badge className="bg-[#2B6CB0] text-white flex items-center gap-1">
                  <BadgeCheck className="h-3 w-3" /> RERA Verified
                </Badge>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              {project.name}
            </h1>
            <p className="text-white/80 mt-2 flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {project.locality}, {project.city}
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Units", value: project.totalUnits },
                { label: "Towers", value: project.totalTowers },
                { label: "Possession", value: new Date(project.possessionDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) },
                { label: "RERA ID", value: project.reraId?.split("/").pop() || "N/A" },
              ].map((stat) => (
                <div key={stat.label} className="bg-muted rounded-lg p-4 text-center">
                  <p className="font-semibold text-lg">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <Tabs defaultValue="overview">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="pricelist">Price List</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">About {project.name}</h2>
                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Project Highlights</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {project.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-[#C4703F]" />
                        <span className="text-sm">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Configurations</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.configurations.map((c) => (
                      <Badge key={c} variant="outline" className="px-4 py-2">{c}</Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pricelist">
                <div className="bg-muted rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-[#C4703F]/10">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium">Unit Type</th>
                        <th className="px-4 py-3 text-left font-medium">Area (sqft)</th>
                        <th className="px-4 py-3 text-left font-medium">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.configurations.map((config, i) => (
                        <tr key={config} className="border-t">
                          <td className="px-4 py-3 font-medium">{config}</td>
                          <td className="px-4 py-3 text-muted-foreground">{1200 + i * 400}+ sqft</td>
                          <td className="px-4 py-3 text-[#C4703F] font-medium">
                            Rs. {((project.priceRangeMin + i * (project.priceRangeMax - project.priceRangeMin) / 4) / 100000).toFixed(0)}L+
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="inventory">
                <InventoryTable project={project} />
              </TabsContent>

              <TabsContent value="amenities">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {["Swimming Pool", "Gymnasium", "Club House", "Children's Play Area", "Jogging Track", "24/7 Security", "Power Backup", "Parking", "Landscaped Gardens", "Indoor Games", "Yoga Deck", "Community Hall"].map((a) => (
                    <div key={a} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <CheckCircle className="h-4 w-4 text-[#C4703F]" />
                      <span className="text-sm">{a}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price */}
            <div className="bg-card rounded-xl border border-border p-6">
              <p className="text-sm text-muted-foreground">Price Range</p>
              <p className="text-2xl font-bold text-[#C4703F]">Rs. {(project.priceRangeMin / 100000).toFixed(0)}L - {(project.priceRangeMax / 10000000).toFixed(1)}Cr</p>
              <p className="text-sm text-muted-foreground mt-1">Rs. {project.pricePerSqft}/sqft</p>
              <div className="mt-4 space-y-2">
                <Button className="w-full bg-[#C4703F] hover:bg-[#A85A2F]">
                  <Phone className="h-4 w-4 mr-2" /> Contact Builder
                </Button>
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" /> Download Brochure
                </Button>
              </div>
            </div>

            {/* Schedule Visit */}
            <div className="bg-[#F0EBE4] dark:bg-[#2A2A2A] rounded-xl p-6">
              <h3 className="font-semibold mb-4">Schedule Site Visit</h3>
              <form onSubmit={handleVisitSubmit} className="space-y-3">
                <Input placeholder="Name" value={visitForm.name} onChange={(e) => setVisitForm({ ...visitForm, name: e.target.value })} required />
                <Input placeholder="Phone" value={visitForm.phone} onChange={(e) => setVisitForm({ ...visitForm, phone: e.target.value })} required />
                <Input placeholder="Email" type="email" value={visitForm.email} onChange={(e) => setVisitForm({ ...visitForm, email: e.target.value })} />
                <div className="grid grid-cols-2 gap-2">
                  <Input type="date" value={visitForm.date} onChange={(e) => setVisitForm({ ...visitForm, date: e.target.value })} />
                  <Input type="time" value={visitForm.time} onChange={(e) => setVisitForm({ ...visitForm, time: e.target.value })} />
                </div>
                <Textarea placeholder="Message (optional)" value={visitForm.message} onChange={(e) => setVisitForm({ ...visitForm, message: e.target.value })} rows={2} />
                <Button type="submit" className="w-full bg-[#C4703F] hover:bg-[#A85A2F]">
                  <Calendar className="h-4 w-4 mr-2" /> Schedule Visit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InventoryTable({ project }: { project: any }) {
  const [towerFilter, setTowerFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Demo inventory data
  const inventory = Array.from({ length: 20 }, (_, i) => {
    const tower = `Tower ${String.fromCharCode(65 + Math.floor(i / 5))}`;
    const floor = 1 + Math.floor((i % 20) / 4);
    const statuses = ["available", "sold", "blocked", "reserved"];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const unitTypes = project.configurations;
    return {
      id: i + 1,
      tower,
      floor,
      unitNumber: `${floor}${String(i % 4 + 1).padStart(2, "0")}`,
      unitType: unitTypes[i % unitTypes.length],
      area: 1200 + (i % 5) * 200,
      price: project.priceRangeMin + (i % 5) * 2000000,
      status,
    };
  });

  const filtered = inventory.filter((u) => {
    if (towerFilter !== "all" && u.tower !== towerFilter) return false;
    if (statusFilter !== "all" && u.status !== statusFilter) return false;
    return true;
  });

  const statusColor: Record<string, string> = {
    available: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
    sold: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
    blocked: "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
    reserved: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  };

  const towers = [...new Set(inventory.map((u) => u.tower))];

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-4">
        <select value={towerFilter} onChange={(e) => setTowerFilter(e.target.value)} className="px-3 py-2 rounded-lg border text-sm">
          <option value="all">All Towers</option>
          {towers.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-lg border text-sm">
          <option value="all">All Status</option>
          <option value="available">Available</option>
          <option value="sold">Sold</option>
          <option value="blocked">Blocked</option>
          <option value="reserved">Reserved</option>
        </select>
      </div>

      <div className="bg-muted rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#C4703F]/10">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Tower</th>
              <th className="px-4 py-3 text-left font-medium">Floor</th>
              <th className="px-4 py-3 text-left font-medium">Unit</th>
              <th className="px-4 py-3 text-left font-medium">Type</th>
              <th className="px-4 py-3 text-left font-medium">Area</th>
              <th className="px-4 py-3 text-left font-medium">Price</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((unit) => (
              <tr key={unit.id} className="border-t">
                <td className="px-4 py-3 font-medium">{unit.tower}</td>
                <td className="px-4 py-3">{unit.floor}</td>
                <td className="px-4 py-3">{unit.unitNumber}</td>
                <td className="px-4 py-3">{unit.unitType}</td>
                <td className="px-4 py-3">{unit.area} sqft</td>
                <td className="px-4 py-3 text-[#C4703F]">Rs. {(unit.price / 100000).toFixed(0)}L</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs capitalize ${statusColor[unit.status]}`}>
                    {unit.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
