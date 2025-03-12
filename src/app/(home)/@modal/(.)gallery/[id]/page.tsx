"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { supabase, type GalleryImage } from "@/lib/supabase"
import { format } from "date-fns"
import { X } from "lucide-react"

export default function ImageModal({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [image, setImage] = useState<GalleryImage | null>(null)
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const fetchImage = async () => {
      const { data, error } = await supabase.from("images").select("*").eq("id", params.id).single()

      if (!error && data) {
        setImage(data as GalleryImage)
      }
    }

    fetchImage()
  }, [params.id])

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
    if (!open) {
      router.back()
    }
  }

  if (!image) {
    return null
  }

  const date = new Date(image.year, image.month - 1)

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-3xl bg-black border-gray-800">
        <button
          onClick={() => router.back()}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <div className="pt-6">
          <h2 className="text-xl font-light mb-2">{image.title}</h2>
          <p className="text-gray-400 mb-4">{format(date, "MMMM yyyy")}</p>

          <div className="bg-gray-900 rounded-sm overflow-hidden">
            <Image
              src={image.url || "/placeholder.svg"}
              alt={image.title}
              width={1200}
              height={800}
              className="w-full h-auto"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

