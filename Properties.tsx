import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import {
  Search,
  MapPin,
  Filter,
  Grid3X3,
  LayoutList,
  Heart,
  GitCompare,
  ArrowUpDown,
  X,
  SlidersHorizontal,
  BedDouble,
  Bath,
  Maximize,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

export default function Properties() {
  const { properties, isSaved, toggleSave } = useData();
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("latest");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    purpose: searchParams.get("purpose") || "",
    city: searchParams.get("city") || "",
    propertyType: "",
    bedrooms: "",
    minPrice: "",
    maxPrice: "",
    furnishing: "",
  });

  const filteredProperties = useMemo(() => {
    let result = [...properties];

    if (filters.purpose) result = result.filter((p) => p.purpose === filters.purpose);
    if (filters.city) result = result.filter((p) => p.city.toLowerCase().includes(filters.city.toLowerCase()));
    if (filters.propertyType) result = result.filter((p) => p.propertyType === filters.propertyType);
    if (filters.bedrooms) result = result.filter((p) => p.bedrooms === parseInt(filters.bedrooms));
    if (filters.minPrice) result = result.filter((p) => p.price >= parseInt(filters.minPrice) * 100000);
    if (filters.maxPrice) result = result.filter((p) => p.price <= parseInt(filters.maxPrice) * 100000);
    if (filters.furnishing) result = result.filter((p) => p.furnishing === filters.furnishing);

    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "popular") result.sort((a, b) => b.viewCount - a.viewCount);

    return result;
  }, [properties, filters, sortBy]);

  const activeFiltersCount = Object.values(filters).filter((v) => v !== "").length;

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ purpose: "", city: "", propertyType: "", bedrooms: "", minPrice: "", maxPrice: "", furnishing: "" });
  };

  const propertyTypes = [
    { value: "apartment", label: "Apartment" },
    { value: "villa", label: "Villa" },
    { value: "plot", label: "Plot" },
    { value: "penthouse", label: "Penthouse" },
    { value: "studio", label: "Studio" },
    { value: "builder_floor", label: "Builder Floor" },
    { value: "duplex", label: "Duplex" },
    { value: "commercial_office", label: "Commercial Office" },
  ];

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-3">Purpose</h4>
        <div className="space-y-2">
          {["sale", "rent", "lease"].map((p) => (
            <label key={p} className="flex items-center gap-2 cursor-pointer">
              <Checkbox checked={filters.purpose === p} onCheckedChange={() => updateFilter("purpose", filters.purpose === p ? "" : p)} />
              <span className="text-sm capitalize">{p === "sale" ? "Buy" : p}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="font-medium mb-3">Property Type</h4>
        <div className="space-y-2">
          {propertyTypes.map((pt) => (
            <label key={pt.value} className="flex items-center gap-2 cursor-pointer">
              <Checkbox checked={filters.propertyType === pt.value} onCheckedChange={() => updateFilter("propertyType", filters.propertyType === pt.value ? "" : pt.value)} />
              <span className="text-sm">{pt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="font-medium mb-3">Bedrooms</h4>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((bhk) => (
            <button
              key={bhk}
              onClick={() => updateFilter("bedrooms", filters.bedrooms === String(bhk) ? "" : String(bhk))}
              className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                filters.bedrooms === String(bhk) ? "bg-[#C4703F] text-white border-[#C4703F]" : "border-input hover:border-[#C4703F]"
              }`}
            >
              {bhk} {bhk === 5 ? "+" : ""} BHK
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="font-medium mb-3">Budget (Rs. Lakhs)</h4>
        <div className="grid grid-cols-2 gap-2">
          <Input placeholder="Min" value={filters.minPrice} onChange={(e) => updateFilter("minPrice", e.target.value)} />
          <Input placeholder="Max" value={filters.maxPrice} onChange={(e) => updateFilter("maxPrice", e.target.value)} />
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="font-medium mb-3">Furnishing</h4>
        <div className="space-y-2">
          {["furnished", "semi-furnished", "unfurnished"].map((f) => (
            <label key={f} className="flex items-center gap-2 cursor-pointer">
              <Checkbox checked={filters.furnishing === f} onCheckedChange={() => updateFilter("furnishing", filters.furnishing === f ? "" : f)} />
              <span className="text-sm capitalize">{f.replace("-", " ")}</span>
            </label>
          ))}
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          <X className="h-4 w-4 mr-2" />
          Clear All Filters ({activeFiltersCount})
        </Button>
      )}
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="bg-[#1A1A1A] text-white py-12 md:py-16">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">Properties</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Properties for {filters.purpose === "rent" ? "Rent" : "Sale"}
            {filters.city ? ` in ${filters.city}` : ""}
          </h1>
          <p className="text-white/60 mt-2">{filteredProperties.length} properties found</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-[64px] z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="container-custom py-3 flex items-center gap-3">
          <Sheet open={showFilters} onOpenChange={setShowFilters}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-4 overflow-auto">
              <SheetTitle>Filters</SheetTitle>
              <div className="mt-4">
                <FilterPanel />
              </div>
            </SheetContent>
          </Sheet>

          <div className="hidden lg:flex items-center gap-2 flex-1">
            <Input placeholder="Search by keyword..." className="max-w-[240px] h-9" />
            <Select value={filters.purpose} onValueChange={(v) => updateFilter("purpose", v)}>
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sale">Buy</SelectItem>
                <SelectItem value="rent">Rent</SelectItem>
                <SelectItem value="lease">Lease</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.propertyType} onValueChange={(v) => updateFilter("propertyType", v)}>
              <SelectTrigger className="w-[160px] h-9">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.map((pt) => (
                  <SelectItem key={pt.value} value={pt.value}>{pt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filters.bedrooms} onValueChange={(v) => updateFilter("bedrooms", v)}>
              <SelectTrigger className="w-[120px] h-9">
                <SelectValue placeholder="BHK" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((b) => (
                  <SelectItem key={b} value={String(b)}>{b} BHK</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] h-9">
                <ArrowUpDown className="h-3.5 w-3.5 mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="popular">Most Viewed</SelectItem>
              </SelectContent>
            </Select>
            <div className="hidden sm:flex border rounded-md">
              <Button variant={viewMode === "grid" ? "secondary" : "ghost"} size="icon" className="h-9 w-9 rounded-none" onClick={() => setViewMode("grid")}>
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button variant={viewMode === "list" ? "secondary" : "ghost"} size="icon" className="h-9 w-9 rounded-none" onClick={() => setViewMode("list")}>
                <LayoutList className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="container-custom pt-3">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {Object.entries(filters).map(([key, value]) => {
              if (!value) return null;
              return (
                <Badge key={key} variant="secondary" className="gap-1">
                  {key}: {value}
                  <button onClick={() => updateFilter(key, "")}><X className="h-3 w-3" /></button>
                </Badge>
              );
            })}
            <button onClick={clearFilters} className="text-sm text-[#C4703F] hover:underline ml-2">Clear all</button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container-custom py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-32 bg-card rounded-xl border border-border p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filters
              </h3>
              <FilterPanel />
            </div>
          </aside>

          {/* Property Grid */}
          <div className="flex-1">
            {filteredProperties.length === 0 ? (
              <div className="text-center py-16">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No properties found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters</p>
                <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5" : "space-y-4"}>
                {filteredProperties.map((property) => (
                  viewMode === "grid" ? (
                    <PropertyGridCard key={property.id} property={property} isSaved={isSaved(property.id)} onToggleSave={() => toggleSave(property.id)} />
                  ) : (
                    <PropertyListCard key={property.id} property={property} isSaved={isSaved(property.id)} onToggleSave={() => toggleSave(property.id)} />
                  )
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PropertyGridCard({ property, isSaved, onToggleSave }: { property: any; isSaved: boolean; onToggleSave: () => void }) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all card-hover">
      <div className="relative aspect-[4/3]">
        <Link to={`/property/${property.slug}`}>
          <img src={property.coverImage} alt={property.title} className="w-full h-full object-cover" />
        </Link>
        <div className="absolute top-3 left-3 flex gap-1 flex-wrap">
          {property.isVerified && <Badge className="bg-[#2B6CB0] text-white text-[10px]">Verified</Badge>}
          {property.isFeatured && <Badge className="bg-[#C9A84C] text-white text-[10px]">Featured</Badge>}
          {property.isNewLaunch && <Badge className="bg-[#C4703F] text-white text-[10px]">New Launch</Badge>}
        </div>
        <button onClick={onToggleSave} className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
          <Heart className={`h-4 w-4 ${isSaved ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
        </button>
      </div>
      <div className="p-4">
        <p className="text-lg font-bold text-[#C4703F]">Rs. {(property.price / 100000).toFixed(1)}L</p>
        <Link to={`/property/${property.slug}`}>
          <h3 className="font-semibold text-sm mt-1 hover:text-[#C4703F] transition-colors line-clamp-1">{property.title}</h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
          <MapPin className="h-3 w-3" /> {property.locality}, {property.city}
        </p>
        <div className="flex items-center gap-3 mt-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><BedDouble className="h-3.5 w-3.5" /> {property.bedrooms}</span>
          <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5" /> {property.bathrooms}</span>
          <span className="flex items-center gap-1"><Maximize className="h-3.5 w-3.5" /> {property.superBuiltUpArea} sqft</span>
        </div>
        <div className="mt-3 pt-3 border-t flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={property.agentAvatar} alt={property.agentName} className="h-6 w-6 rounded-full object-cover" />
            <span className="text-xs text-muted-foreground">{property.agentName}</span>
          </div>
          <Badge variant={property.status === "active" ? "default" : "secondary"} className="text-[10px]">
            {property.status}
          </Badge>
        </div>
      </div>
    </div>
  );
}

function PropertyListCard({ property, isSaved, onToggleSave }: { property: any; isSaved: boolean; onToggleSave: () => void }) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all flex flex-col sm:flex-row">
      <div className="relative sm:w-72 aspect-video sm:aspect-auto shrink-0">
        <Link to={`/property/${property.slug}`}>
          <img src={property.coverImage} alt={property.title} className="w-full h-full object-cover" />
        </Link>
        <div className="absolute top-3 left-3 flex gap-1">
          {property.isVerified && <Badge className="bg-[#2B6CB0] text-white text-[10px]">Verified</Badge>}
          {property.isFeatured && <Badge className="bg-[#C9A84C] text-white text-[10px]">Featured</Badge>}
        </div>
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-lg font-bold text-[#C4703F]">Rs. {(property.price / 100000).toFixed(1)}L <span className="text-xs font-normal text-muted-foreground">Rs. {property.pricePerUnit}/sqft</span></p>
              <Link to={`/property/${property.slug}`}>
                <h3 className="font-semibold mt-1 hover:text-[#C4703F] transition-colors">{property.title}</h3>
              </Link>
            </div>
            <div className="flex gap-1">
              <button onClick={onToggleSave} className="h-8 w-8 rounded-full border flex items-center justify-center">
                <Heart className={`h-4 w-4 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
              </button>
              <button className="h-8 w-8 rounded-full border flex items-center justify-center">
                <GitCompare className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {property.locality}, {property.city}
          </p>
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><BedDouble className="h-3.5 w-3.5" /> {property.bedrooms} BHK</span>
            <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5" /> {property.bathrooms} Baths</span>
            <span className="flex items-center gap-1"><Maximize className="h-3.5 w-3.5" /> {property.superBuiltUpArea} sqft</span>
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {property.ageOfProperty || "New"}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{property.description}</p>
        </div>
        <div className="mt-3 pt-3 border-t flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={property.agentAvatar} alt={property.agentName} className="h-7 w-7 rounded-full object-cover" />
            <div>
              <p className="text-xs font-medium">{property.agentName}</p>
              <p className="text-[10px] text-muted-foreground">{property.agentPhone}</p>
            </div>
          </div>
          <Button size="sm" className="bg-[#C4703F] hover:bg-[#A85A2F]">Contact Agent</Button>
        </div>
      </div>
    </div>
  );
}
