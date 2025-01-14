'use client';
import {
  ChevronDown,
  ChevronRight,
  File,
  Folder,
  FolderOpen,
} from 'lucide-react';
import React, { useState } from 'react';

interface LinkItem {
  name: string;
  url: string;
}

interface FolderSectionProps {
  name: string;
  items: LinkItem[];
  isExpanded: boolean;
  onToggle: () => void;
}

const DirectoryTree: React.FC = () => {
  const [expandedFolder, setExpandedFolder] = useState<string | null>(null);

  const links: LinkItem[] = [
    { name: 'Portfolio', url: 'https://aryayama-nyx.vercel.app' },
    { name: 'myanimelist', url: 'https://myanimelist.net/profile/AryayamaNyx' },
  ];

  const projects: LinkItem[] = [
    { name: 'Rag Chat', url: 'https://rag-chat-phi.vercel.app/' },
    { name: 'PromptPal', url: 'https://promptpal-cyan.vercel.app/' },
    { name: 'MarkView', url: 'https://markview-eight.vercel.app/' },
  ];

  const productivity: LinkItem[] = [
    { name: 'BookMark', url: 'https://aryayama.vercel.app/bookmark' },
    { name: 'Typing Game', url: 'https://aryayama.vercel.app/typing' },
  ];

  const toggleFolder = (folder: string): void => {
    setExpandedFolder(expandedFolder === folder ? null : folder);
  };

  return (
    <div className="text-white p-6 rounded-lg shadow-xl font-mono text-lg max-w-2xl mx-auto">
      <div className="flex items-center space-x-2 mb-4 p-3 rounded-md">
        <Folder className="text-white" size={20} />
        <span className="flex items-center">
          <span className="text-gray-400">C:</span>
          <span className="text-purple-500">/</span>
          <span className="text-gray-300">Users</span>
          <span className="text-purple-500">/</span>
          <span className="text-blue-300">arya</span>
          <span className="text-purple-500">/</span>
        </span>
      </div>

      <div className="space-y-2">
        <FolderSection
          name="Links"
          items={links}
          isExpanded={expandedFolder === 'Links'}
          onToggle={() => toggleFolder('Links')}
        />

        <FolderSection
          name="Productivity"
          items={productivity}
          isExpanded={expandedFolder === 'Productivity'}
          onToggle={() => toggleFolder('Productivity')}
        />

        <FolderSection
          name="Projects"
          items={projects}
          isExpanded={expandedFolder === 'Projects'}
          onToggle={() => toggleFolder('Projects')}
        />
      </div>
    </div>
  );
};

const FolderSection: React.FC<FolderSectionProps> = ({
  name,
  items,
  isExpanded,
  onToggle,
}) => {
  return (
    <div className="pl-2">
      <div
        className="flex items-center space-x-2 cursor-pointer p-1 rounded transition-colors duration-200 hover:bg-gray-800"
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onToggle();
            e.preventDefault();
          }
        }}
      >
        <span className="w-4">
          {isExpanded ? (
            <ChevronDown className="text-gray-400" size={16} />
          ) : (
            <ChevronRight className="text-gray-400" size={16} />
          )}
        </span>
        {isExpanded ? (
          <FolderOpen className="text-white" size={18} />
        ) : (
          <Folder className="text-white" size={18} />
        )}
        <span className="text-gray-200">{name}</span>
      </div>

      {isExpanded && (
        <div className="ml-6 space-y-1 mt-1">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:bg-gray-800 p-1 rounded transition-colors duration-200 group"
            >
              <File
                className="text-white group-hover:text-gray-300"
                size={16}
              />
              <span className="text-blue-300 group-hover:text-blue-200 text-base">
                {item.name}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default DirectoryTree;
