import Image from "next/image"
import Link from "next/link"
import type { GalleryImage } from "@/lib/supabase"

interface ImageGridProps {
  images: GalleryImage[]
  year: number
  month: number
}

export function ImageGrid({ images, year, month }: ImageGridProps) {
  if (images.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400">No images found for this period</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {images.map((image) => (
        <Link
          key={image.id}
          href={`/gallery/${image.id}`}
          className="aspect-square bg-gray-900 rounded-sm overflow-hidden hover:opacity-90 transition-opacity"
        >
          <Image
            src={image.url || "/placeholder.svg"}
            alt={image.title}
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
        </Link>
      ))}
    </div>
  )
}

