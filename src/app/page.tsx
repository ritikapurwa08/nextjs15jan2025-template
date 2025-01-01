"use client";

import React from "react";
import { useCurrentUser } from "./auth/hooks/get-current-user";
import SingOutButton from "./auth/components/auth-sign-out";
import BlogFormCreate from "./blogs/components/blog-form-create";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  const { user } = useCurrentUser();

  return (
    <div>
      {user === null ? (
        <p>User is not authenticated</p>
      ) : (
        <div>
          {user ? (
            <div>
              <p>User Nmae: {user.name}</p>
            </div>
          ) : (
            <div>loadinngg</div>
          )}
        </div>
      )}
      <div>
        <SingOutButton />
      </div>
      <div className="max-w-screen-md mx-auto">
        <BlogFormCreate />
      </div>
      <Button type="button" asChild variant="outline">
        <Link href="/blogs">See Blogs</Link>
      </Button>
    </div>
  );
};

export default Page;
