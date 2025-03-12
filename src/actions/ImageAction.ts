"use server"

import { revalidatePath } from "next/cache"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function uploadImageAction(formData: FormData) {
  try {
    const title = formData.get("title") as string
    const file = formData.get("file") as File
    const yearMonth = formData.get("yearMonth") as string

    // Parse year and month from the yearMonth string (format: YYYY-MM)
    const [year, month] = yearMonth.split("-").map(Number)

    if (!title || !file || !year || !month) {
      return { success: false, error: "Missing required fields" }
    }

    // Upload file to Supabase Storage
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`
    const { data: fileData, error: fileError } = await supabaseAdmin.storage.from("gallery").upload(fileName, file)

    if (fileError) {
      console.error("Error uploading file:", fileError)
      return { success: false, error: "Failed to upload image" }
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage.from("gallery").getPublicUrl(fileName)
    const url = urlData.publicUrl

    // Insert record into database
    const { data, error } = await supabaseAdmin
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
      return { success: false, error: "Failed to save image data" }
    }

    // Revalidate the gallery page to show the new image
    revalidatePath("/")
    revalidatePath("/gallery")

    return { success: true }
  } catch (error) {
    console.error("Error in uploadImageAction:", error)
    return { success: false, error: "Failed to upload image" }
  }
}

