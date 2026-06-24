import { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  Search,
  MapPin,
  Home as HomeIcon,
  Building2,
  Store,
  TreePine,
  BedDouble,
  TrendingUp,
  Star,
  ArrowRight,
  CheckCircle,
  Phone,
  MessageSquare,
  Calculator,
  Mail,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function Home() {
  const { properties, projects, cities, testimonials, isSaved, toggleSave } = useData();
  const { isAuthenticated } = useAuth();
  const [purpose, setPurpose] = useState("buy");
  const [searchCity, setSearchCity] = useState("");
  const [email, setEmail] = useState("");

  const featuredProperties = properties.filter((p) => p.isFeatured).slice(0, 8);
  const featuredProjects = projects.filter((p) => p.isFeatured).slice(0, 3);

  const categories = [
    { name: "Buy Residential", icon: HomeIcon, count: "8,500+", desc: "Apartments, Villas, Houses" },
    { name: "Rent Residential", icon: BedDouble, count: "3,200+", desc: "Flats, PGs, Co-living" },
    { name: "Buy Commercial", icon: Store, count: "1,800+", desc: "Offices, Shops, Warehouses" },
    { name: "New Projects", icon: Building2, count: "450+", desc: "Pre-launch, Under construction" },
    { name: "PG / Co-living", icon: BedDouble, count: "900+", desc: "Student, Working professional" },
    { name: "Plots & Land", icon: TreePine, count: "2,100+", desc: "Residential, Commercial plots" },
  ];

  const stats = [
    { label: "Properties Listed", value: "12,500+" },
    { label: "Happy Clients", value: "8,200+" },
    { label: "Cities Covered", value: "50+" },
    { label: "Years in Business", value: "8+" },
  ];

  const whyUs = [
    { icon: CheckCircle, title: "Verified Listings", desc: "Every property verified by our expert team" },
    { icon: Phone, title: "Direct Agent Connect", desc: "Chat or call agents directly, no intermediaries" },
    { icon: TrendingUp, title: "Price Transparency", desc: "No hidden costs with full price breakup" },
    { icon: MessageSquare, title: "End-to-End Support", desc: "From search to registration, we're with you" },
  ];

  const quickSearches = [
    "Apartments in Bangalore",
    "Villas in Hyderabad",
    "Plots in Chennai",
    "Commercial in Mumbai",
    "PG in Pune",
    "3 BHK in Delhi",
  ];

  const handleNewsletter = () => {
    if (!email) return toast.error("Please enter your email");
    toast.success("Subscribed successfully!");
    setEmail("");
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-[#FAF8F5] dark:bg-[#1a1a1a] overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-50" />
        <div className="container-custom relative z-10 pt-16 md:pt-24 lg:pt-32 pb-16 md:pb-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Find Your <span className="text-[#C4703F]">Perfect</span> Property
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
              Discover verified homes, premium projects, and investment opportunities across India's top cities
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="buy" className="w-full" onValueChange={setPurpose}>
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-4">
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="rent">Rent</TabsTrigger>
                <TabsTrigger value="commercial">Commercial</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-lg p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search city or locality..."
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
                <div className="relative">
                  <HomeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select className="w-full h-12 pl-10 pr-4 rounded-md border border-input bg-background text-sm">
                    <option>Property Type</option>
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Plot</option>
                    <option>Commercial</option>
                  </select>
                </div>
                <div className="relative">
                  <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select className="w-full h-12 pl-10 pr-4 rounded-md border border-input bg-background text-sm">
                    <option>Budget Range</option>
                    <option>Below 50L</option>
                    <option>50L - 1Cr</option>
                    <option>1Cr - 2Cr</option>
                    <option>2Cr - 5Cr</option>
                    <option>Above 5Cr</option>
                  </select>
                </div>
                <Link to={`/properties?purpose=${purpose}&city=${searchCity}`} className="w-full">
                  <Button className="w-full h-12 bg-[#C4703F] hover:bg-[#A85A2F] text-white text-base">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-10">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl md:text-2xl font-bold text-[#C4703F]">{stat.value}</p>
                <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Quick Search Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {quickSearches.map((q) => (
              <Link
                key={q}
                to={`/properties?search=${q}`}
                className="px-4 py-2 rounded-full bg-white dark:bg-[#1E1E1E] text-sm text-muted-foreground hover:bg-[#C4703F] hover:text-white transition-colors shadow-sm"
              >
                {q}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="section-padding bg-white dark:bg-background">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Featured Properties
              </h2>
              <p className="text-muted-foreground mt-1">Handpicked premium listings for you</p>
            </div>
            <Link to="/properties" className="text-[#C4703F] hover:text-[#A85A2F] text-sm font-medium flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} isSaved={isSaved(property.id)} onToggleSave={() => toggleSave(property.id)} />
            ))}
          </div>
        </div>
      </section>

      {/* Property Categories */}
      <section className="section-padding bg-[#FAF8F5] dark:bg-[#1a1a1a]">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Explore by Category
            </h2>
            <p className="text-muted-foreground mt-1">Find properties that match your needs</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/properties?type=${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="group bg-white dark:bg-[#1E1E1E] rounded-xl p-6 shadow-sm hover:shadow-md transition-all border-t-4 border-transparent hover:border-[#C4703F]"
              >
                <cat.icon className="h-10 w-10 text-[#C4703F] mb-4" />
                <h3 className="font-semibold text-lg mb-1">{cat.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{cat.desc}</p>
                <p className="text-sm font-medium text-[#C4703F]">{cat.count} properties</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Cities */}
      <section className="section-padding bg-white dark:bg-background">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Trending Locations
              </h2>
              <p className="text-muted-foreground mt-1">Popular cities with the best properties</p>
            </div>
            <Link to="/properties" className="text-[#C4703F] hover:text-[#A85A2F] text-sm font-medium flex items-center gap-1">
              Explore All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {cities.map((city) => (
              <Link
                key={city.id}
                to={`/properties?city=${city.name}`}
                className="group relative rounded-xl overflow-hidden aspect-[4/3]"
              >
                <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <h3 className="font-semibold">{city.name}</h3>
                  <p className="text-xs text-white/80">{city.propertyCount}+ properties</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-[#1A1A1A] text-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Why Homebuyers Trust EstateOne
              </h2>
              <p className="text-[#9B9590] mb-8">
                We combine cutting-edge technology with deep real estate expertise to give you the most trusted property buying experience.
              </p>
              <div className="space-y-4">
                {whyUs.map((item) => (
                  <div key={item.title} className="flex gap-4 p-4 rounded-lg bg-white/5">
                    <item.icon className="h-6 w-6 text-[#C4703F] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">{item.title}</h3>
                      <p className="text-sm text-[#9B9590]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <img src="/images/properties/prop-05.jpg" alt="Why Choose Us" className="rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* New Projects */}
      <section className="section-padding bg-[#F0EBE4] dark:bg-[#1a1a1a]">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
                New Projects & Launches
              </h2>
              <p className="text-muted-foreground mt-1">Explore upcoming and under-construction projects</p>
            </div>
            <Link to="/projects" className="text-[#C4703F] hover:text-[#A85A2F] text-sm font-medium flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Investment Opportunities */}
      <section className="section-padding bg-white dark:bg-background">
        <div className="container-custom">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Prime Investment Opportunities
            </h2>
            <p className="text-muted-foreground mt-1">Properties with high ROI potential</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.filter((p) => p.isPremium).slice(0, 3).map((property) => (
              <div key={property.id} className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all">
                <div className="relative aspect-[4/3]">
                  <img src={property.coverImage} alt={property.title} className="w-full h-full object-cover" />
                  <Badge className="absolute top-3 left-3 bg-[#6B4C8A] text-white">Investment Hot</Badge>
                  <button
                    onClick={() => toggleSave(property.id)}
                    className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 flex items-center justify-center"
                  >
                    <Heart className={`h-4 w-4 ${isSaved(property.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-lg font-bold text-[#C4703F]">Rs. {(property.price / 100000).toFixed(1)}L</p>
                  <h3 className="font-semibold mt-1 truncate">{property.title}</h3>
                  <p className="text-sm text-muted-foreground">{property.locality}, {property.city}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                    <span>{property.bedrooms} BHK</span>
                    <span>{property.superBuiltUpArea} sqft</span>
                  </div>
                  <div className="mt-3 pt-3 border-t flex items-center justify-between">
                    <span className="text-xs bg-[#6B4C8A]/10 text-[#6B4C8A] px-2 py-1 rounded">ROI: 12-15%</span>
                    <Link to={`/property/${property.slug}`} className="text-sm text-[#C4703F] font-medium">View Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-[#FAF8F5] dark:bg-[#1a1a1a]">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground mt-1">Real stories from real customers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white dark:bg-[#1E1E1E] rounded-xl p-6 shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#C9A84C] text-[#C9A84C]" />
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p className="font-medium text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role} - {t.propertyType}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Tools Teaser */}
      <section className="section-padding bg-[#1A1A1A]">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Plan Your Purchase
              </h2>
              <p className="text-[#9B9590] mt-1">Smart tools to help you decide</p>
            </div>
            <Link to="/tools" className="text-[#C4703F] hover:text-[#A85A2F] text-sm font-medium flex items-center gap-1">
              All Tools <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Calculator, title: "EMI Calculator", desc: "Calculate your monthly EMI for home loans" },
              { icon: TrendingUp, title: "Affordability Check", desc: "Find out how much property you can afford" },
              { icon: TrendingUp, title: "ROI Calculator", desc: "Estimate returns on your property investment" },
            ].map((tool) => (
              <Link
                key={tool.title}
                to="/tools"
                className="bg-[#2A2A2A] rounded-xl p-6 border border-transparent hover:border-[#C4703F] transition-colors group"
              >
                <tool.icon className="h-10 w-10 text-[#C4703F] mb-4" />
                <h3 className="font-semibold text-white mb-2">{tool.title}</h3>
                <p className="text-sm text-[#9B9590]">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="section-padding bg-white dark:bg-background">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Market Insights & Guides
              </h2>
              <p className="text-muted-foreground mt-1">Expert advice for property buyers</p>
            </div>
            <Link to="/blog" className="text-[#C4703F] hover:text-[#A85A2F] text-sm font-medium flex items-center gap-1">
              Read All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {useData().blogPosts.slice(0, 3).map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                <div className="rounded-xl overflow-hidden mb-4">
                  <img src={post.featuredImage} alt={post.title} className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <Badge variant="outline" className="mb-2 text-[#C4703F] border-[#C4703F]">{post.category}</Badge>
                <h3 className="font-semibold text-lg group-hover:text-[#C4703F] transition-colors line-clamp-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.readTime} read</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Agent CTA */}
      <section className="py-16 md:py-20 bg-[#C4703F]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                List Your Property with EstateOne
              </h2>
              <p className="text-white/80 mb-6">
                Join 2,800+ agents and builders who trust EstateOne to showcase their properties to millions of buyers.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/register">
                  <Button className="bg-white text-[#C4703F] hover:bg-white/90 font-medium">
                    Get Started
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img src="/images/properties/prop-04.jpg" alt="Agent CTA" className="rounded-2xl shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-[#F0EBE4] dark:bg-[#1a1a1a]">
        <div className="container-custom text-center max-w-xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Get New Listings in Your Inbox
          </h2>
          <p className="text-muted-foreground mb-6">
            Subscribe to receive the latest property listings and market updates
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-14"
              />
            </div>
            <Button className="h-14 px-8 bg-[#C4703F] hover:bg-[#A85A2F] text-white font-medium" onClick={handleNewsletter}>
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Join 50,000+ subscribers. No spam, unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}

function PropertyCard({ property, isSaved, onToggleSave }: { property: any; isSaved: boolean; onToggleSave: () => void }) {
  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all card-hover">
      <div className="relative aspect-[4/3]">
        <Link to={`/property/${property.slug}`}>
          <img src={property.coverImage} alt={property.title} className="w-full h-full object-cover" />
        </Link>
        <div className="absolute top-3 left-3 flex gap-1">
          {property.isVerified && <Badge className="bg-[#2B6CB0] text-white text-[10px]">Verified</Badge>}
          {property.isFeatured && <Badge className="bg-[#C9A84C] text-white text-[10px]">Featured</Badge>}
          {property.isNewLaunch && <Badge className="bg-[#C4703F] text-white text-[10px]">New</Badge>}
        </div>
        <button
          onClick={(e) => { e.preventDefault(); onToggleSave(); }}
          className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 dark:bg-black/50 flex items-center justify-center shadow-sm"
        >
          <Heart className={`h-4 w-4 ${isSaved ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-300"}`} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <p className="text-lg font-bold text-[#C4703F]">Rs. {(property.price / 100000).toFixed(1)}L</p>
          <p className="text-xs text-muted-foreground mt-1">Rs. {property.pricePerUnit}/sqft</p>
        </div>
        <Link to={`/property/${property.slug}`}>
          <h3 className="font-semibold text-sm hover:text-[#C4703F] transition-colors line-clamp-1">{property.title}</h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
          <MapPin className="h-3 w-3" /> {property.locality}, {property.city}
        </p>
        <div className="flex items-center gap-3 mt-3 text-sm text-muted-foreground">
          {property.bedrooms > 0 && <span>{property.bedrooms} BHK</span>}
          <span>{property.superBuiltUpArea} sqft</span>
          <Badge variant="outline" className="text-[10px]">{property.furnishing}</Badge>
        </div>
        <div className="mt-3 pt-3 border-t flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={property.agentAvatar} alt={property.agentName} className="h-6 w-6 rounded-full object-cover" />
            <span className="text-xs text-muted-foreground">{property.agentName}</span>
          </div>
          <Link to={`/property/${property.slug}`} className="text-xs text-[#C4703F] font-medium hover:underline">Contact</Link>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: any }) {
  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all card-hover">
      <div className="relative aspect-video">
        <Link to={`/project/${project.slug}`}>
          <img src={project.coverImage} alt={project.name} className="w-full h-full object-cover" />
        </Link>
        <div className="absolute top-3 left-3">
          <Badge className={`text-[10px] ${
            project.projectStatus === "new_launch" ? "bg-[#C4703F]" :
            project.projectStatus === "under_construction" ? "bg-[#B8860B]" :
            project.projectStatus === "ready_possession" ? "bg-[#2D7D4A]" : "bg-[#2B6CB0]"
          } text-white`}>
            {project.projectStatus.replace("_", " ")}
          </Badge>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-[#C4703F] font-medium">{project.builder}</p>
        <Link to={`/project/${project.slug}`}>
          <h3 className="font-semibold text-lg mt-1 hover:text-[#C4703F] transition-colors">{project.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
          <MapPin className="h-3 w-3" /> {project.locality}, {project.city}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {project.configurations.map((c: string) => (
            <span key={c} className="text-xs bg-muted px-2 py-1 rounded">{c}</span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4 pt-3 border-t">
          <p className="font-bold text-[#C4703F]">Rs. {(project.priceRangeMin / 100000).toFixed(0)}L - {(project.priceRangeMax / 10000000).toFixed(1)}Cr</p>
          <Link to={`/project/${project.slug}`} className="text-xs text-[#C4703F] font-medium hover:underline">View Details</Link>
        </div>
      </div>
    </div>
  );
}
