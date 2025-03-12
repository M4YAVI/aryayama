import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ImageModal from "@/components/gallery/ImageModal";
import type { GalleryImage } from "@/lib/supabase";

export default async function ImagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: image, error } = await supabase
    .from("images")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !image) {
    console.error("Error fetching image:", error);
    notFound();
  }

  return <ImageModal image={image as GalleryImage} />;
}