"use client"

import Image from "next/image"
import Link from "next/link"

// Define the shape of your image data
export interface GalleryImage {
  id: string
  title: string
  url: string
  created_at: string
  year: number
  month: number
}

interface ImageGridProps {
  images: GalleryImage[]
  year?: number
  month?: number
}

export function ImageGrid({ images }: ImageGridProps) {
  // Sort newest first - this is a secondary sort within each month group
  const sortedImages = [...images].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  if (sortedImages.length === 0) {
    return null // Don't show anything if there are no images
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {sortedImages.map((image) => (
        <Link
          key={image.id}
          href={`/gallery/${image.id}`}
          className="relative w-full aspect-square bg-gray-900 rounded-sm overflow-hidden hover:opacity-90 transition-opacity"
        >
          <Image
            src={image.url}
            alt={image.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
            className="object-cover"
            priority={false}
          />
        </Link>
      ))}
    </div>
  )
}