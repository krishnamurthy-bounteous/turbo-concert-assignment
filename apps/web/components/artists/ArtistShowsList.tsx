"use client";

import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/client";
import type { ApiResponse } from "@/lib/client";
import { ConcertList } from "@/components/artists/ConcertList";

/**
Assignment (Problem): This component was originally a Server Component.
- It has been intentionally converted to a Client Component.
Your task: convert it back to a Server Component.
Steps:
1) Remove 'use client' and React Query; make this an async server component.
2) Fetch GET /api/artists/{id} on the server and return <ConcertList />.
3) Handle loading via the parent <Suspense> fallback, not local state.
4) Avoid hydration issues by keeping data fetching on the server.
*/
export function ArtistShowsList({ id }: { id: number }) {
  type Artist = ApiResponse<"/api/artists/{id}">;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["artist", id],
    queryFn: async () => {
      const { data, error } = await client.GET("/api/artists/{id}", {
        params: { path: { id }, query: { throttle: Number(process.env.NEXT_PUBLIC_THROTTLE ?? 0) } },
      });
      if (error) throw error;
      return data as Artist;
    },
  });

  if (isLoading) return <div className="p-4 text-sm">Loading shows…</div>;
  if (isError || !data) return <div className="p-4 text-sm">Failed to load shows</div>;

  return <ConcertList artist={data} />;
} 