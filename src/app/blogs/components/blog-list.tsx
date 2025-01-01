"use client";

import React from "react";
import { UseGetAllBlogsHook } from "../hooks/get-all-blogs-hook";
import { LoaderIcon } from "lucide-react";
import BlogCard from "./blog-card";

const BlogList = () => {
  const { blogs } = UseGetAllBlogsHook();
  return (
    <main>
      {!blogs ? (
        <div>
          <span>
            <LoaderIcon className="animate-spin size-10" />
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 max-w-7xl mx-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} {...blog} />
          ))}
        </div>
      )}
    </main>
  );
};

export default BlogList;
