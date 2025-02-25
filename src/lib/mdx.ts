import { compileMDX } from 'next-mdx-remote/rsc';
import fs from 'fs';
import path from 'path';
import React from 'react';

interface MDXContent {
  source: string; // Store the source instead of compiled content
  frontmatter?: {
    title?: string;
    description?: string;
    [key: string]: any;
  };
}

export async function getMDXContent(filePath: string): Promise<MDXContent> {
  const fullPath = path.join(process.cwd(), filePath);
  const source = fs.readFileSync(fullPath, 'utf8');
  
  // Only extract frontmatter during pre-compilation
  const { frontmatter } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
  });
  
  return {
    source, // Store the raw source
    frontmatter
  };
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
  const directories = [
    'src/mdx/frontend',
    'src/mdx/backend',
    'src/mdx/deeplearning',
    'src/mdx/agents',
    'src/mdx/other'
  ];
  
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

// Function to render MDX content at runtime
export async function renderMDXContent(source: string) {
  const { content } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
  });
  
  return content;
}

// Function to get and render MDX content with error handling
export async function getMDXContentWithFallback(filePath: string) {
  try {
    let mdxContent: MDXContent;
    const normalizedPath = filePath.replace(/\\/g, '/');
    
    if (process.env.NODE_ENV === 'production') {
      // In production, try to load from pre-compiled data
      const mdxDataPath = path.join(process.cwd(), 'public', 'mdx-data.json');
      if (fs.existsSync(mdxDataPath)) {
        const mdxData = JSON.parse(fs.readFileSync(mdxDataPath, 'utf8'));
        const relativePath = normalizedPath.replace('src/mdx/', '');
        if (mdxData[relativePath]) {
          mdxContent = mdxData[relativePath];
          try {
            // Render the content from source
            const content = await renderMDXContent(mdxContent.source);
            return { content, frontmatter: mdxContent.frontmatter };
          } catch (renderError) {
            console.error('Error rendering MDX content:', renderError);
            throw renderError;
          }
        }
      }
    }
    
    // Fallback to direct MDX compilation
    const fullPath = path.join(process.cwd(), filePath);
    const source = fs.readFileSync(fullPath, 'utf8');
    const { content, frontmatter } = await compileMDX({
      source,
      options: { parseFrontmatter: true },
    });
    
    return { content, frontmatter };
  } catch (error) {
    console.error('Error loading MDX content:', error);
    return {
      content: React.createElement('div', { className: 'error-message' }, 'Error loading content. Please try again later.'),
      frontmatter: {
        title: 'Error Loading Content',
        description: 'An error occurred while trying to load the content. Please refresh the page or try again later.',
        error: true
      }
    };
  }
}

// Export the precompiled MDX data during build
if (process.env.NODE_ENV === 'production') {
  console.log('Pre-compiling MDX content...');
  (async () => {
    try {
      const mdxData = await generateStaticMDXData();
      const outputPath = path.join(process.cwd(), 'public/mdx-data.json');
      fs.writeFileSync(outputPath, JSON.stringify(mdxData, null, 2));
      console.log('MDX content pre-compilation complete');
    } catch (error) {
      console.error('Error pre-compiling MDX content:', error);
    }
  })();
}