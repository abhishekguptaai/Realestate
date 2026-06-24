import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  bigint,
  int,
  decimal,
  json,
  boolean,
  index,
} from "drizzle-orm/mysql-core";

// ============================================================
// USERS & AUTH
// ============================================================

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  phone: varchar("phone", { length: 20 }),
  role: mysqlEnum("role", ["user", "agent", "builder", "admin"]).default("user").notNull(),
  status: mysqlEnum("status", ["active", "inactive", "pending", "suspended"]).default("active").notNull(),
  city: varchar("city", { length: 100 }),
  preferredLanguage: varchar("preferredLanguage", { length: 10 }).default("en"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export const userPreferences = mysqlTable("user_preferences", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
  budgetMin: decimal("budgetMin", { precision: 15, scale: 2 }),
  budgetMax: decimal("budgetMax", { precision: 15, scale: 2 }),
  propertyTypes: json("propertyTypes").$type<string[]>(),
  bhkPreferences: json("bhkPreferences").$type<string[]>(),
  preferredCities: json("preferredCities").$type<string[]>(),
  preferredLocalities: json("preferredLocalities").$type<string[]>(),
  purpose: mysqlEnum("purpose", ["buy", "rent", "invest"]).default("buy"),
  furnishingPreference: mysqlEnum("furnishingPreference", ["any", "furnished", "semi-furnished", "unfurnished"]).default("any"),
  notificationEmail: boolean("notificationEmail").default(true),
  notificationSms: boolean("notificationSms").default(false),
  notificationWhatsapp: boolean("notificationWhatsapp").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

// ============================================================
// AGENTS
// ============================================================

export const agents = mysqlTable("agents", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
  companyName: varchar("companyName", { length: 255 }),
  reraNumber: varchar("reraNumber", { length: 100 }),
  experience: int("experience"),
  specialization: json("specialization").$type<string[]>(),
  about: text("about"),
  website: varchar("website", { length: 255 }),
  licenseNumber: varchar("licenseNumber", { length: 100 }),
  verificationStatus: mysqlEnum("verificationStatus", ["pending", "verified", "rejected"]).default("pending").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).default("0"),
  reviewCount: int("reviewCount").default(0),
  totalListings: int("totalListings").default(0),
  totalLeads: int("totalLeads").default(0),
  totalSales: int("totalSales").default(0),
  subscriptionPlan: mysqlEnum("subscriptionPlan", ["free", "basic", "professional", "premium"]).default("free"),
  subscriptionExpiry: timestamp("subscriptionExpiry"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

// ============================================================
// BUILDERS / DEVELOPERS
// ============================================================

export const builders = mysqlTable("builders", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
  companyName: varchar("companyName", { length: 255 }).notNull(),
  reraNumber: varchar("reraNumber", { length: 100 }),
  establishedYear: int("establishedYear"),
  description: text("description"),
  logo: text("logo"),
  website: varchar("website", { length: 255 }),
  headquarters: varchar("headquarters", { length: 255 }),
  totalProjects: int("totalProjects").default(0),
  completedProjects: int("completedProjects").default(0),
  ongoingProjects: int("ongoingProjects").default(0),
  verificationStatus: mysqlEnum("verificationStatus", ["pending", "verified", "rejected"]).default("pending").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).default("0"),
  reviewCount: int("reviewCount").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

// ============================================================
// LOCATIONS
// ============================================================

export const cities = mysqlTable("cities", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  state: varchar("state", { length: 100 }).notNull(),
  country: varchar("country", { length: 100 }).default("India"),
  description: text("description"),
  image: text("image"),
  propertyCount: int("propertyCount").default(0),
  projectCount: int("projectCount").default(0),
  isPopular: boolean("isPopular").default(false),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const localities = mysqlTable("localities", {
  id: serial("id").primaryKey(),
  cityId: bigint("cityId", { mode: "number", unsigned: true }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull(),
  description: text("description"),
  propertyCount: int("propertyCount").default(0),
  averagePrice: decimal("averagePrice", { precision: 12, scale: 2 }),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  landmarks: json("landmarks").$type<string[]>(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ============================================================
// PROPERTIES
// ============================================================

export const properties = mysqlTable("properties", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  description: text("description"),
  
  // Ownership & Type
  agentId: bigint("agentId", { mode: "number", unsigned: true }),
  builderId: bigint("builderId", { mode: "number", unsigned: true }),
  postedBy: mysqlEnum("postedBy", ["owner", "agent", "builder"]).default("agent").notNull(),
  
  // Property Type
  purpose: mysqlEnum("purpose", ["sale", "rent", "lease"]).notNull(),
  propertyType: mysqlEnum("propertyType", [
    "apartment", "villa", "independent_house", "plot", "penthouse", 
    "studio", "duplex", "builder_floor", "farm_house", "commercial_office",
    "retail_shop", "warehouse", "industrial", "coworking", "pg"
  ]).notNull(),
  propertySubType: varchar("propertySubType", { length: 50 }),
  
  // Location
  cityId: bigint("cityId", { mode: "number", unsigned: true }).notNull(),
  localityId: bigint("localityId", { mode: "number", unsigned: true }),
  address: text("address"),
  landmark: varchar("landmark", { length: 255 }),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  pincode: varchar("pincode", { length: 10 }),
  
  // Specifications
  bedrooms: int("bedrooms"),
  bathrooms: int("bathrooms"),
  balconies: int("balconies"),
  totalFloors: int("totalFloors"),
  floorNumber: int("floorNumber"),
  superBuiltUpArea: decimal("superBuiltUpArea", { precision: 10, scale: 2 }),
  carpetArea: decimal("carpetArea", { precision: 10, scale: 2 }),
  plotArea: decimal("plotArea", { precision: 10, scale: 2 }),
  areaUnit: mysqlEnum("areaUnit", ["sqft", "sqyd", "sqm", "acre"]).default("sqft"),
  
  // Furnishing & Condition
  furnishing: mysqlEnum("furnishing", ["furnished", "semi-furnished", "unfurnished"]),
  ageOfProperty: varchar("ageOfProperty", { length: 50 }),
  condition: mysqlEnum("condition", ["new", "excellent", "good", "needs_renovation"]),
  
  // Facing & Other
  facing: mysqlEnum("facing", ["north", "south", "east", "west", "north_east", "north_west", "south_east", "south_west"]),
  parking: int("parking").default(0),
  
  // Pricing
  price: decimal("price", { precision: 15, scale: 2 }).notNull(),
  pricePerUnit: decimal("pricePerUnit", { precision: 12, scale: 2 }),
  maintenanceCharges: decimal("maintenanceCharges", { precision: 10, scale: 2 }),
  maintenanceFrequency: mysqlEnum("maintenanceFrequency", ["monthly", "quarterly", "yearly"]),
  securityDeposit: decimal("securityDeposit", { precision: 15, scale: 2 }),
  isNegotiable: boolean("isNegotiable").default(false),
  
  // Status & Flags
  status: mysqlEnum("status", [
    "draft", "pending_approval", "active", "sold", "rented", 
    "under_negotiation", "blocked", "rejected", "expired"
  ]).default("pending_approval").notNull(),
  availabilityDate: timestamp("availabilityDate"),
  
  // Feature Flags
  isVerified: boolean("isVerified").default(false),
  isFeatured: boolean("isFeatured").default(false),
  isPremium: boolean("isPremium").default(false),
  isNewLaunch: boolean("isNewLaunch").default(false),
  
  // SEO
  metaTitle: varchar("metaTitle", { length: 255 }),
  metaDescription: text("metaDescription"),
  
  // Views & Analytics
  viewCount: int("viewCount").default(0),
  enquiryCount: int("enquiryCount").default(0),
  favoriteCount: int("favoriteCount").default(0),
  
  // Media
  coverImage: text("coverImage"),
  videoUrl: text("videoUrl"),
  virtualTourUrl: text("virtualTourUrl"),
  
  // RERA
  reraId: varchar("reraId", { length: 100 }),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
}, (table) => [
  index("idx_properties_city").on(table.cityId),
  index("idx_properties_locality").on(table.localityId),
  index("idx_properties_agent").on(table.agentId),
  index("idx_properties_status").on(table.status),
  index("idx_properties_purpose").on(table.purpose),
  index("idx_properties_type").on(table.propertyType),
  index("idx_properties_price").on(table.price),
  index("idx_properties_slug").on(table.slug),
]);

// ============================================================
// PROPERTY IMAGES
// ============================================================

export const propertyImages = mysqlTable("property_images", {
  id: serial("id").primaryKey(),
  propertyId: bigint("propertyId", { mode: "number", unsigned: true }).notNull(),
  url: text("url").notNull(),
  caption: varchar("caption", { length: 255 }),
  isCover: boolean("isCover").default(false),
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ============================================================
// AMENITIES
// ============================================================

export const amenities = mysqlTable("amenities", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  icon: varchar("icon", { length: 50 }),
  category: mysqlEnum("category", ["security", "convenience", "leisure", "wellness", "technology", "environment", "parking", "safety"]).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const propertyAmenities = mysqlTable("property_amenities", {
  id: serial("id").primaryKey(),
  propertyId: bigint("propertyId", { mode: "number", unsigned: true }).notNull(),
  amenityId: bigint("amenityId", { mode: "number", unsigned: true }).notNull(),
});

// ============================================================
// PROJECTS
// ============================================================

export const projects = mysqlTable("projects", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  builderId: bigint("builderId", { mode: "number", unsigned: true }).notNull(),
  
  // Location
  cityId: bigint("cityId", { mode: "number", unsigned: true }).notNull(),
  localityId: bigint("localityId", { mode: "number", unsigned: true }),
  address: text("address"),
  landmark: varchar("landmark", { length: 255 }),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  
  // Description
  description: text("description"),
  highlights: json("highlights").$type<string[]>(),
  
  // Project Specs
  totalTowers: int("totalTowers"),
  totalUnits: int("totalUnits"),
  totalFloors: int("totalFloors"),
  configurations: json("configurations").$type<string[]>(),
  unitTypes: json("unitTypes").$type<string[]>(),
  sizes: json("sizes").$type<string[]>(),
  
  // Pricing
  priceRangeMin: decimal("priceRangeMin", { precision: 15, scale: 2 }),
  priceRangeMax: decimal("priceRangeMax", { precision: 15, scale: 2 }),
  pricePerSqft: decimal("pricePerSqft", { precision: 10, scale: 2 }),
  
  // Status
  projectStatus: mysqlEnum("projectStatus", [
    "pre_launch", "new_launch", "under_construction", 
    "ready_possession", "completed", "sold_out"
  ]).notNull(),
  possessionDate: timestamp("possessionDate"),
  launchDate: timestamp("launchDate"),
  
  // RERA
  reraId: varchar("reraId", { length: 100 }),
  
  // Media
  coverImage: text("coverImage"),
  brochureUrl: text("brochureUrl"),
  videoUrl: text("videoUrl"),
  
  // Features
  isFeatured: boolean("isFeatured").default(false),
  isVerified: boolean("isVerified").default(false),
  
  // SEO
  metaTitle: varchar("metaTitle", { length: 255 }),
  metaDescription: text("metaDescription"),
  
  // Analytics
  viewCount: int("viewCount").default(0),
  enquiryCount: int("enquiryCount").default(0),
  
  // Status
  approvalStatus: mysqlEnum("approvalStatus", ["pending", "approved", "rejected"]).default("pending").notNull(),
  rejectionReason: text("rejectionReason"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

// ============================================================
// PROJECT INVENTORY / UNITS
// ============================================================

export const projectTowers = mysqlTable("project_towers", {
  id: serial("id").primaryKey(),
  projectId: bigint("projectId", { mode: "number", unsigned: true }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  totalFloors: int("totalFloors"),
  totalUnits: int("totalUnits"),
  status: mysqlEnum("status", ["active", "sold_out", "blocked"]).default("active"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const projectUnits = mysqlTable("project_units", {
  id: serial("id").primaryKey(),
  projectId: bigint("projectId", { mode: "number", unsigned: true }).notNull(),
  towerId: bigint("towerId", { mode: "number", unsigned: true }),
  unitNumber: varchar("unitNumber", { length: 50 }).notNull(),
  floorNumber: int("floorNumber").notNull(),
  
  // Unit Specs
  unitType: varchar("unitType", { length: 50 }).notNull(),
  bedrooms: int("bedrooms"),
  bathrooms: int("bathrooms"),
  balconies: int("balconies"),
  carpetArea: decimal("carpetArea", { precision: 10, scale: 2 }),
  superBuiltUpArea: decimal("superBuiltUpArea", { precision: 10, scale: 2 }),
  facing: mysqlEnum("facing", ["north", "south", "east", "west", "north_east", "north_west", "south_east", "south_west"]),
  
  // Pricing
  price: decimal("price", { precision: 15, scale: 2 }).notNull(),
  bookingAmount: decimal("bookingAmount", { precision: 12, scale: 2 }),
  
  // Status
  unitStatus: mysqlEnum("unitStatus", [
    "available", "reserved", "sold", "blocked", "hold", "not_released"
  ]).default("available").notNull(),
  
  // Buyer info (if sold/reserved)
  buyerName: varchar("buyerName", { length: 255 }),
  buyerPhone: varchar("buyerPhone", { length: 20 }),
  bookingDate: timestamp("bookingDate"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
}, (table) => [
  index("idx_units_project").on(table.projectId),
  index("idx_units_tower").on(table.towerId),
  index("idx_units_status").on(table.unitStatus),
]);

// ============================================================
// LEADS & ENQUIRIES
// ============================================================

export const leads = mysqlTable("leads", {
  id: serial("id").primaryKey(),
  
  // Lead Source
  propertyId: bigint("propertyId", { mode: "number", unsigned: true }),
  projectId: bigint("projectId", { mode: "number", unsigned: true }),
  agentId: bigint("agentId", { mode: "number", unsigned: true }),
  
  // Lead Info
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  message: text("message"),
  
  // Source & Type
  source: mysqlEnum("source", [
    "website", "whatsapp", "phone", "email", "walk_in", 
    "referral", "social_media", "paid_ads", "direct"
  ]).default("website").notNull(),
  leadType: mysqlEnum("leadType", [
    "property_enquiry", "site_visit", "callback_request", 
    "brochure_download", "price_query", "loan_query", 
    "general", "project_enquiry"
  ]).default("property_enquiry").notNull(),
  
  // CRM Pipeline
  status: mysqlEnum("status", [
    "new", "contacted", "qualified", "site_visit_scheduled",
    "site_visit_done", "negotiation", "won", "lost", "follow_up"
  ]).default("new").notNull(),
  
  // Assignment
  assignedTo: bigint("assignedTo", { mode: "number", unsigned: true }),
  
  // Follow-up
  nextFollowUpDate: timestamp("nextFollowUpDate"),
  followUpNotes: text("followUpNotes"),
  
  // User tracking
  userId: bigint("userId", { mode: "number", unsigned: true }),
  ipAddress: varchar("ipAddress", { length: 45 }),
  
  // Budget & Preferences (for qualification)
  budget: decimal("budget", { precision: 15, scale: 2 }),
  preferredLocation: varchar("preferredLocation", { length: 255 }),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
}, (table) => [
  index("idx_leads_agent").on(table.agentId),
  index("idx_leads_status").on(table.status),
  index("idx_leads_property").on(table.propertyId),
  index("idx_leads_created").on(table.createdAt),
]);

// ============================================================
// APPOINTMENTS / SITE VISITS
// ============================================================

export const appointments = mysqlTable("appointments", {
  id: serial("id").primaryKey(),
  leadId: bigint("leadId", { mode: "number", unsigned: true }),
  propertyId: bigint("propertyId", { mode: "number", unsigned: true }),
  projectId: bigint("projectId", { mode: "number", unsigned: true }),
  agentId: bigint("agentId", { mode: "number", unsigned: true }),
  userId: bigint("userId", { mode: "number", unsigned: true }),
  
  // Visit Details
  visitorName: varchar("visitorName", { length: 255 }).notNull(),
  visitorPhone: varchar("visitorPhone", { length: 20 }),
  visitorEmail: varchar("visitorEmail", { length: 320 }),
  visitDate: timestamp("visitDate").notNull(),
  visitTime: varchar("visitTime", { length: 20 }),
  notes: text("notes"),
  
  // Status
  status: mysqlEnum("status", [
    "scheduled", "confirmed", "completed", "cancelled", 
    "no_show", "rescheduled"
  ]).default("scheduled").notNull(),
  
  // Feedback
  feedback: text("feedback"),
  rating: int("rating"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

// ============================================================
// FAVORITES & COMPARE
// ============================================================

export const favorites = mysqlTable("favorites", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
  propertyId: bigint("propertyId", { mode: "number", unsigned: true }),
  projectId: bigint("projectId", { mode: "number", unsigned: true }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const compareItems = mysqlTable("compare_items", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
  propertyId: bigint("propertyId", { mode: "number", unsigned: true }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ============================================================
// BLOG
// ============================================================

export const blogCategories = mysqlTable("blog_categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  postCount: int("postCount").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const blogPosts = mysqlTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  categoryId: bigint("categoryId", { mode: "number", unsigned: true }).notNull(),
  authorId: bigint("authorId", { mode: "number", unsigned: true }),
  
  // Media
  featuredImage: text("featuredImage"),
  
  // SEO
  metaTitle: varchar("metaTitle", { length: 255 }),
  metaDescription: text("metaDescription"),
  
  // Status
  status: mysqlEnum("status", ["draft", "published", "archived"]).default("draft").notNull(),
  isFeatured: boolean("isFeatured").default(false),
  
  // Analytics
  viewCount: int("viewCount").default(0),
  
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

// ============================================================
// NOTIFICATIONS
// ============================================================

export const notifications = mysqlTable("notifications", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message"),
  type: mysqlEnum("type", ["lead", "appointment", "property", "system", "message"]).notNull(),
  isRead: boolean("isRead").default(false),
  link: varchar("link", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ============================================================
// REVIEWS
// ============================================================

export const reviews = mysqlTable("reviews", {
  id: serial("id").primaryKey(),
  reviewerId: bigint("reviewerId", { mode: "number", unsigned: true }).notNull(),
  propertyId: bigint("propertyId", { mode: "number", unsigned: true }),
  projectId: bigint("projectId", { mode: "number", unsigned: true }),
  agentId: bigint("agentId", { mode: "number", unsigned: true }),
  builderId: bigint("builderId", { mode: "number", unsigned: true }),
  
  rating: int("rating").notNull(),
  title: varchar("title", { length: 255 }),
  comment: text("comment"),
  
  // Moderation
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ============================================================
// SAVED SEARCHES
// ============================================================

export const savedSearches = mysqlTable("saved_searches", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  filters: json("filters").$type<Record<string, unknown>>(),
  emailAlert: boolean("emailAlert").default(true),
  lastResultCount: int("lastResultCount"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ============================================================
// ACTIVITY LOGS
// ============================================================

export const activityLogs = mysqlTable("activity_logs", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }),
  action: varchar("action", { length: 100 }).notNull(),
  entityType: varchar("entityType", { length: 50 }),
  entityId: bigint("entityId", { mode: "number", unsigned: true }),
  details: json("details"),
  ipAddress: varchar("ipAddress", { length: 45 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ============================================================
// SUBSCRIPTION PLANS
// ============================================================

export const subscriptionPlans = mysqlTable("subscription_plans", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  duration: int("duration").notNull(), // in days
  features: json("features").$type<string[]>(),
  maxListings: int("maxListings"),
  maxFeaturedListings: int("maxFeaturedListings"),
  maxProjects: int("maxProjects"),
  leadAccess: boolean("leadAccess").default(false),
  analyticsAccess: boolean("analyticsAccess").default(false),
  prioritySupport: boolean("prioritySupport").default(false),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ============================================================
// TYPE EXPORTS
// ============================================================

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Property = typeof properties.$inferSelect;
export type InsertProperty = typeof properties.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;
export type Agent = typeof agents.$inferSelect;
export type Builder = typeof builders.$inferSelect;
export type Lead = typeof leads.$inferSelect;
export type Appointment = typeof appointments.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type City = typeof cities.$inferSelect;
export type Locality = typeof localities.$inferSelect;
export type Favorite = typeof favorites.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type ProjectUnit = typeof projectUnits.$inferSelect;
export type ProjectTower = typeof projectTowers.$inferSelect;
export type Amenity = typeof amenities.$inferSelect;
