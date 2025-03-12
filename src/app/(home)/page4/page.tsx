import { Suspense } from "react";
import { getImages } from "@/lib/db";
import { format } from "date-fns";
import { ImageGrid } from "@/components/gallery/Image-grid";
import { YearNavigation } from "@/components/gallery/year-navigation";
import Wrapper from "@/components/home/Wrapper";

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: { year?: string }
}) {
  const params = await searchParams;
  // Get the current year from params or default to current year
  const currentYear = Number(params?.year) || new Date().getFullYear();
  // Fetch ALL images for the selected year (not just the current month)
  const allYearImages = await getImages({ year: currentYear });

  // Group images by month
  const imagesByMonth: Record<number, any[]> = {};
  
  allYearImages.forEach(image => {
    if (!imagesByMonth[image.month]) {
      imagesByMonth[image.month] = [];
    }
    imagesByMonth[image.month].push(image);
  });

  // Get months in descending order (e.g., 12, 11, 10...)
  const months = Object.keys(imagesByMonth)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <Wrapper>
      <div className="space-y-8">
        <YearNavigation currentYear={currentYear} />
        <h1 className="text-2xl font-light text-center border-b border-gray-800 pb-4 mb-8">
          {currentYear}
        </h1>

        <Suspense fallback={<div className="text-center py-20">Loading images...</div>}>
          <div className="mx-auto max-w-6xl space-y-16">
            {months.length > 0 ? (
              months.map(month => {
                const imagesForMonth = imagesByMonth[month];
                const monthDate = new Date(currentYear, month - 1);
                
                return (
                  <section key={month} className="space-y-4">
                    <h2 className="text-xl font-medium border-b border-gray-800 pb-2">
                      {format(monthDate, "yyyy.M")} — {format(monthDate, "MMMM")}
                    </h2>
                    <ImageGrid 
                      images={imagesForMonth} 
                      year={currentYear} 
                      month={month} 
                    />
                  </section>
                );
              })
            ) : (
              <p className="text-center text-gray-500 py-12">No images found for {currentYear}</p>
            )}
          </div>
        </Suspense>
      </div>
    </Wrapper>
  );
}