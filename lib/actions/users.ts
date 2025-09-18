"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getUserProStatus(): Promise<boolean> {
  const { userId } = await auth();
  if (!userId) return false;

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  return user.privateMetadata?.pro === true;
}
