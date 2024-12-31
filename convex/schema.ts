// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  blogs: defineTable({
    name: v.string(),
    content: v.string(),
    authorName: v.string(),
    authorId: v.id("users"),
    image: v.optional(v.id("_storage")),
    imageUrl: v.optional(v.string()),
    updatedAt: v.optional(v.string()),
  }),
  usersBlogsInteractions: defineTable({
    userId: v.id("users"),
    blogId: v.id("blogs"),
    isLiked: v.boolean(),
    isSaved: v.boolean(),
  }),
  userProfiles: defineTable({
    userId: v.id("users"), // Foreign key referencing the "users" table
    profileImage: v.optional(v.id("_storage")), // Store profile image in Convex storage
    profileImageUrl: v.optional(v.string()),
    address: v.optional(v.string()),
    // ... other profile fields (e.g., bio, website, etc.)
  }),

  // Your other tables...
});

export default schema;
