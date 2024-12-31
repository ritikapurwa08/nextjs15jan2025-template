import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Doc } from "@convex-dev/auth/server";

type UserStatus = "loading" | "authenticated" | "unauthenticated" | "error";

type UseCurrentUserResult = {
  user: Doc<"users"> | null | undefined; // Assuming "users" is your table name
  status: UserStatus;
};

export const useCurrentUser = (): UseCurrentUserResult => {
  const user = useQuery(api.users.getCurrentUser);

  let status: UserStatus;
  if (user === undefined) {
    status = "loading";
  } else if (user === null) {
    // This could be either "unauthenticated" or "error"
    // We need to determine which one.
    if (user === null) {
      status = "unauthenticated";
    } else {
      status = "error"; // Error occurred during the query
    }
  } else {
    status = "authenticated";
  }

  return { user, status };
};
