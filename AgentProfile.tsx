import { useParams, Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { MapPin, Phone, Mail, Star, Building2, CheckCircle, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AgentProfile() {
  const { id } = useParams<{ id: string }>();
  const { getAgentById, properties } = useData();
  const agent = getAgentById(Number(id));

  if (!agent) {
    return (
      <div className="container-custom py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Agent Not Found</h2>
        <Link to="/agents">
          <Button>Browse Agents</Button>
        </Link>
      </div>
    );
  }

  const agentProperties = properties.filter((p) => p.agentName === agent.name);

  return (
    <div>
      <div className="bg-[#1A1A1A] text-white py-12">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-sm text-white/60 mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link to="/agents" className="hover:text-white">Agents</Link>
            <span>/</span>
            <span className="text-white">{agent.name}</span>
          </div>
        </div>
      </div>

      <div className="container-custom -mt-8">
        <div className="bg-card rounded-xl border border-border p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            <img src={agent.avatar} alt={agent.name} className="h-28 w-28 rounded-full object-cover border-4 border-[#C4703F]/20 self-center md:self-start" />
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h1 className="text-2xl font-semibold">{agent.name}</h1>
                {agent.verified && <CheckCircle className="h-5 w-5 text-[#2B6CB0]" />}
              </div>
              <p className="text-muted-foreground">{agent.companyName}</p>
              <div className="flex items-center justify-center md:justify-start gap-1 mt-2">
                <Star className="h-4 w-4 fill-[#C9A84C] text-[#C9A84C]" />
                <span className="font-medium">{agent.rating}</span>
                <span className="text-muted-foreground">({agent.reviewCount} reviews)</span>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-[#C4703F]" /> {agent.city}</span>
                <span className="flex items-center gap-1"><Building2 className="h-4 w-4 text-[#C4703F]" /> {agent.experience} years</span>
                <span>{agent.totalListings} listings</span>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                {agent.specialization.map((s) => (
                  <Badge key={s} variant="outline">{s}</Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 self-center">
              <Button className="bg-[#C4703F] hover:bg-[#A85A2F]">
                <Phone className="h-4 w-4 mr-2" /> {agent.phone}
              </Button>
              <Button variant="outline">
                <Mail className="h-4 w-4 mr-2" /> {agent.email}
              </Button>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-muted-foreground">{agent.about}</p>
          </div>
        </div>
      </div>

      {/* Agent's Listings */}
      {agentProperties.length > 0 && (
        <div className="container-custom py-8">
          <h2 className="text-xl font-semibold mb-4">Listings by {agent.name}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {agentProperties.map((p) => (
              <Link key={p.id} to={`/property/${p.slug}`} className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all">
                <div className="aspect-[4/3]">
                  <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <p className="font-bold text-[#C4703F]">Rs. {(p.price / 100000).toFixed(1)}L</p>
                  <h3 className="font-medium mt-1 group-hover:text-[#C4703F] transition-colors">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.locality}, {p.city}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
