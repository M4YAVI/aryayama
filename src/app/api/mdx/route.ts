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

    // Normalize the path to handle both Windows and Unix-style paths
    const normalizedPath = mdxPath.replace(/\\/g, '/');
    const fullPath = path.join(process.cwd(), normalizedPath);

    // Ensure the requested file is within the MDX directory
    const mdxDir = path.join(process.cwd(), 'src', 'mdx');
    if (!fullPath.startsWith(mdxDir)) {
      return NextResponse.json({ error: "Invalid MDX path" }, { status: 403 });
    }

    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: "MDX file not found" }, { status: 404 });
    }

    const content = fs.readFileSync(fullPath, "utf-8");
    const mdxSource = await serialize(content, {
      parseFrontmatter: true,
      mdxOptions: {
        development: process.env.NODE_ENV === 'development'
      }
    });

    return NextResponse.json({ mdxSource });
  } catch (error) {
    console.error("Error processing MDX:", error);
    return NextResponse.json(
      { error: "Failed to process MDX content" },
      { status: 500 }
    );
  }
}