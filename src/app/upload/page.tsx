"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"
import { uploadImageAction } from "@/actions/ImageAction"
import { YearMonthPicker } from "@/components/gallery/year-month-picker"

export default function UploadPage() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.set("yearMonth", format(selectedDate, "yyyy-MM"));

    try {
      const result = await uploadImageAction(formData);

      if (result.success) {
        router.push("/");
        router.refresh();
      } else {
        setError(result.error || "Upload failed");
      }
    } catch (error) {
      console.error("Error uploading:", error);
      setError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Upload New Image</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="Enter image title"
            required
            className="bg-gray-900 border-gray-800"
          />
        </div>

        <div className="space-y-2">
          <Label>Date</Label>
          <YearMonthPicker value={selectedDate} onChange={setSelectedDate} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="file">Image</Label>
          <Input
            id="file"
            name="file"
            type="file"
            accept="image/*"
            required
            onChange={handleFileChange}
            className="bg-gray-900 border-gray-800"
          />

          {previewUrl && (
            <div className="mt-4 aspect-square bg-gray-900 rounded-sm overflow-hidden">
              <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload Image"}
        </Button>
      </form>
    </div>
  );
}