import { compileMDX } from 'next-mdx-remote/rsc';
import fs from 'fs';
import path from 'path';

interface MDXContent {
  content: React.ReactNode;
  frontmatter?: {
    title?: string;
    description?: string;
    [key: string]: any;
  };
}

export async function getMDXContent(filePath: string): Promise<MDXContent> {
  const fullPath = path.join(process.cwd(), filePath);
  const source = fs.readFileSync(fullPath, 'utf8');

  const { content, frontmatter } = await compileMDX({
    source,
    options: {
      parseFrontmatter: true,
    },
  });

  return {
    content,
    frontmatter,
  };
}

export async function getAllMDXFiles(directory: string): Promise<string[]> {
  const fullPath = path.join(process.cwd(), directory);
  
  // Check if directory exists
  if (!fs.existsSync(fullPath)) {
    return [];
  }
  
  const entries = fs.readdirSync(fullPath, { withFileTypes: true });
  
  const mdxFiles = entries
    .filter(entry => entry.isFile() && entry.name.endsWith('.mdx'))
    .map(entry => path.join(directory, entry.name));

  return mdxFiles;
}