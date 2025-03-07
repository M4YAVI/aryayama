// CodeBlock.jsx
import React, { useState } from 'react';

export const Code = ({ children, language }: { children: string; language?: string }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block-container">
      <div className="code-block-header">
        {language && <span className="code-language">{language}</span>}
        <button 
          className="copy-button" 
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="code-block">
        <code className={language ? `language-${language}` : ''}>
          {children}
        </code>
      </pre>
      <style jsx>{`
        .code-block-container {
          position: relative;
          margin: 1.5rem 0;
          border-radius: 8px;
          overflow: hidden;
          background-color: #121212;
        }
        
        .code-block-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          background-color: #1e1e1e;
          border-bottom: 1px solid #333;
        }
        
        .code-language {
          font-size: 0.875rem;
          color: #9e9e9e;
          font-family: monospace;
        }
        
        .copy-button {
          background-color: #333;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 0.25rem 0.75rem;
          font-size: 0.875rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .copy-button:hover {
          background-color: #444;
        }
        
        .code-block {
          margin: 0;
          padding: 1rem;
          overflow-x: auto;
          font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
          font-size: 0.9rem;
          line-height: 1.5;
        }
        
        code {
          color: #e0e0e0;
        }
      `}</style>
    </div>
  );
};

