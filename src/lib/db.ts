import { supabase, type GalleryImage } from "./supabase"

export async function getImages({ year, month }: { year?: number; month?: number } = {}) {
  let query = supabase.from("images").select("*").order("created_at", { ascending: false })

  if (year) {
    query = query.eq("year", year)
  }

  if (month) {
    query = query.eq("month", month)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching images:", error)
    return []
  }

  return data as GalleryImage[]
}

export async function uploadImage({
  title,
  file,
  year,
  month,
}: {
  title: string
  file: File
  year: number
  month: number
}) {
  // Upload file to Supabase Storage
  const fileName = `${Date.now()}-${file.name}`
  const { data: fileData, error: fileError } = await supabase.storage.from("gallery").upload(fileName, file)

  if (fileError) {
    console.error("Error uploading file:", fileError)
    throw new Error("Failed to upload image")
  }

  // Get public URL
  const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(fileName)
  const url = urlData.publicUrl

  // Insert record into database
  const { data, error } = await supabase
    .from("images")
    .insert([
      {
        title,
        url,
        year,
        month,
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single()

  if (error) {
    console.error("Error inserting image record:", error)
    throw new Error("Failed to save image data")
  }

  return data as GalleryImage
}

