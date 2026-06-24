import { getDb } from "../api/queries/connection";
import * as schema from "./schema";

async function seed() {
  const db = getDb();
  console.log("Seeding database...");

  // Seed Cities
  const citiesData = [
    { name: "Bangalore", slug: "bangalore", state: "Karnataka", isPopular: true, propertyCount: 4200, projectCount: 85 },
    { name: "Hyderabad", slug: "hyderabad", state: "Telangana", isPopular: true, propertyCount: 3100, projectCount: 62 },
    { name: "Mumbai", slug: "mumbai", state: "Maharashtra", isPopular: true, propertyCount: 5600, projectCount: 120 },
    { name: "Chennai", slug: "chennai", state: "Tamil Nadu", isPopular: true, propertyCount: 2800, projectCount: 55 },
    { name: "Pune", slug: "pune", state: "Maharashtra", isPopular: true, propertyCount: 2400, projectCount: 48 },
    { name: "Delhi NCR", slug: "delhi-ncr", state: "Delhi", isPopular: true, propertyCount: 6800, projectCount: 145 },
  ];

  for (const city of citiesData) {
    await db.insert(schema.cities).values(city).onDuplicateKeyUpdate({ set: city });
  }
  console.log("Cities seeded");

  // Seed Localities
  const localitiesData = [
    { cityId: 1, name: "Whitefield", slug: "whitefield" },
    { cityId: 1, name: "Koramangala", slug: "koramangala" },
    { cityId: 1, name: "Electronic City", slug: "electronic-city" },
    { cityId: 1, name: "HSR Layout", slug: "hsr-layout" },
    { cityId: 1, name: "Indiranagar", slug: "indiranagar" },
    { cityId: 2, name: "Gachibowli", slug: "gachibowli" },
    { cityId: 2, name: "HITEC City", slug: "hitec-city" },
    { cityId: 2, name: "Banjara Hills", slug: "banjara-hills" },
    { cityId: 2, name: "Kondapur", slug: "kondapur" },
    { cityId: 3, name: "Andheri", slug: "andheri" },
    { cityId: 3, name: "Bandra", slug: "bandra" },
    { cityId: 3, name: "Powai", slug: "powai" },
  ];

  for (const loc of localitiesData) {
    await db.insert(schema.localities).values(loc).onDuplicateKeyUpdate({ set: loc });
  }
  console.log("Localities seeded");

  // Seed Amenities
  const amenitiesData: { name: string; icon: string; category: "security" | "convenience" | "leisure" | "wellness" | "technology" | "environment" | "parking" | "safety" }[] = [
    { name: "Swimming Pool", icon: "Waves", category: "leisure" },
    { name: "Gymnasium", icon: "Dumbbell", category: "wellness" },
    { name: "24/7 Security", icon: "Shield", category: "security" },
    { name: "Power Backup", icon: "Zap", category: "convenience" },
    { name: "Lift", icon: "ArrowUpDown", category: "convenience" },
    { name: "Parking", icon: "Car", category: "parking" },
    { name: "Club House", icon: "Building", category: "leisure" },
    { name: "Children Play Area", icon: "Baby", category: "leisure" },
    { name: "Rain Water Harvesting", icon: "CloudRain", category: "environment" },
    { name: "Intercom", icon: "Phone", category: "technology" },
    { name: "Fire Safety", icon: "Flame", category: "safety" },
    { name: "CCTV", icon: "Camera", category: "security" },
    { name: "Jogging Track", icon: "Footprints", category: "wellness" },
    { name: "Landscaped Gardens", icon: "TreePine", category: "environment" },
    { name: "Wifi", icon: "Wifi", category: "technology" },
  ];

  for (const am of amenitiesData) {
    await db.insert(schema.amenities).values(am as any).onDuplicateKeyUpdate({ set: am as any });
  }
  console.log("Amenities seeded");

  // Seed Blog Categories
  const blogCategoriesData = [
    { name: "Buying Guide", slug: "buying-guide", description: "Tips and guides for property buyers" },
    { name: "Investment", slug: "investment", description: "Real estate investment strategies" },
    { name: "Market Trends", slug: "market-trends", description: "Latest market analysis and trends" },
    { name: "Home Improvement", slug: "home-improvement", description: "Renovation and decor ideas" },
    { name: "Legal", slug: "legal", description: "Legal guides and documentation" },
    { name: "NRI Corner", slug: "nri-corner", description: "Guide for NRI property buyers" },
  ];

  for (const cat of blogCategoriesData) {
    await db.insert(schema.blogCategories).values(cat).onDuplicateKeyUpdate({ set: cat });
  }
  console.log("Blog categories seeded");

  // Seed Blog Posts
  const blogPostsData = [
    {
      title: "10 Things to Check Before Buying Your First Home",
      slug: "things-check-before-buying-first-home",
      excerpt: "Buying your first home is a major milestone. Here are the essential checks every first-time buyer should make before signing on the dotted line.",
      content: "Buying your first home is one of the most significant financial decisions you will ever make...",
      categoryId: 1,
      status: "published" as const,
      isFeatured: true,
      featuredImage: "/images/properties/prop-01.jpg",
      viewCount: 1250,
      publishedAt: new Date("2026-05-15"),
    },
    {
      title: "Real Estate Investment: REITs vs Direct Property",
      slug: "reits-vs-direct-property-investment",
      excerpt: "Confused between REITs and direct property investment? We break down the pros and cons of each approach.",
      content: "Real Estate Investment Trusts (REITs) have emerged as a popular way to invest in real estate...",
      categoryId: 2,
      status: "published" as const,
      isFeatured: false,
      featuredImage: "/images/properties/prop-03.jpg",
      viewCount: 890,
      publishedAt: new Date("2026-05-20"),
    },
    {
      title: "Bangalore Property Market Trends 2026",
      slug: "bangalore-property-market-trends-2026",
      excerpt: "An in-depth analysis of Bangalore's real estate market trends, price movements, and emerging localities.",
      content: "Bangalore continues to be one of India's most dynamic real estate markets...",
      categoryId: 3,
      status: "published" as const,
      isFeatured: true,
      featuredImage: "/images/cities/bangalore.jpg",
      viewCount: 2100,
      publishedAt: new Date("2026-06-01"),
    },
    {
      title: "Home Renovation Ideas That Add Value",
      slug: "home-renovation-ideas-add-value",
      excerpt: "Smart renovation ideas that not only improve your living space but also increase your property's market value.",
      content: "Renovating your home is an investment that pays dividends in both comfort and value...",
      categoryId: 4,
      status: "published" as const,
      isFeatured: false,
      featuredImage: "/images/properties/prop-02.jpg",
      viewCount: 650,
      publishedAt: new Date("2026-06-05"),
    },
    {
      title: "Understanding RERA: A Complete Guide",
      slug: "understanding-rera-complete-guide",
      excerpt: "Everything you need to know about the Real Estate Regulation Act and how it protects homebuyers.",
      content: "The Real Estate (Regulation and Development) Act, commonly known as RERA...",
      categoryId: 5,
      status: "published" as const,
      isFeatured: false,
      featuredImage: "/images/projects/project-01.jpg",
      viewCount: 3200,
      publishedAt: new Date("2026-06-10"),
    },
  ];

  for (const post of blogPostsData) {
    await db.insert(schema.blogPosts).values(post).onDuplicateKeyUpdate({ set: post });
  }
  console.log("Blog posts seeded");

  // Seed Subscription Plans
  const plansData = [
    {
      name: "Free",
      slug: "free",
      description: "Basic listing visibility",
      price: "0",
      duration: 365,
      maxListings: 3,
      maxFeaturedListings: 0,
      features: ["3 Listings", "Basic Analytics", "Email Support"],
    },
    {
      name: "Basic",
      slug: "basic",
      description: "For individual agents",
      price: "2999",
      duration: 30,
      maxListings: 15,
      maxFeaturedListings: 3,
      features: ["15 Listings", "3 Featured", "Lead Access", "Basic Analytics"],
    },
    {
      name: "Professional",
      slug: "professional",
      description: "For active agents",
      price: "7999",
      duration: 30,
      maxListings: 50,
      maxFeaturedListings: 10,
      leadAccess: true,
      analyticsAccess: true,
      features: ["50 Listings", "10 Featured", "Priority Lead Access", "Advanced Analytics", "Phone Support"],
    },
    {
      name: "Premium",
      slug: "premium",
      description: "For top agents and brokers",
      price: "14999",
      duration: 30,
      maxListings: 200,
      maxFeaturedListings: 30,
      leadAccess: true,
      analyticsAccess: true,
      prioritySupport: true,
      features: ["200 Listings", "30 Featured", "Exclusive Lead Access", "Full Analytics", "Priority Support", "Account Manager"],
    },
  ];

  for (const plan of plansData) {
    await db.insert(schema.subscriptionPlans).values(plan).onDuplicateKeyUpdate({ set: plan });
  }
  console.log("Subscription plans seeded");

  console.log("Seed complete!");
}

seed().catch(console.error);
