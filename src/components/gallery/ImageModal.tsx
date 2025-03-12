// components/ImageModal.tsx
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { format } from "date-fns";
import { X } from "lucide-react";
import type { GalleryImage } from "@/lib/supabase";

interface ImageModalProps {
  image: GalleryImage;
}

export default function ImageModal({ image }: ImageModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      router.back();
    }
  };

  // Safely format the date
  let formattedDate;
  try {
    const date = new Date(image.year, image.month - 1);
    formattedDate = format(date, "MMMM yyyy");
  } catch (err) {
    console.error("Error formatting date:", err);
    formattedDate = "Unknown date";
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-3xl bg-black border-gray-800">
        <button
          onClick={() => router.back()}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <div className="pt-6">
          <h2 className="text-xl font-light mb-2">{image.title || "Untitled"}</h2>
          <p className="text-gray-400 mb-4">{formattedDate}</p>

          <div className="bg-gray-900 rounded-sm overflow-hidden">
            <Image
              src={image.url && image.url.trim() ? image.url : "/placeholder.svg"}
              alt={image.title || "Gallery image"}
              width={1200}
              height={800}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}