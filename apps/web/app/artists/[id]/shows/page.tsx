/*
Assignment (Problem): This page was originally PPR-like with Suspense using Server Components.
- It has been intentionally broken. Your task is to convert it back to Server Components.
What to do:
1) Keep this file as a Server Component (no 'use client'). Fetch the artist (GET /api/artists/{id}) on the server and render static bits.
2) Convert `ArtistShowsList` back to a Server Component that fetches on the server and returns <ConcertList />.
3) Use <Suspense> in this page (or its child) for streaming, not client-side loading state.
4) Avoid hydration issues by not using client-only APIs in server files.
*/

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ArtistShowsPage({ params }: PageProps) {
  const { id } = await params;
  // TODO: Implement server-side fetch for artist details and render:
  // - <ArtistBio /> and <SocialLinks /> with server data
  // - <ArtistShowsList id={Number(id)} /> as a Server Component that fetches and renders shows
  // Hint: Wrap the shows list in <Suspense fallback={<ArtistConcertsSkeleton />} /> to stream in.
  void id;
  return null;
}
