

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
/* eslint-disable no-undef */
export const createClient = async () => {
  const cookieStore = await cookies(); // ✅ only called ONCE, without await because it's synchronous

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value; // ✅ safe to access now
        },
        set() {
          // Optional: implement if needed
        },
        remove() {
          // Optional: implement if needed
        },
      },
    }
  );
};
