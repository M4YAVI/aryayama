import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mdxPath = searchParams.get("path");

    if (!mdxPath) {
      return NextResponse.json({ error: "MDX path is required" }, { status: 400 });
    }

    const fullPath = path.join(process.cwd(), mdxPath);

    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: "MDX file not found" }, { status: 404 });
    }

    const content = fs.readFileSync(fullPath, "utf-8");
    const mdxSource = await serialize(content);

    return NextResponse.json({ mdxSource });
  } catch (error) {
    console.error("Error processing MDX:", error);
    return NextResponse.json(
      { error: "Failed to process MDX content" },
      { status: 500 }
    );
  }
}