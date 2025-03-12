import { notFound } from "next/navigation"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { format } from "date-fns"

export default async function ImagePage({ params }: { params: { id: string } }) {
  const { data: image, error } = await supabase.from("images").select("*").eq("id", params.id).single()

  if (error || !image) {
    notFound()
  }

  const date = new Date(image.year, image.month - 1)

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-light mb-4">{image.title}</h1>
      <p className="text-gray-400 mb-6">{format(date, "MMMM yyyy")}</p>

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
  )
}

