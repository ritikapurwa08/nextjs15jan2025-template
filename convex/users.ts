import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "../convex/_generated/server";

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      return null;
    }

    const user = await ctx.db.get(userId);

    return user;
  },
});
