import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const Code: React.FC<{ children: string; className?: string }> = ({ children, className }) => {
  // Extract the language from className (format: "language-javascript")
  const language = className?.replace('language-', '') || 'text';

  return (
    <div className="my-4">
      <SyntaxHighlighter
        language={language}
        style={dracula}
        customStyle={{
          borderRadius: '0.5rem',
          padding: '1rem',
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};