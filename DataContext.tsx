import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";

export interface Property {
  id: number;
  title: string;
  slug: string;
  price: number;
  pricePerUnit: number;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  superBuiltUpArea: number;
  carpetArea: number;
  propertyType: string;
  purpose: string;
  furnishing: string;
  city: string;
  locality: string;
  address: string;
  coverImage: string;
  images: string[];
  agentName: string;
  agentAvatar: string;
  agentPhone: string;
  isVerified: boolean;
  isFeatured: boolean;
  isPremium: boolean;
  isNewLaunch: boolean;
  status: string;
  facing: string;
  parking: number;
  floorNumber: number;
  totalFloors: number;
  ageOfProperty: string;
  description: string;
  amenities: string[];
  viewCount: number;
  postedDate: string;
  rating: number;
  maintenanceCharges?: number;
  securityDeposit?: number;
  isNegotiable?: boolean;
  enquiryCount: number;
}

export interface Project {
  id: number;
  name: string;
  slug: string;
  builder: string;
  builderLogo: string;
  city: string;
  locality: string;
  coverImage: string;
  configurations: string[];
  priceRangeMin: number;
  priceRangeMax: number;
  projectStatus: string;
  possessionDate: string;
  totalTowers: number;
  totalUnits: number;
  description: string;
  reraId: string;
  isFeatured: boolean;
  viewCount: number;
  highlights: string[];
  isVerified: boolean;
  pricePerSqft: number;
}

export interface Agent {
  id: number;
  name: string;
  companyName: string;
  avatar: string;
  experience: number;
  specialization: string[];
  rating: number;
  reviewCount: number;
  totalListings: number;
  phone: string;
  email: string;
  about: string;
  verified: boolean;
  city: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  author: string;
  authorAvatar: string;
  featuredImage: string;
  publishedAt: string;
  readTime: string;
  viewCount: number;
  status: "draft" | "published" | "archived";
  isFeatured: boolean;
}

export interface City {
  id: number;
  name: string;
  slug: string;
  state: string;
  image: string;
  propertyCount: number;
  projectCount: number;
}

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  propertyTitle?: string;
  projectName?: string;
  status: string;
  source: string;
  leadType: string;
  createdAt: string;
  notes?: string;
}

export interface Enquiry {
  id: number;
  propertyId?: number;
  propertyTitle?: string;
  projectName?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  createdAt: string;
}

export interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  role: string;
  text: string;
  rating: number;
  propertyType: string;
}

interface DataContextType {
  properties: Property[];
  projects: Project[];
  agents: Agent[];
  blogPosts: BlogPost[];
  cities: City[];
  testimonials: Testimonial[];
  leads: Lead[];
  enquiries: Enquiry[];
  savedProperties: number[];
  compareList: number[];
  toggleSave: (id: number) => void;
  toggleCompare: (id: number) => void;
  isSaved: (id: number) => boolean;
  isCompared: (id: number) => boolean;
  addEnquiry: (enquiry: Omit<Enquiry, "id" | "createdAt" | "status">) => void;
  addLead: (lead: Omit<Lead, "id" | "createdAt">) => void;
  updateLeadStatus: (id: number, status: string) => void;
  getPropertyBySlug: (slug: string) => Property | undefined;
  getProjectBySlug: (slug: string) => Project | undefined;
  getAgentById: (id: number) => Agent | undefined;
  getBlogPostBySlug: (slug: string) => BlogPost | undefined;
  filterProperties: (filters: PropertyFilters) => Property[];
}

export interface PropertyFilters {
  purpose?: string;
  city?: string;
  propertyType?: string;
  bedrooms?: number;
  minPrice?: number;
  maxPrice?: number;
  furnishing?: string;
  isVerified?: boolean;
  isFeatured?: boolean;
}

const DataContext = createContext<DataContextType | null>(null);

const DEMO_PROPERTIES: Property[] = [
  {
    id: 1, title: "Prestige Lakeside Habitat", slug: "prestige-lakeside-habitat",
    price: 18500000, pricePerUnit: 8500, bedrooms: 3, bathrooms: 3, balconies: 2,
    superBuiltUpArea: 2175, carpetArea: 1650, propertyType: "apartment", purpose: "sale",
    furnishing: "unfurnished", city: "Bangalore", locality: "Whitefield",
    address: "Hope Farm Junction, Whitefield, Bangalore",
    coverImage: "/images/properties/prop-01.jpg",
    images: ["/images/properties/prop-01.jpg", "/images/properties/prop-02.jpg"],
    agentName: "Rahul Kapoor", agentAvatar: "/images/agents/agent-01.jpg", agentPhone: "+91 98765 43210",
    isVerified: true, isFeatured: true, isPremium: true, isNewLaunch: false,
    status: "active", facing: "east", parking: 2, floorNumber: 8, totalFloors: 22,
    ageOfProperty: "0-1 years",
    description: "Luxurious 3BHK apartment in the heart of Whitefield with world-class amenities, swimming pool, gym, and landscaped gardens. Perfect for families looking for premium living spaces.",
    amenities: ["Swimming Pool", "Gymnasium", "24/7 Security", "Power Backup", "Lift", "Parking", "Club House", "Children Play Area"],
    viewCount: 1245, postedDate: "2026-06-15", rating: 4.8, enquiryCount: 32,
  },
  {
    id: 2, title: "Sobha Dream Acres", slug: "sobha-dream-acres",
    price: 9200000, pricePerUnit: 7200, bedrooms: 2, bathrooms: 2, balconies: 1,
    superBuiltUpArea: 1280, carpetArea: 980, propertyType: "apartment", purpose: "sale",
    furnishing: "semi-furnished", city: "Bangalore", locality: "Koramangala",
    address: "Sarjapur Road, Near Wipro, Bangalore",
    coverImage: "/images/properties/prop-02.jpg",
    images: ["/images/properties/prop-02.jpg", "/images/properties/prop-01.jpg"],
    agentName: "Priya Sharma", agentAvatar: "/images/agents/agent-02.jpg", agentPhone: "+91 98765 43211",
    isVerified: true, isFeatured: true, isPremium: false, isNewLaunch: true,
    status: "active", facing: "north", parking: 1, floorNumber: 5, totalFloors: 18,
    ageOfProperty: "1-2 years",
    description: "Beautifully designed 2BHK apartment with modern interiors, spacious balconies, and excellent connectivity to IT hubs. Ideal for young professionals and small families.",
    amenities: ["Swimming Pool", "Gymnasium", "24/7 Security", "Power Backup", "Lift", "Jogging Track", "Rain Water Harvesting"],
    viewCount: 890, postedDate: "2026-06-18", rating: 4.5, enquiryCount: 24,
  },
  {
    id: 3, title: "The Royal Orchid Villa", slug: "royal-orchid-villa",
    price: 45000000, pricePerUnit: 15000, bedrooms: 4, bathrooms: 5, balconies: 3,
    superBuiltUpArea: 4500, carpetArea: 3800, propertyType: "villa", purpose: "sale",
    furnishing: "furnished", city: "Hyderabad", locality: "Banjara Hills",
    address: "Road No. 12, Banjara Hills, Hyderabad",
    coverImage: "/images/properties/prop-03.jpg",
    images: ["/images/properties/prop-03.jpg", "/images/properties/prop-06.jpg"],
    agentName: "Vikram Reddy", agentAvatar: "/images/agents/agent-03.jpg", agentPhone: "+91 98765 43212",
    isVerified: true, isFeatured: true, isPremium: true, isNewLaunch: false,
    status: "active", facing: "south_east", parking: 3, floorNumber: 2, totalFloors: 2,
    ageOfProperty: "0-1 years",
    description: "Ultra-luxury 4BHK independent villa with private pool, home theater, smart home automation, and premium finishes. The epitome of luxury living in Hyderabad's most prestigious address.",
    amenities: ["Swimming Pool", "Gymnasium", "24/7 Security", "Parking", "Club House", "Wifi", "Landscaped Gardens", "Intercom"],
    viewCount: 2100, postedDate: "2026-06-10", rating: 4.9, enquiryCount: 45,
  },
  {
    id: 4, title: "DLF Cyber City Office", slug: "dlf-cyber-city-office",
    price: 8500000, pricePerUnit: 12000, bedrooms: 0, bathrooms: 2, balconies: 0,
    superBuiltUpArea: 1200, carpetArea: 950, propertyType: "commercial_office", purpose: "sale",
    furnishing: "furnished", city: "Hyderabad", locality: "HITEC City",
    address: "HITEC City, Madhapur, Hyderabad",
    coverImage: "/images/properties/prop-04.jpg",
    images: ["/images/properties/prop-04.jpg", "/images/properties/prop-08.jpg"],
    agentName: "Ananya Gupta", agentAvatar: "/images/agents/agent-02.jpg", agentPhone: "+91 98765 43213",
    isVerified: true, isFeatured: false, isPremium: false, isNewLaunch: false,
    status: "active", facing: "north", parking: 2, floorNumber: 7, totalFloors: 15,
    ageOfProperty: "2-3 years",
    description: "Premium office space in the heart of HITEC City with modern interiors, conference facilities, and excellent connectivity. Perfect for IT companies and startups.",
    amenities: ["24/7 Security", "Power Backup", "Lift", "Parking", "Wifi", "Fire Safety", "CCTV"],
    viewCount: 650, postedDate: "2026-06-12", rating: 4.3, enquiryCount: 12,
  },
  {
    id: 5, title: "Brigade Gateway Apartments", slug: "brigade-gateway-apartments",
    price: 15200000, pricePerUnit: 8000, bedrooms: 3, bathrooms: 3, balconies: 2,
    superBuiltUpArea: 1900, carpetArea: 1450, propertyType: "apartment", purpose: "sale",
    furnishing: "unfurnished", city: "Bangalore", locality: "Electronic City",
    address: "Electronic City Phase 1, Bangalore",
    coverImage: "/images/properties/prop-05.jpg",
    images: ["/images/properties/prop-05.jpg", "/images/properties/prop-01.jpg"],
    agentName: "Rahul Kapoor", agentAvatar: "/images/agents/agent-01.jpg", agentPhone: "+91 98765 43210",
    isVerified: true, isFeatured: false, isPremium: false, isNewLaunch: false,
    status: "active", facing: "west", parking: 2, floorNumber: 12, totalFloors: 25,
    ageOfProperty: "1-2 years",
    description: "Spacious 3BHK apartment in Electronic City with excellent connectivity to major IT companies. Features include a swimming pool, gym, and children's play area.",
    amenities: ["Swimming Pool", "Gymnasium", "24/7 Security", "Power Backup", "Lift", "Parking", "Club House", "Children Play Area"],
    viewCount: 780, postedDate: "2026-06-14", rating: 4.6, enquiryCount: 18,
  },
  {
    id: 6, title: "Lanco Hills Penthouse", slug: "lanco-hills-penthouse",
    price: 35000000, pricePerUnit: 18000, bedrooms: 4, bathrooms: 4, balconies: 4,
    superBuiltUpArea: 3200, carpetArea: 2800, propertyType: "penthouse", purpose: "sale",
    furnishing: "furnished", city: "Hyderabad", locality: "Gachibowli",
    address: "Lanco Hills, Manikonda, Hyderabad",
    coverImage: "/images/properties/prop-06.jpg",
    images: ["/images/properties/prop-06.jpg", "/images/properties/prop-03.jpg"],
    agentName: "Vikram Reddy", agentAvatar: "/images/agents/agent-03.jpg", agentPhone: "+91 98765 43212",
    isVerified: true, isFeatured: true, isPremium: true, isNewLaunch: false,
    status: "active", facing: "north_east", parking: 3, floorNumber: 35, totalFloors: 35,
    ageOfProperty: "0-1 years",
    description: "Exclusive penthouse with panoramic city views, private terrace, and ultra-luxury finishes. This is Hyderabad's most sought-after address with world-class amenities.",
    amenities: ["Swimming Pool", "Gymnasium", "24/7 Security", "Power Backup", "Lift", "Parking", "Club House", "Wifi", "CCTV", "Fire Safety"],
    viewCount: 3200, postedDate: "2026-06-08", rating: 4.9, enquiryCount: 56,
  },
  {
    id: 7, title: "Green Valley Residential Plot", slug: "green-valley-plot",
    price: 6000000, pricePerUnit: 3000, bedrooms: 0, bathrooms: 0, balconies: 0,
    superBuiltUpArea: 0, carpetArea: 0, propertyType: "plot", purpose: "sale",
    furnishing: "unfurnished", city: "Bangalore", locality: "HSR Layout",
    address: "Sector 7, HSR Layout, Bangalore",
    coverImage: "/images/properties/prop-07.jpg",
    images: ["/images/properties/prop-07.jpg", "/images/properties/prop-08.jpg"],
    agentName: "Priya Sharma", agentAvatar: "/images/agents/agent-02.jpg", agentPhone: "+91 98765 43211",
    isVerified: true, isFeatured: false, isPremium: false, isNewLaunch: false,
    status: "active", facing: "east", parking: 0, floorNumber: 0, totalFloors: 0,
    ageOfProperty: "",
    description: "Premium residential plot in HSR Layout with clear title and all approvals. Ideal for building your dream home in one of Bangalore's most desirable neighborhoods.",
    amenities: ["24/7 Security", "CCTV"],
    viewCount: 450, postedDate: "2026-06-16", rating: 4.2, enquiryCount: 6,
  },
  {
    id: 8, title: "Modern Builder Floor", slug: "modern-builder-floor",
    price: 12500000, pricePerUnit: 10000, bedrooms: 3, bathrooms: 3, balconies: 2,
    superBuiltUpArea: 1800, carpetArea: 1500, propertyType: "builder_floor", purpose: "sale",
    furnishing: "semi-furnished", city: "Hyderabad", locality: "Kondapur",
    address: "Kondapur Main Road, Hyderabad",
    coverImage: "/images/properties/prop-08.jpg",
    images: ["/images/properties/prop-08.jpg", "/images/properties/prop-05.jpg"],
    agentName: "Rahul Kapoor", agentAvatar: "/images/agents/agent-01.jpg", agentPhone: "+91 98765 43210",
    isVerified: false, isFeatured: false, isPremium: false, isNewLaunch: false,
    status: "active", facing: "north", parking: 1, floorNumber: 2, totalFloors: 4,
    ageOfProperty: "1-2 years",
    description: "Stylish builder floor apartment with modern design, premium fittings, and ample natural light. Located in a prime residential area with excellent connectivity.",
    amenities: ["24/7 Security", "Power Backup", "Lift", "Parking", "Wifi"],
    viewCount: 560, postedDate: "2026-06-17", rating: 4.1, enquiryCount: 10,
  },
  {
    id: 9, title: "Compact Studio Apartment", slug: "compact-studio-apartment",
    price: 4500000, pricePerUnit: 9000, bedrooms: 1, bathrooms: 1, balconies: 1,
    superBuiltUpArea: 650, carpetArea: 500, propertyType: "studio", purpose: "rent",
    furnishing: "furnished", city: "Bangalore", locality: "Indiranagar",
    address: "100 Feet Road, Indiranagar, Bangalore",
    coverImage: "/images/properties/prop-09.jpg",
    images: ["/images/properties/prop-09.jpg", "/images/properties/prop-02.jpg"],
    agentName: "Ananya Gupta", agentAvatar: "/images/agents/agent-02.jpg", agentPhone: "+91 98765 43213",
    isVerified: true, isFeatured: false, isPremium: false, isNewLaunch: false,
    status: "active", facing: "west", parking: 1, floorNumber: 3, totalFloors: 10,
    ageOfProperty: "2-3 years",
    description: "Fully furnished studio apartment in the vibrant Indiranagar neighborhood. Perfect for young professionals with its modern amenities and prime location.",
    amenities: ["Gymnasium", "24/7 Security", "Power Backup", "Lift", "Wifi", "CCTV"],
    viewCount: 920, postedDate: "2026-06-19", rating: 4.4, enquiryCount: 20,
  },
  {
    id: 10, title: "Grand Duplex Residence", slug: "grand-duplex-residence",
    price: 28000000, pricePerUnit: 14000, bedrooms: 4, bathrooms: 4, balconies: 3,
    superBuiltUpArea: 2800, carpetArea: 2400, propertyType: "duplex", purpose: "sale",
    furnishing: "furnished", city: "Mumbai", locality: "Andheri",
    address: "Andheri West, Mumbai",
    coverImage: "/images/properties/prop-10.jpg",
    images: ["/images/properties/prop-10.jpg", "/images/properties/prop-06.jpg"],
    agentName: "Vikram Reddy", agentAvatar: "/images/agents/agent-03.jpg", agentPhone: "+91 98765 43212",
    isVerified: true, isFeatured: true, isPremium: true, isNewLaunch: false,
    status: "active", facing: "south", parking: 2, floorNumber: 15, totalFloors: 25,
    ageOfProperty: "0-1 years",
    description: "Magnificent duplex apartment with double-height ceiling, designer interiors, and breathtaking city views. The ultimate statement of luxury living in Mumbai.",
    amenities: ["Swimming Pool", "Gymnasium", "24/7 Security", "Power Backup", "Lift", "Parking", "Club House", "Wifi", "CCTV", "Fire Safety", "Landscaped Gardens"],
    viewCount: 1800, postedDate: "2026-06-05", rating: 4.9, enquiryCount: 38,
  },
];

const DEMO_PROJECTS: Project[] = [
  {
    id: 1, name: "Prestige City", slug: "prestige-city",
    builder: "Prestige Group", builderLogo: "/images/builders/prestige.png",
    city: "Bangalore", locality: "Sarjapur Road",
    coverImage: "/images/projects/project-01.jpg",
    configurations: ["1 BHK", "2 BHK", "3 BHK", "4 BHK"],
    priceRangeMin: 4500000, priceRangeMax: 22000000,
    projectStatus: "under_construction",
    possessionDate: "2028-06-01",
    totalTowers: 12, totalUnits: 2800,
    description: "A self-sustained township spread across 180 acres with world-class amenities including a 5-acre central park, clubhouse, swimming pools, and sports facilities.",
    reraId: "PRM/KA/RERA/1251/472/AG/2024",
    isFeatured: true, isVerified: true, viewCount: 3500, pricePerSqft: 6500,
    highlights: ["180 Acres Township", "5-Acre Central Park", "12 Towers", "Premium Clubhouse"],
  },
  {
    id: 2, name: "My Home Avatar", slug: "my-home-avatar",
    builder: "My Home Constructions", builderLogo: "/images/builders/myhome.png",
    city: "Hyderabad", locality: "Kokapet",
    coverImage: "/images/projects/project-02.jpg",
    configurations: ["3 BHK", "4 BHK", "5 BHK"],
    priceRangeMin: 18500000, priceRangeMax: 45000000,
    projectStatus: "new_launch",
    possessionDate: "2029-12-01",
    totalTowers: 8, totalUnits: 1200,
    description: "Ultra-luxury high-rise residences with panoramic lake views, smart home features, and an infinity pool on the 45th floor.",
    reraId: "TSRERA/HMDA/2024/0056",
    isFeatured: true, isVerified: true, viewCount: 4200, pricePerSqft: 12000,
    highlights: ["Lake Views", "Infinity Pool", "Smart Homes", "45 Floors"],
  },
  {
    id: 3, name: "Lodha Park", slug: "lodha-park",
    builder: "Lodha Group", builderLogo: "/images/builders/lodha.png",
    city: "Mumbai", locality: "Worli",
    coverImage: "/images/projects/project-01.jpg",
    configurations: ["2 BHK", "3 BHK", "4 BHK", "Penthouse"],
    priceRangeMin: 35000000, priceRangeMax: 120000000,
    projectStatus: "under_construction",
    possessionDate: "2027-09-01",
    totalTowers: 5, totalUnits: 800,
    description: "Mumbai's most iconic address with 7-acre private park, designer residences by Jade Jagger, and world-class wellness facilities.",
    reraId: "P51700000742",
    isFeatured: true, isVerified: true, viewCount: 5600, pricePerSqft: 18000,
    highlights: ["7-Acre Private Park", "Jade Jagger Design", "Sea Views", "Wellness Center"],
  },
  {
    id: 4, name: "Aparna One", slug: "aparna-one",
    builder: "Aparna Constructions", builderLogo: "/images/builders/aparna.png",
    city: "Hyderabad", locality: "Shaikpet",
    coverImage: "/images/projects/project-02.jpg",
    configurations: ["3 BHK", "4 BHK"],
    priceRangeMin: 22000000, priceRangeMax: 55000000,
    projectStatus: "ready_possession",
    possessionDate: "2026-08-01",
    totalTowers: 3, totalUnits: 450,
    description: "Premium gated community with spacious homes, tennis courts, squash courts, and a fully equipped business center.",
    reraId: "TSRERA/HMDA/2024/0123",
    isFeatured: false, isVerified: true, viewCount: 2100, pricePerSqft: 9500,
    highlights: ["Ready to Move", "Tennis Courts", "Business Center", "Gated Community"],
  },
  {
    id: 5, name: "Purva Atmosphere", slug: "purva-atmosphere",
    builder: "Puravankara", builderLogo: "/images/builders/purva.png",
    city: "Bangalore", locality: "Thanisandra",
    coverImage: "/images/projects/project-01.jpg",
    configurations: ["2 BHK", "3 BHK"],
    priceRangeMin: 7800000, priceRangeMax: 15000000,
    projectStatus: "under_construction",
    possessionDate: "2028-03-01",
    totalTowers: 6, totalUnits: 1600,
    description: "Sky residences with 75+ amenities including a floating sauna, sky lounge, and reflexology park.",
    reraId: "PRM/KA/RERA/1251/310/PR/2024",
    isFeatured: false, isVerified: true, viewCount: 1800, pricePerSqft: 7200,
    highlights: ["75+ Amenities", "Floating Sauna", "Sky Lounge", "Reflexology Park"],
  },
];

const DEMO_AGENTS: Agent[] = [
  { id: 1, name: "Rahul Kapoor", companyName: "Kapoor Realty", avatar: "/images/agents/agent-01.jpg", experience: 12, specialization: ["Residential", "Luxury"], rating: 4.8, reviewCount: 156, totalListings: 48, phone: "+91 98765 43210", email: "rahul@kapoorrealty.com", about: "With over 12 years of experience in Bangalore real estate, I specialize in luxury residential properties and premium villas.", verified: true, city: "Bangalore" },
  { id: 2, name: "Priya Sharma", companyName: "Sharma Properties", avatar: "/images/agents/agent-02.jpg", experience: 8, specialization: ["Residential", "Commercial"], rating: 4.6, reviewCount: 98, totalListings: 35, phone: "+91 98765 43211", email: "priya@sharmaproperties.com", about: "Expert in Bangalore and Hyderabad markets. Helping families find their dream homes since 2018.", verified: true, city: "Bangalore" },
  { id: 3, name: "Vikram Reddy", companyName: "Reddy Estates", avatar: "/images/agents/agent-03.jpg", experience: 15, specialization: ["Luxury", "Investment"], rating: 4.9, reviewCount: 234, totalListings: 62, phone: "+91 98765 43212", email: "vikram@reddyestates.com", about: "Hyderabad's leading luxury property consultant. Specializing in ultra-high-net-worth clientele and investment properties.", verified: true, city: "Hyderabad" },
  { id: 4, name: "Ananya Gupta", companyName: "Gupta Housing", avatar: "/images/agents/agent-02.jpg", experience: 6, specialization: ["Rentals", "PG"], rating: 4.4, reviewCount: 67, totalListings: 28, phone: "+91 98765 43213", email: "ananya@guptahousing.com", about: "Your go-to expert for rental properties and co-living spaces in Bangalore and Mumbai.", verified: true, city: "Mumbai" },
];

const DEMO_BLOG_POSTS: BlogPost[] = [
  { id: 1, title: "10 Things to Check Before Buying Your First Home", slug: "things-check-before-buying-first-home", excerpt: "Buying your first home is a major milestone. Here are the essential checks every first-time buyer should make.", content: "Full article content here...", category: "Buying Guide", categorySlug: "buying-guide", author: "Rahul Kapoor", authorAvatar: "/images/agents/agent-01.jpg", featuredImage: "/images/properties/prop-01.jpg", publishedAt: "2026-05-15", readTime: "8 min", viewCount: 1250, status: "published" as const, isFeatured: true },
  { id: 2, title: "Real Estate Investment: REITs vs Direct Property", slug: "reits-vs-direct-property-investment", excerpt: "Confused between REITs and direct property investment? We break down the pros and cons of each approach.", content: "Full article content here...", category: "Investment", categorySlug: "investment", author: "Vikram Reddy", authorAvatar: "/images/agents/agent-03.jpg", featuredImage: "/images/properties/prop-03.jpg", publishedAt: "2026-05-20", readTime: "6 min", viewCount: 890, status: "published" as const, isFeatured: false },
  { id: 3, title: "Bangalore Property Market Trends 2026", slug: "bangalore-property-market-trends-2026", excerpt: "An in-depth analysis of Bangalore's real estate market trends, price movements, and emerging localities.", content: "Full article content here...", category: "Market Trends", categorySlug: "market-trends", author: "Priya Sharma", authorAvatar: "/images/agents/agent-02.jpg", featuredImage: "/images/cities/bangalore.jpg", publishedAt: "2026-06-01", readTime: "10 min", viewCount: 2100, status: "published" as const, isFeatured: true },
  { id: 4, title: "Home Renovation Ideas That Add Value", slug: "home-renovation-ideas-add-value", excerpt: "Smart renovation ideas that not only improve your living space but also increase your property's market value.", content: "Full article content here...", category: "Home Improvement", categorySlug: "home-improvement", author: "Ananya Gupta", authorAvatar: "/images/agents/agent-02.jpg", featuredImage: "/images/properties/prop-02.jpg", publishedAt: "2026-06-05", readTime: "5 min", viewCount: 650, status: "published" as const, isFeatured: false },
  { id: 5, title: "Understanding RERA: A Complete Guide", slug: "understanding-rera-complete-guide", excerpt: "Everything you need to know about the Real Estate Regulation Act and how it protects homebuyers.", content: "Full article content here...", category: "Legal", categorySlug: "legal", author: "Rahul Kapoor", authorAvatar: "/images/agents/agent-01.jpg", featuredImage: "/images/projects/project-01.jpg", publishedAt: "2026-06-10", readTime: "12 min", viewCount: 3200, status: "published" as const, isFeatured: false },
];

const DEMO_CITIES: City[] = [
  { id: 1, name: "Bangalore", slug: "bangalore", state: "Karnataka", image: "/images/cities/bangalore.jpg", propertyCount: 4200, projectCount: 85 },
  { id: 2, name: "Hyderabad", slug: "hyderabad", state: "Telangana", image: "/images/cities/hyderabad.jpg", propertyCount: 3100, projectCount: 62 },
  { id: 3, name: "Mumbai", slug: "mumbai", state: "Maharashtra", image: "/images/cities/mumbai.jpg", propertyCount: 5600, projectCount: 120 },
  { id: 4, name: "Chennai", slug: "chennai", state: "Tamil Nadu", image: "/images/cities/bangalore.jpg", propertyCount: 2800, projectCount: 55 },
  { id: 5, name: "Pune", slug: "pune", state: "Maharashtra", image: "/images/cities/hyderabad.jpg", propertyCount: 2400, projectCount: 48 },
  { id: 6, name: "Delhi NCR", slug: "delhi-ncr", state: "Delhi", image: "/images/cities/mumbai.jpg", propertyCount: 6800, projectCount: 145 },
];

const DEMO_TESTIMONIALS = [
  { id: 1, name: "Amit Kumar", avatar: "/images/agents/agent-01.jpg", role: "Home Buyer", text: "EstateOne made our home buying journey incredibly smooth. The verified listings and direct agent connect feature saved us so much time.", rating: 5, propertyType: "3BHK Apartment" },
  { id: 2, name: "Sneha Reddy", avatar: "/images/agents/agent-02.jpg", role: "Property Investor", text: "The investment analysis tools and market insights helped me make informed decisions. Best real estate platform in India.", rating: 5, propertyType: "Villa Investment" },
  { id: 3, name: "Rajesh Gupta", avatar: "/images/agents/agent-03.jpg", role: "First-time Buyer", text: "As a first-time buyer, I was nervous. But the guides and the helpful team at EstateOne made everything easy to understand.", rating: 5, propertyType: "2BHK Apartment" },
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [savedProperties, setSavedProperties] = useState<number[]>(() => {
    const stored = localStorage.getItem("saved_properties");
    return stored ? JSON.parse(stored) : [];
  });
  const [compareList, setCompareList] = useState<number[]>(() => {
    const stored = localStorage.getItem("compare_list");
    return stored ? JSON.parse(stored) : [];
  });
  const [leads, setLeads] = useState<Lead[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  const toggleSave = useCallback((id: number) => {
    setSavedProperties((prev) => {
      const updated = prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id];
      localStorage.setItem("saved_properties", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const toggleCompare = useCallback((id: number) => {
    setCompareList((prev) => {
      if (prev.includes(id)) {
        const updated = prev.filter((p) => p !== id);
        localStorage.setItem("compare_list", JSON.stringify(updated));
        return updated;
      }
      if (prev.length >= 3) return prev;
      const updated = [...prev, id];
      localStorage.setItem("compare_list", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isSaved = useCallback((id: number) => savedProperties.includes(id), [savedProperties]);
  const isCompared = useCallback((id: number) => compareList.includes(id), [compareList]);

  const addEnquiry = useCallback((enquiry: Omit<Enquiry, "id" | "createdAt" | "status">) => {
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: Date.now(),
      status: "New",
      createdAt: new Date().toISOString(),
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);
  }, []);

  const addLead = useCallback((lead: Omit<Lead, "id" | "createdAt">) => {
    const newLead: Lead = {
      ...lead,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    setLeads((prev) => [newLead, ...prev]);
  }, []);

  const updateLeadStatus = useCallback((id: number, status: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  }, []);

  const getPropertyBySlug = useCallback((slug: string) => {
    return DEMO_PROPERTIES.find((p) => p.slug === slug);
  }, []);

  const getProjectBySlug = useCallback((slug: string) => {
    return DEMO_PROJECTS.find((p) => p.slug === slug);
  }, []);

  const getAgentById = useCallback((id: number) => {
    return DEMO_AGENTS.find((a) => a.id === id);
  }, []);

  const getBlogPostBySlug = useCallback((slug: string) => {
    return DEMO_BLOG_POSTS.find((p) => p.slug === slug);
  }, []);

  const filterProperties = useCallback((filters: PropertyFilters) => {
    return DEMO_PROPERTIES.filter((p) => {
      if (filters.purpose && p.purpose !== filters.purpose) return false;
      if (filters.city && p.city !== filters.city) return false;
      if (filters.propertyType && p.propertyType !== filters.propertyType) return false;
      if (filters.bedrooms && p.bedrooms !== filters.bedrooms) return false;
      if (filters.minPrice && p.price < filters.minPrice) return false;
      if (filters.maxPrice && p.price > filters.maxPrice) return false;
      if (filters.furnishing && p.furnishing !== filters.furnishing) return false;
      if (filters.isVerified && !p.isVerified) return false;
      if (filters.isFeatured && !p.isFeatured) return false;
      return true;
    });
  }, []);

  return (
    <DataContext.Provider
      value={{
        properties: DEMO_PROPERTIES,
        projects: DEMO_PROJECTS,
        agents: DEMO_AGENTS,
        blogPosts: DEMO_BLOG_POSTS,
        cities: DEMO_CITIES,
        testimonials: DEMO_TESTIMONIALS,
        leads,
        enquiries,
        savedProperties,
        compareList,
        toggleSave,
        toggleCompare,
        isSaved,
        isCompared,
        addEnquiry,
        addLead,
        updateLeadStatus,
        getPropertyBySlug,
        getProjectBySlug,
        getAgentById,
        getBlogPostBySlug,
        filterProperties,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within DataProvider");
  return context;
}
