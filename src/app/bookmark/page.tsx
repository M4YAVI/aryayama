'use client';

import { addBookmark, getBookmarks } from '@/actions/bookmarkAction';
import { BookmarkSkeleton } from '@/components/bookmark/BookMarkSkeleton';
import { ManageModal } from '@/components/bookmark/ModalTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';
import { Search, Settings2 } from 'lucide-react';
import Image from 'next/image';
import { KeyboardEvent, useEffect, useState } from 'react';

type Bookmark = {
  id: string;
  title: string;
  url: string;
  createdAt: string;
};

export default function BookmarkPage() {
  const [input, setInput] = useState('');
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isManaging, setIsManaging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isUrl, setIsUrl] = useState(false);

  const debouncedSearch = useDebounce(input, 300);

  useEffect(() => {
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;
    setIsUrl(urlPattern.test(input));
  }, [input]);

  useEffect(() => {
    const searchBookmarks = async () => {
      if (!isUrl) {
        setSearching(true);
        setSearchPerformed(true);
        try {
          const results = await getBookmarks(debouncedSearch);
          //@ts-ignore
          setBookmarks(results);
        } finally {
          setSearching(false);
        }
      }
    };
    searchBookmarks();
  }, [debouncedSearch, isUrl]);

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && isUrl) {
      setLoading(true);
      try {
        const url = input.startsWith('http') ? input : `https://${input}`;
        const result = await addBookmark(url);
        if (result.success) {
          setInput('');
          const updated = await getBookmarks();
          //@ts-ignore
          setBookmarks(updated);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const handleSlashKey = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
    };
    document.addEventListener('keydown', handleSlashKey as any);
    return () => document.removeEventListener('keydown', handleSlashKey as any);
  }, []);

  const initialLoad = async () => {
    setSearching(true);
    try {
      const results = await getBookmarks();
      //@ts-ignore
      setBookmarks(results);
    } finally {
      setSearching(false);
    }
  };

  useEffect(() => {
    initialLoad();
  }, []);

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="container max-w-2xl py-10 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Bookmarks</h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsManaging(true)}
            disabled={loading}
          >
            <Settings2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative">
          <Input
            id="search-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search or paste URL (Press '/' to focus)"
            className="pr-24"
            disabled={loading}
          />
          {isUrl ? (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              Ctrl+Enter to add
            </span>
          ) : (
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          )}
        </div>

        <div className="space-y-4">
          {searching ? (
            <>
              <BookmarkSkeleton />
              <BookmarkSkeleton />
              <BookmarkSkeleton />
            </>
          ) : bookmarks.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              {searchPerformed
                ? 'No bookmarks matched your search'
                : 'No bookmarks found'}
            </div>
          ) : (
            bookmarks.map((bookmark) => (
              <Card key={bookmark.id}>
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="relative w-4 h-4">
                    <Image
                      src={`https://www.google.com/s2/favicons?domain=${
                        new URL(bookmark.url).hostname
                      }&sz=32`}
                      alt={`${bookmark.title} favicon`}
                      className="object-contain"
                      width={16}
                      height={16}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/fallback-icon.png';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium">{bookmark.title}</h3>
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:underline truncate block"
                    >
                      {new URL(bookmark.url).hostname}
                    </a>
                  </div>
                  <time className="text-xs text-muted-foreground">
                    {new Date(bookmark.createdAt).toLocaleDateString()}
                  </time>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        <ManageModal
          isOpen={isManaging}
          onClose={() => setIsManaging(false)}
          bookmarks={bookmarks}
          onUpdate={initialLoad}
        />
      </div>
    </div>
  );
}
