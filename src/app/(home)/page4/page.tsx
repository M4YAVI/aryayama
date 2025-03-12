import { Suspense } from "react"
import { getImages } from "@/lib/db"

import { format } from "date-fns"
import { ImageGrid } from "@/components/gallery/Image-grid";
import { YearNavigation } from "@/components/gallery/year-navigation";
import Wrapper from "@/components/home/Wrapper";

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: { year?: string; month?: string }
}) {
  const currentYear = searchParams.year ? Number.parseInt(searchParams.year) : new Date().getFullYear()
  const currentMonth = searchParams.month ? Number.parseInt(searchParams.month) : new Date().getMonth() + 1

  const images = await getImages({ year: currentYear, month: currentMonth })

  const dateDisplay = new Date(currentYear, currentMonth - 1)

  return (
    <Wrapper>
    <div className="space-y-8">
      <YearNavigation currentYear={currentYear} />

      <h1 className="text-2xl font-light text-center border-b border-gray-800 pb-4 mb-8">
        {format(dateDisplay, "yyyy.M")}
      </h1>

      <Suspense fallback={<div className="text-center py-20">Loading images...</div>}>
        <ImageGrid images={images} year={currentYear} month={currentMonth} />
      </Suspense>
    </div>
    </Wrapper>
  )
}

