import { notFound } from "next/navigation"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { format } from "date-fns"
import { ImageGrid, GalleryImage } from "@/components/gallery/Image-grid"
import { Metadata } from "next"

interface PageProps {
  params: Promise<{ id: string }>; // params is a Promise in Next.js 15 server components
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Await params to resolve the Promise and destructure id
  const { id } = await params;

  const { data: image } = await supabase
    .from("images")
    .select("title")
    .eq("id", id)  // Use the awaited id value instead of params.id
    .single()

  return {
    title: image?.title || "Gallery Image",
    description: `View ${image?.title || "this image"} in our gallery`,
  }
}

export default async function ImagePage({ params }: PageProps) {
  const { id } = await params;
  const { data: singleImage, error: singleErr } = await supabase
    .from("images")
    .select("*")
    .eq("id", id)
    .single()

  if (singleErr || !singleImage) {
    notFound()
  }

  // 2) Fetch all images from the SAME year
  const { data: yearImages, error: allErr } = await supabase
    .from("images")
    .select("*")
    .eq("year", singleImage.year)
    .order('month', { ascending: false }) // Get months in descending order
    .order('created_at', { ascending: false }) // Sort by creation date within months

  if (allErr || !yearImages) {
    notFound()
  }

  // 3) Group images by month (in descending order)
  const grouped: Record<number, GalleryImage[]> = {}
  
  // First, group all images by month
  for (const img of yearImages) {
    const m = img.month
    if (!grouped[m]) {
      grouped[m] = []
    }
    grouped[m].push(img as GalleryImage)
  }

  // Get months in descending order (newest first)
  const months = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a) // Ensure descending order (March=3 comes before February=2)

  // Format the single image's date
  const imageDate = new Date(singleImage.year, singleImage.month - 1)

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* --- SINGLE IMAGE DETAIL --- */}
      <h1 className="text-2xl font-semibold mb-2">{singleImage.title}</h1>
      <p className="text-gray-500 mb-6">{format(imageDate, "MMMM yyyy")}</p>

      <div className="bg-gray-900 rounded-md overflow-hidden mb-12 relative aspect-[4/3]">
        <Image
          src={singleImage.url}
          alt={singleImage.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-contain"
        />
      </div>

      {/* --- ALL IMAGES FOR THE YEAR, grouped by month DESC --- */}
      <h2 className="text-xl font-bold mb-6">More from {singleImage.year}</h2>
      
      {months.map((month) => {
        const imagesForMonth = grouped[month] || []
        
        // Skip months with no images (shouldn't happen with our query, but just in case)
        if (imagesForMonth.length === 0) return null

        // Get month name (January, February, etc.)
        const monthName = format(new Date(singleImage.year, month - 1), "MMMM")

        return (
          <section key={month} className="mb-10">
            <h3 className="text-lg font-medium mb-4">
              {monthName} {singleImage.year}
            </h3>
            <ImageGrid images={imagesForMonth} />
          </section>
        )
      })}
    </div>
  )
}