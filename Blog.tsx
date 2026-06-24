import { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { ArrowRight, Search, Clock, User, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function Blog() {
  const { blogPosts } = useData();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["all", ...new Set(blogPosts.map((p) => p.category))];

  const filtered = blogPosts.filter((p) => {
    if (activeCategory !== "all" && p.category !== activeCategory) return false;
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const featured = blogPosts.find((p) => p.isFeatured) || blogPosts[0];

  return (
    <div>
      <div className="bg-[#1A1A1A] text-white py-12 md:py-16">
        <div className="container-custom">
          <h1 className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Market Insights & Guides
          </h1>
          <p className="text-white/60 mt-2">Expert advice for buyers, sellers, and investors</p>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  activeCategory === cat ? "bg-[#C4703F] text-white" : "bg-muted hover:bg-[#C4703F]/10"
                }`}
              >
                {cat === "all" ? "All" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        {featured && !searchQuery && activeCategory === "all" && (
          <div className="mb-10">
            <Link to={`/blog/${featured.slug}`} className="group block relative rounded-xl overflow-hidden aspect-[21/9]">
              <img src={featured.featuredImage} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <Badge className="bg-[#C4703F] text-white mb-3">{featured.category}</Badge>
                <h2 className="text-xl md:text-3xl font-bold text-white group-hover:text-[#C4703F] transition-colors">
                  {featured.title}
                </h2>
                <p className="text-white/80 mt-2 max-w-2xl line-clamp-2">{featured.excerpt}</p>
                <div className="flex items-center gap-4 mt-4 text-white/60 text-sm">
                  <span className="flex items-center gap-1"><User className="h-3 w-3" /> {featured.author}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {featured.readTime}</span>
                  <span className="flex items-center gap-1"><TrendingUp className="h-3 w-3" /> {featured.viewCount} views</span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group">
              <div className="rounded-xl overflow-hidden mb-4">
                <img src={post.featuredImage} alt={post.title} className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <Badge variant="outline" className="mb-2 text-[#C4703F] border-[#C4703F]">{post.category}</Badge>
              <h3 className="font-semibold text-lg group-hover:text-[#C4703F] transition-colors line-clamp-2">{post.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                <span>{post.author}</span>
                <span>{post.readTime} read</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
