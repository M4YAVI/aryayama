// app/image/[id]/page.tsx
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ImageModal from "@/components/gallery/ImageModal"; // Client component
import type { GalleryImage } from "@/lib/supabase";

export default async function ImagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await params since it’s a Promise in Next.js 15 server components
  const { id } = await params;

  // Fetch image data from Supabase
  const { data: image, error } = await supabase
    .from("images")
    .select("*")
    .eq("id", id)
    .single();

  // Handle errors or missing data
  if (error || !image) {
    console.error("Error fetching image:", error);
    notFound();
  }

  return <ImageModal image={image as GalleryImage} />;
}