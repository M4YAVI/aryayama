'use client';

import { cn } from '@/lib/utils'; // Assuming this utility is available for conditional classes
import Image from 'next/image';
import { useState } from 'react';

// Tech categories
const categories = [
  { id: 'languages', name: 'LANGUAGES' },
  { id: 'frameworks', name: 'FRONTEND' },
  { id: 'databases', name: 'DATABASES' },
  { id: 'tools', name: 'TOOLS' },
  { id: 'platforms', name: 'PLATFORMS' },
  { id: 'ai', name: 'AI & AGENTS' },
];

// Tech stack data
const techStack = {
  languages: [
    { name: 'JavaScript', icon: '/icons/js.svg' },
    { name: 'TypeScript', icon: '/icons/typescript.svg' },
    { name: 'Python', icon: '/icons/python.svg' },
    { name: 'PSQL', icon: '/icons/psql.svg' },
    { name: 'NodeJS', icon: '/icons/nodejs.svg' },
    { name: 'Rust', icon: '/icons/rust_dark.svg' },
  ],
  frameworks: [
    { name: 'React', icon: '/icons/react.svg' },
    { name: 'Next.js', icon: '/icons/next.svg' },
    { name: 'TailwindCSS', icon: '/icons/tailwind.svg' },
    { name: 'ReactQuery', icon: '/icons/reactquery.svg' },
    { name: 'Flask', icon: '/icons/flask.svg' },
    { name: 'Hono.js', icon: '/icons/hono.svg' },
    { name: 'shadcn', icon: '/icons/shadcn-ui_dark.svg' },
  ],
  databases: [
    { name: 'PostgreSQL', icon: '/icons/psql.svg' },
    { name: 'MongoDB', icon: '/icons/mongodb.svg' },
    { name: 'Neon DB', icon: '/icons/neon.svg' },
    { name: 'Supabase', icon: '/icons/supabase.svg' },
    { name: 'Drizzle ORM', icon: '/icons/drizzle.svg' },
  ],
  tools: [
    { name: 'HuggingFace', icon: '/icons/huggingface.svg' },
    { name: 'Cloudflare Workers', icon: '/icons/cloudflare-workers.svg' },
    { name: 'Docker', icon: '/icons/docker.svg' },
    { name: 'GitHub', icon: '/icons/github.svg' },
    { name: 'Postman', icon: '/icons/postman.svg' },
    { name: 'pnpm', icon: '/icons/pnpm_dark.svg' },
    { name: 'Notion', icon: '/icons/notion.svg' },
    { name: 'Obsidian', icon: '/icons/obsidian.svg' },
    { name: 'Linear', icon: '/icons/linear.svg' },
  ],
  platforms: [
    { name: 'Vercel', icon: '/icons/vercel.svg' },
    { name: 'Netlify', icon: '/icons/netlify.svg' },
    { name: 'GitHub', icon: '/icons/github.svg' },
    { name: 'Cloudflare', icon: '/icons/cloudflare.svg' },
  ],
  ai: [
    { name: 'PyTorch', icon: '/icons/pytorch.png' },
    { name: 'LangChain', icon: '/icons/langchain.svg' },
    { name: 'ChatGPT', icon: '/icons/chatgpt.svg' },
    { name: 'Claude', icon: '/icons/claude-ai.svg' },
    { name: 'Perplexity', icon: '/icons/perplexity.svg' },
    { name: 'CrewAI', icon: '/icons/crewai.svg' },
  ],
};

// Main tech stack description
const mainTechDescription = [
  { text: 'I use', className: 'text-gray-400' },
  { text: 'Next.js', icon: '/icons/next.svg', className: 'text-white' },
  { text: ' with', className: 'text-gray-400' },
  {
    text: 'Typescript,',
    icon: '/icons/typescript.svg',
    className: 'text-white',
  },
  { text: 'TailwindCSS', icon: '/icons/tailwind.svg', className: 'text-white' },
  { text: 'for the Backend I use', className: 'text-gray-400' },
  { text: 'Supabase', icon: '/icons/supabase.svg', className: 'text-white' },
  { text: 'and', className: 'text-gray-400' },
  { text: 'NeonDB', icon: '/icons/neon.svg', className: 'text-white' },
  { text: 'with', className: 'text-gray-400' },
  { text: 'Drizzle', icon: '/icons/drizzle.svg', className: 'text-white' },
  { text: 'as an ORM, for database management.', className: 'text-gray-400' },
];

// Component for a single tech item card with hover effect
const TechItemCard = ({ name, icon }: { name: string; icon: string }) => {
  return (
    <div className="relative flex items-center justify-center p-4 bg-zinc-900 rounded-lg aspect-square group overflow-hidden border border-zinc-800 hover:border-violet-500 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg">
      {/* Icon - fades and scales slightly on hover */}
      <Image
        src={icon || '/placeholder.svg'}
        alt={name}
        width={48} // Larger icon size for better visibility
        height={48}
        unoptimized
        className="transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-30"
      />

      {/* Name - initially hidden, slides up and fades in on hover */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent rounded-lg">
        <span className="font-medium text-white text-base">{name}</span>
      </div>
      {/* Optional: a subtle border / glow on hover */}
      <div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: '0 0 15px rgba(139, 92, 246, 0.5)' }}
      ></div>
    </div>
  );
};

export function Tech() {
  const [activeCategory, setActiveCategory] = useState('languages');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold text-white mb-8 text-center tracking-tight">
        My Skills & Tech Stack
      </h1>

      {/* Main tech stack description */}
      <div className="mb-12 text-lg text-center leading-relaxed">
        <p className="flex flex-wrap justify-center gap-x-2 gap-y-3 items-center">
          {mainTechDescription.map((item, index) => (
            <span
              key={index}
              className={cn('flex items-center gap-1', item.className)}
            >
              {item.icon && (
                <span className="inline-flex items-center justify-center bg-zinc-900 rounded-md p-1 h-7 w-7 text-white shadow-lg">
                  <Image
                    src={item.icon || '/placeholder.svg'}
                    alt=""
                    width={20}
                    height={20}
                    unoptimized
                  />
                </span>
              )}
              {item.text}
            </span>
          ))}
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              'px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200',
              activeCategory === category.id
                ? 'bg-violet-600 text-white shadow-lg' // Active tab styling
                : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700 hover:text-white' // Inactive tab styling
            )}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Tech Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {' '}
        {/* Responsive grid columns */}
        {techStack[activeCategory as keyof typeof techStack].map((tech) => (
          <TechItemCard key={tech.name} name={tech.name} icon={tech.icon} />
        ))}
      </div>
    </div>
  );
}
