"use client";

import React from "react";
import { useCurrentUser } from "./auth/hooks/get-current-user";
import SingOutButton from "./auth/components/auth-sign-out";
import BlogFormCreate from "./blogs/components/blog-form-create";

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
    </div>
  );
};

export default Page;
