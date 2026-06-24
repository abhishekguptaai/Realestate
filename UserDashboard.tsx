import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import {
  Heart, GitCompare, MessageSquare, Calendar, TrendingUp,
  MapPin, ArrowRight, Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UserDashboard() {
  const { user } = useAuth();
  const { savedProperties, compareList, enquiries, properties } = useData();

  const stats = [
    { label: "Saved Properties", value: savedProperties.length, icon: Heart, href: "/dashboard/saved", color: "text-red-500" },
    { label: "Compare List", value: compareList.length, icon: GitCompare, href: "/dashboard/compare", color: "text-blue-500" },
    { label: "My Enquiries", value: enquiries.length, icon: MessageSquare, href: "/dashboard/enquiries", color: "text-green-500" },
    { label: "Site Visits", value: 2, icon: Calendar, href: "/dashboard/visits", color: "text-amber-500" },
  ];

  const recommended = properties.slice(0, 4);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
          Welcome back, {user?.name?.split(" ")[0] || "User"}
        </h1>
        <p className="text-muted-foreground">Here's what's happening with your property search</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.href}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {enquiries.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>No recent activity</p>
              <Link to="/properties">
                <Button variant="outline" className="mt-3">Browse Properties</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {enquiries.slice(0, 5).map((e) => (
                <div key={e.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Enquiry sent for {e.propertyTitle || e.projectName}</p>
                    <p className="text-xs text-muted-foreground">{new Date(e.createdAt).toLocaleDateString()}</p>
                  </div>
                  <Badge variant={e.status === "New" ? "default" : "secondary"} className="text-xs">{e.status}</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recommended */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recommended for You</h2>
          <Link to="/properties" className="text-sm text-[#C4703F] hover:underline flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommended.map((p) => (
            <Link key={p.id} to={`/property/${p.slug}`} className="group">
              <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-all">
                <div className="aspect-[4/3]">
                  <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <p className="font-bold text-[#C4703F] text-sm">Rs. {(p.price / 100000).toFixed(1)}L</p>
                  <p className="font-medium text-sm truncate group-hover:text-[#C4703F] transition-colors">{p.title}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {p.locality}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Badge } from "@/components/ui/badge";
