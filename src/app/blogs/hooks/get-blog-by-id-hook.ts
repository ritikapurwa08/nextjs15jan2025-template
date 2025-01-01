import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

interface GetBlogByIdHookProps {
  blogId: Id<"blogs">;
}

export const UseGetBlogByIdHook = ({ blogId }: GetBlogByIdHookProps) => {
  const blog = useQuery(api.blogs.getBlogById, { blogId });
  return {
    blog,
  };
};
