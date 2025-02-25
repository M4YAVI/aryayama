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
    options: { parseFrontmatter: true },
  });

  return { content, frontmatter };
}

export async function getAllMDXFiles(directory: string): Promise<string[]> {
  const fullPath = path.join(process.cwd(), directory);
  
  if (!fs.existsSync(fullPath)) {
    return [];
  }
  
  const entries = fs.readdirSync(fullPath, { withFileTypes: true });
  
  const mdxFiles = entries
    .filter(entry => entry.isFile() && entry.name.endsWith('.mdx'))
    .map(entry => path.join(directory, entry.name));

  return mdxFiles;
}

// Function to generate static MDX data at build time
export async function generateStaticMDXData() {
  const directories = ['src/mdx/frontend', 'src/mdx/backend', 'src/mdx/deeplearning', 'src/mdx/agents', 'src/mdx/other'];
  const mdxData: Record<string, MDXContent> = {};

  for (const dir of directories) {
    const files = await getAllMDXFiles(dir);
    for (const file of files) {
      const relativePath = file.replace('src/mdx/', '');
      mdxData[relativePath] = await getMDXContent(file);
    }
  }

  return mdxData;
}

// Export the precompiled MDX data (run this during build)
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
  (async () => {
    const mdxData = await generateStaticMDXData();
    fs.writeFileSync('public/mdx-data.json', JSON.stringify(mdxData, null, 2));
  })();
}