import { Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { MapPin, ArrowRight, Calendar, Building2, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Projects() {
  const { projects } = useData();

  const statusFilter = ["all", "pre_launch", "new_launch", "under_construction", "ready_possession"];

  return (
    <div>
      {/* Header */}
      <div className="bg-[#1A1A1A] text-white py-12 md:py-16">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">Projects</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
            New Projects & Developments
          </h1>
          <p className="text-white/60 mt-2">Explore upcoming and under-construction projects</p>
        </div>
      </div>

      <div className="container-custom py-8">
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="flex-wrap h-auto">
            {statusFilter.map((s) => (
              <TabsTrigger key={s} value={s} className="capitalize">
                {s.replace("_", " ")}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all card-hover">
              <div className="relative aspect-video">
                <Link to={`/project/${project.slug}`}>
                  <img src={project.coverImage} alt={project.name} className="w-full h-full object-cover" />
                </Link>
                <div className="absolute top-4 left-4">
                  <Badge className={`${
                    project.projectStatus === "new_launch" ? "bg-[#C4703F]" :
                    project.projectStatus === "under_construction" ? "bg-[#B8860B]" :
                    project.projectStatus === "ready_possession" ? "bg-[#2D7D4A]" :
                    "bg-[#2B6CB0]"
                  } text-white`}>
                    {project.projectStatus.replace("_", " ")}
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-[#C4703F] font-medium">{project.builder}</p>
                <Link to={`/project/${project.slug}`}>
                  <h2 className="text-xl font-semibold mt-1 hover:text-[#C4703F] transition-colors">{project.name}</h2>
                </Link>
                <p className="text-muted-foreground flex items-center gap-1 mt-2">
                  <MapPin className="h-4 w-4" /> {project.locality}, {project.city}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.configurations.map((c) => (
                    <span key={c} className="text-sm bg-muted px-3 py-1 rounded-full">{c}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div>
                    <p className="text-lg font-bold text-[#C4703F]">Rs. {(project.priceRangeMin / 100000).toFixed(0)}L - {(project.priceRangeMax / 10000000).toFixed(1)}Cr</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Calendar className="h-3 w-3" /> Possession: {new Date(project.possessionDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                    </p>
                  </div>
                  <Link to={`/project/${project.slug}`}>
                    <Button className="bg-[#C4703F] hover:bg-[#A85A2F]">
                      View Details <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
