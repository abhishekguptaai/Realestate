import { Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { MapPin, Phone, Star, Building2, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function Agents() {
  const { agents } = useData();

  return (
    <div>
      <div className="bg-[#1A1A1A] text-white py-12 md:py-16">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">Agents</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Verified Real Estate Agents
          </h1>
          <p className="text-white/60 mt-2">Connect with trusted property experts in your city</p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex items-center gap-3 mb-8">
          <Input placeholder="Search agents by name or city..." className="max-w-md" />
          <select className="px-3 py-2 rounded-lg border text-sm">
            <option>All Cities</option>
            <option>Bangalore</option>
            <option>Hyderabad</option>
            <option>Mumbai</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div key={agent.id} className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all card-hover">
              <div className="flex items-start gap-4">
                <img src={agent.avatar} alt={agent.name} className="h-20 w-20 rounded-full object-cover border-2 border-border" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{agent.name}</h3>
                    {agent.verified && <CheckCircle className="h-4 w-4 text-[#2B6CB0]" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{agent.companyName}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 fill-[#C9A84C] text-[#C9A84C]" />
                    <span className="text-sm font-medium">{agent.rating}</span>
                    <span className="text-sm text-muted-foreground">({agent.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#C4703F]" /> {agent.city}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-[#C4703F]" /> {agent.experience} years experience
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="font-medium text-foreground">{agent.totalListings}</span> active listings
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {agent.specialization.map((s) => (
                  <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                ))}
              </div>

              <div className="flex gap-2 mt-6">
                <Button className="flex-1 bg-[#C4703F] hover:bg-[#A85A2F]">
                  <Phone className="h-4 w-4 mr-1" /> Contact
                </Button>
                <Link to={`/agent/${agent.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    View Profile <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
