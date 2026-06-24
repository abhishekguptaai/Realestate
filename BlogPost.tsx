import { useParams, Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { ArrowLeft, Clock, User, TrendingUp, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { getBlogPostBySlug, blogPosts } = useData();
  const post = getBlogPostBySlug(slug || "");

  if (!post) {
    return (
      <div className="container-custom py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Article Not Found</h2>
        <Link to="/blog">
          <Button>Browse Articles</Button>
        </Link>
      </div>
    );
  }

  const relatedPosts = blogPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <div className="relative h-[40vh] min-h-[300px]">
        <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container-custom">
            <Link to="/blog" className="text-white/70 hover:text-white text-sm flex items-center gap-1 mb-4">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>
            <Badge className="bg-[#C4703F] text-white mb-3">{post.category}</Badge>
            <h1 className="text-2xl md:text-4xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              {post.title}
            </h1>
            <div className="flex items-center gap-4 mt-4 text-white/70 text-sm">
              <span className="flex items-center gap-1"><User className="h-4 w-4" /> {post.author}</span>
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {post.publishedAt}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {post.readTime}</span>
              <span className="flex items-center gap-1"><TrendingUp className="h-4 w-4" /> {post.viewCount} views</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">{post.excerpt}</p>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{post.content}</p>
                <p>Real estate investment requires careful consideration of multiple factors including location, developer reputation, market trends, and financial planning. This comprehensive guide covers everything you need to know before making your investment decision.</p>
                <h3 className="text-xl font-semibold text-foreground mt-6">Key Considerations</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Location analysis and infrastructure development</li>
                  <li>Developer track record and financial stability</li>
                  <li>Legal due diligence and RERA compliance</li>
                  <li>Market trends and price appreciation potential</li>
                  <li>Financing options and interest rate scenarios</li>
                </ul>
                <h3 className="text-xl font-semibold text-foreground mt-6">Market Outlook</h3>
                <p>The Indian real estate market has shown remarkable resilience and growth in recent years. With increasing urbanization, rising disposable incomes, and favorable government policies, the sector continues to attract both domestic and international investors.</p>
                <p>Understanding market dynamics, regulatory frameworks, and emerging trends is crucial for making informed investment decisions. Whether you are a first-time buyer or an experienced investor, staying updated with market developments ensures better returns and risk management.</p>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-muted rounded-xl p-6">
              <h3 className="font-semibold mb-4">Related Articles</h3>
              <div className="space-y-4">
                {relatedPosts.map((rp) => (
                  <Link key={rp.id} to={`/blog/${rp.slug}`} className="group block">
                    <div className="flex gap-3">
                      <img src={rp.featuredImage} alt={rp.title} className="h-16 w-16 rounded-lg object-cover shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium group-hover:text-[#C4703F] transition-colors line-clamp-2">{rp.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{rp.readTime} read</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-[#F0EBE4] dark:bg-[#2A2A2A] rounded-xl p-6">
              <h3 className="font-semibold mb-2">Subscribe to Updates</h3>
              <p className="text-sm text-muted-foreground mb-4">Get the latest property insights delivered to your inbox.</p>
              <input type="email" placeholder="Enter your email" className="w-full px-3 py-2 rounded-lg border mb-2 bg-white dark:bg-[#1E1E1E]" />
              <Button className="w-full bg-[#C4703F] hover:bg-[#A85A2F]">Subscribe</Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
