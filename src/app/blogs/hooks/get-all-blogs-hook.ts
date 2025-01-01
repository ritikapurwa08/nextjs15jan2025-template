import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const UseGetAllBlogsHook = () => {
  const blogs = useQuery(api.blogs.getAllBlogs);
  return {
    blogs,
  };
};
