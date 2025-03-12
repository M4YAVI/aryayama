"use server"

import { revalidatePath } from "next/cache"
import { supabaseAdmin } from "@/lib/supabase-admin"
import { v4 as uuidv4 } from "uuid"

type UploadResult = {
  success: boolean;
  error?: string;
}

export async function uploadImageAction(formData: FormData): Promise<UploadResult> {
  try {
    const title = formData.get("title") as string
    const file = formData.get("file") as File
    const yearMonth = formData.get("yearMonth") as string

    // Parse "YYYY-MM"
    const [year, month] = yearMonth.split("-").map(Number)

    // Basic validation
    if (!title || !title.trim()) {
      return { success: false, error: "Title is required" }
    }
    
    if (!file || file.size === 0) {
      return { success: false, error: "Image file is required" }
    }
    
    if (!year || !month || isNaN(year) || isNaN(month) || month < 1 || month > 12) {
      return { success: false, error: "Valid year and month are required" }
    }

    // Create a unique filename to avoid collisions (remove spaces and special chars)
    const fileExtension = file.name.split('.').pop()
    const safeFileName = `${Date.now()}-${uuidv4()}.${fileExtension}`

    // 1. Upload file to the "gallery" bucket
    const { error: uploadError, data: uploadData } = await supabaseAdmin.storage
      .from("gallery")
      .upload(safeFileName, file, {
        contentType: file.type, // Set content type for proper serving
        cacheControl: "3600" // 1 hour cache
      })

    if (uploadError) {
      console.error("Error uploading file:", uploadError)
      return { success: false, error: "Failed to upload image" }
    }

    // 2. Get the public URL
    const { data: urlData } = supabaseAdmin.storage
      .from("gallery")
      .getPublicUrl(safeFileName)
      
    if (!urlData?.publicUrl) {
      return { success: false, error: "Failed to get image URL" }
    }
    
    const url = urlData.publicUrl

    // 3. Insert record
    const { error: insertError } = await supabaseAdmin
      .from("images")
      .insert({
        title,
        url,
        year,
        month,
        created_at: new Date().toISOString(),
      })

    if (insertError) {
      // Clean up the uploaded file if database insert fails
      await supabaseAdmin.storage.from("gallery").remove([safeFileName])
      console.error("Error inserting image record:", insertError)
      return { success: false, error: "Failed to save image data" }
    }

    // 4. Revalidate paths to refresh the data
    revalidatePath("/")
    revalidatePath("/gallery", "layout") // Revalidate the gallery layout

    return { success: true }
  } catch (err) {
    console.error("Error in uploadImageAction:", err)
    return { success: false, error: "Failed to upload image" }
  }
}