import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

// ... (imports)

export const createBlog = mutation({
  args: {
    name: v.string(), // Changed from "name"
    content: v.string(),
    image: v.optional(v.id("_storage")),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return;
    }

    const user = await ctx.db.get(userId);

    if (!user?._id || !user.name) {
      throw new Error("User not authenticated");
    }

    const blog = await ctx.db.insert("blogs", {
      authorId: user._id,
      authorName: user.name,
      name: args.name, // Changed from "name"
      content: args.content,
      image: args.image,
      imageUrl: args.imageUrl,
    });

    return blog;
  },
});

// ... (imports)

export const updateBlog = mutation({
  args: {
    blogId: v.id("blogs"),
    name: v.string(), // Changed from "name"
    content: v.string(),
    image: v.optional(v.id("_storage")),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    const blogId = await ctx.db.get(args.blogId);

    if (!userId || !blogId) {
      return null;
    }
    const user = await ctx.db.get(userId);
    const blog = await ctx.db.get(args.blogId);

    if (!blog || !user) {
      return null;
    }

    // Check if the user is the author of the blog

    if (blog.authorId !== user._id) {
      throw new Error("Unauthorized to update this blog");
    }

    const updatedBlog = await ctx.db.patch(args.blogId, {
      name: args.name, // Changed from "name"
      content: args.content,
      image: args.image,
      imageUrl: args.imageUrl,
      updatedAt: Date.now().toString(), // Store as numerical timestamp (string)
    });
    return updatedBlog;
  },
});
export const removeBlog = mutation({
  args: {
    blogId: v.id("blogs"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    const blogId = await ctx.db.get(args.blogId);

    if (!userId || !blogId) {
      return null;
    }
    const user = await ctx.db.get(userId);
    const blog = await ctx.db.get(args.blogId);

    if (!blog || !user) {
      return null;
    }

    // Check if the user is the author of the blog

    if (blog.authorId !== user._id) {
      throw new Error("Unauthorized to update this blog");
    }

    if (blog.image) {
      await ctx.storage.delete(blog.image);
    }

    const removedBlog = await ctx.db.delete(args.blogId);

    return removedBlog;
  },
});

export const getBlogById = () => {};
