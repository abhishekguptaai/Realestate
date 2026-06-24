import { relations } from "drizzle-orm";
import {
  users,
  userPreferences,
  agents,
  builders,
  cities,
  localities,
  properties,
  propertyImages,
  amenities,
  propertyAmenities,
  projects,
  projectTowers,
  projectUnits,
  leads,
  appointments,
  favorites,
  compareItems,
  blogCategories,
  blogPosts,
  notifications,
  reviews,
  savedSearches,
  activityLogs,
  subscriptionPlans,
} from "./schema";

export const usersRelations = relations(users, ({ one, many }) => ({
  preferences: one(userPreferences),
  agent: one(agents),
  builder: one(builders),
  favorites: many(favorites),
  compareItems: many(compareItems),
  notifications: many(notifications),
  reviews: many(reviews),
  savedSearches: many(savedSearches),
  activityLogs: many(activityLogs),
}));

export const userPreferencesRelations = relations(userPreferences, ({ one }) => ({
  user: one(users, { fields: [userPreferences.userId], references: [users.id] }),
}));

export const agentsRelations = relations(agents, ({ one, many }) => ({
  user: one(users, { fields: [agents.userId], references: [users.id] }),
  properties: many(properties),
  leads: many(leads),
  appointments: many(appointments),
  reviews: many(reviews),
}));

export const buildersRelations = relations(builders, ({ one, many }) => ({
  user: one(users, { fields: [builders.userId], references: [users.id] }),
  projects: many(projects),
  reviews: many(reviews),
}));

export const citiesRelations = relations(cities, ({ many }) => ({
  localities: many(localities),
  properties: many(properties),
  projects: many(projects),
}));

export const localitiesRelations = relations(localities, ({ one, many }) => ({
  city: one(cities, { fields: [localities.cityId], references: [cities.id] }),
  properties: many(properties),
  projects: many(projects),
}));

export const propertiesRelations = relations(properties, ({ one, many }) => ({
  agent: one(agents, { fields: [properties.agentId], references: [agents.id] }),
  builder: one(builders, { fields: [properties.builderId], references: [builders.id] }),
  city: one(cities, { fields: [properties.cityId], references: [cities.id] }),
  locality: one(localities, { fields: [properties.localityId], references: [localities.id] }),
  images: many(propertyImages),
  amenities: many(propertyAmenities),
  leads: many(leads),
  appointments: many(appointments),
  favorites: many(favorites),
  compareItems: many(compareItems),
  reviews: many(reviews),
}));

export const propertyImagesRelations = relations(propertyImages, ({ one }) => ({
  property: one(properties, { fields: [propertyImages.propertyId], references: [properties.id] }),
}));

export const amenitiesRelations = relations(amenities, ({ many }) => ({
  propertyAmenities: many(propertyAmenities),
}));

export const propertyAmenitiesRelations = relations(propertyAmenities, ({ one }) => ({
  property: one(properties, { fields: [propertyAmenities.propertyId], references: [properties.id] }),
  amenity: one(amenities, { fields: [propertyAmenities.amenityId], references: [amenities.id] }),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  builder: one(builders, { fields: [projects.builderId], references: [builders.id] }),
  city: one(cities, { fields: [projects.cityId], references: [cities.id] }),
  locality: one(localities, { fields: [projects.localityId], references: [localities.id] }),
  towers: many(projectTowers),
  units: many(projectUnits),
  leads: many(leads),
  appointments: many(appointments),
}));

export const projectTowersRelations = relations(projectTowers, ({ one, many }) => ({
  project: one(projects, { fields: [projectTowers.projectId], references: [projects.id] }),
  units: many(projectUnits),
}));

export const projectUnitsRelations = relations(projectUnits, ({ one }) => ({
  project: one(projects, { fields: [projectUnits.projectId], references: [projects.id] }),
  tower: one(projectTowers, { fields: [projectUnits.towerId], references: [projectTowers.id] }),
}));

export const leadsRelations = relations(leads, ({ one, many }) => ({
  property: one(properties, { fields: [leads.propertyId], references: [properties.id] }),
  project: one(projects, { fields: [leads.projectId], references: [projects.id] }),
  agent: one(agents, { fields: [leads.agentId], references: [agents.id] }),
  appointments: many(appointments),
}));

export const appointmentsRelations = relations(appointments, ({ one }) => ({
  lead: one(leads, { fields: [appointments.leadId], references: [leads.id] }),
  property: one(properties, { fields: [appointments.propertyId], references: [properties.id] }),
  project: one(projects, { fields: [appointments.projectId], references: [projects.id] }),
  agent: one(agents, { fields: [appointments.agentId], references: [agents.id] }),
}));

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, { fields: [favorites.userId], references: [users.id] }),
  property: one(properties, { fields: [favorites.propertyId], references: [properties.id] }),
}));

export const compareItemsRelations = relations(compareItems, ({ one }) => ({
  user: one(users, { fields: [compareItems.userId], references: [users.id] }),
  property: one(properties, { fields: [compareItems.propertyId], references: [properties.id] }),
}));

export const blogCategoriesRelations = relations(blogCategories, ({ many }) => ({
  posts: many(blogPosts),
}));

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  category: one(blogCategories, { fields: [blogPosts.categoryId], references: [blogCategories.id] }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, { fields: [notifications.userId], references: [users.id] }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  reviewer: one(users, { fields: [reviews.reviewerId], references: [users.id] }),
  property: one(properties, { fields: [reviews.propertyId], references: [properties.id] }),
  agent: one(agents, { fields: [reviews.agentId], references: [agents.id] }),
  builder: one(builders, { fields: [reviews.builderId], references: [builders.id] }),
}));

export const savedSearchesRelations = relations(savedSearches, ({ one }) => ({
  user: one(users, { fields: [savedSearches.userId], references: [users.id] }),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  user: one(users, { fields: [activityLogs.userId], references: [users.id] }),
}));
