'use client';

import { useEffect, useState } from 'react';
import { MDXRemote } from 'next-mdx-remote';


interface MDXContentProps {
  mdxPath: string;
}

export default function MDXContent({ mdxPath }: MDXContentProps) {
  const [mdxSource, setMdxSource] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMDX() {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch the MDX content from an API endpoint
        const response = await fetch(`/api/mdx?path=${encodeURIComponent(mdxPath)}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Failed to load MDX: ${response.statusText}`);
        }
        
        const data = await response.json();
        if (!data.mdxSource) {
          throw new Error('Invalid MDX content received');
        }
        setMdxSource(data.mdxSource);
      } catch (err) {
        console.error('Error loading MDX content:', err, '\nPath:', mdxPath);
        setError('Error loading content. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    if (mdxPath) {
      loadMDX();
    }
  }, [mdxPath]);

  if (isLoading) {
    return <div className="animate-pulse">Loading content...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!mdxSource) {
    return <div>No content available</div>;
  }

  return (
    <article className="prose prose-invert max-w-none">
      <MDXRemote {...mdxSource} />
    </article>
  );
}