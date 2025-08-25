"use client";

/*
Assignment (Problem): This page was originally SSG.
- Intentionally converted to CSR so you can revert it back to SSG.
What to do:
1) Remove 'use client' and `useQuery` to fetch on the server.
2) Restore `revalidate = false` and remove `generateStaticParams` CSR changes.
3) Fetch GET /api/artists/{id} and ignore concerts in the render.
*/

import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/client";
import { ArtistBio } from "@/components/artists/ArtistBio";
import { SocialLinks } from "@/components/artists/SocialLinks";
import { useParams } from "next/navigation";

export default function ArtistPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["artist", id],
    queryFn: async () => {
      const { data, error } = await client.GET("/api/artists/{id}", {
        params: { path: { id: Number(id) }, query: { throttle: Number(process.env.NEXT_PUBLIC_THROTTLE ?? 0) } },
      });
      if (error) throw error;
      return data!;
    },
  });

  if (isError) return <div className="p-6">Failed to load</div>;

  // Do not render concerts client-side.
  const artistWithNoConcerts = data ? { ...data, concerts: [] } : undefined;

  return (
    <main className="container mx-auto px-4 py-6 space-y-4">
      {!artistWithNoConcerts && isLoading ? (
        <p>Loading...</p>
      ) : artistWithNoConcerts ? (
        <>
          <ArtistBio artist={artistWithNoConcerts} />
          <SocialLinks artist={artistWithNoConcerts} />
        </>
      ) : (
        <div className="p-6">Not found</div>
      )}
    </main>
  );
}
