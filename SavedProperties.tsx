import { Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { Heart, MapPin, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SavedProperties() {
  const { properties, savedProperties, isSaved, toggleSave } = useData();
  const saved = properties.filter((p) => savedProperties.includes(p.id));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Saved Properties</h1>
        <p className="text-muted-foreground">{saved.length} properties saved</p>
      </div>

      {saved.length === 0 ? (
        <div className="text-center py-16 bg-muted rounded-xl">
          <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
          <h3 className="text-lg font-semibold mb-2">No saved properties yet</h3>
          <p className="text-muted-foreground mb-4">Start browsing and save properties you like</p>
          <Link to="/properties">
            <Button className="bg-[#C4703F] hover:bg-[#A85A2F]">Browse Properties</Button>
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {saved.map((p) => (
            <div key={p.id} className="bg-card rounded-xl border border-border overflow-hidden group">
              <div className="relative aspect-[4/3]">
                <Link to={`/property/${p.slug}`}>
                  <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover" />
                </Link>
                <button
                  onClick={() => toggleSave(p.id)}
                  className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 flex items-center justify-center"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>
              <div className="p-4">
                <p className="font-bold text-[#C4703F]">Rs. {(p.price / 100000).toFixed(1)}L</p>
                <Link to={`/property/${p.slug}`}>
                  <h3 className="font-medium hover:text-[#C4703F] transition-colors">{p.title}</h3>
                </Link>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {p.locality}, {p.city}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
