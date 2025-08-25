/*
Assignment (Problem): This page must be a Client Component.
- The 'use client' directive was intentionally removed.
Your task:
1) Add 'use client' at the top to enable hooks (`useParams`, `useQuery`).
2) After successful registration, invalidate the `['concert', id]` query so availability refreshes.
3) Ensure no hydration issues from inputs or environment access.
*/

/* Client Side Rendering */

import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/client";
import { ConcertHeader } from "@/components/concerts/ConcertHeader";
import { ZoneSelector } from "@/components/zones/ZoneSelector";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { useParams } from "next/navigation";

export default function CheckoutPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["concert", id],
    queryFn: async () => {
      const { data, error } = await client.GET("/api/concerts/{id}", {
        params: {
          path: { id: Number(id) },
          query: {
            throttle: 3000,
          },
        },
      });
      if (error) throw error;
      return data!;
    },
  });

  if (isError) return <p className="p-6">Error loading concert</p>;

  return (
    <main className="container mx-auto px-4 py-6 space-y-4">
      <div className="space-y-4">
        {!data && isLoading ? (
          <Skeleton className="w-full h-80" />
        ) : data ? (
          <>
            <ConcertHeader concert={data} />
            <ZoneSelector concert={data} />
          </>
        ) : (
          <p className="p-6">Not found concert</p>
        )}
      </div>
    </main>
  );
}
