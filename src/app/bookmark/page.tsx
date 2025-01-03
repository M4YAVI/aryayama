// app/page.tsx
'use client';

import { addBookmark, getBookmarks } from '@/actions/bookmarkAction';
import { ManageModal } from '@/components/bookmark/ModalTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ExternalLink, Plus, Settings2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BookmarkPage() {
  const [url, setUrl] = useState('');
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [isManaging, setIsManaging] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    const data = await getBookmarks();
    setBookmarks(data);
  };

  const handleAdd = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const result = await addBookmark(url);
      if (result.success) {
        setUrl('');
        loadBookmarks();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="container max-w-2xl py-10 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Bookmarks</h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsManaging(true)}
          >
            <Settings2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to bookmark"
            className="flex-1"
          />
          <Button onClick={handleAdd} disabled={loading}>
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>

        <div className="space-y-4">
          {bookmarks.map((bookmark) => (
            <Card key={bookmark.id}>
              <CardContent className="p-4 flex items-start gap-4">
                <ExternalLink className="h-4 w-4 mt-1 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium">{bookmark.title}</h3>
                  <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:underline truncate block"
                  >
                    {bookmark.url}
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <ManageModal
          isOpen={isManaging}
          onClose={() => setIsManaging(false)}
          bookmarks={bookmarks}
          onUpdate={loadBookmarks}
        />
      </div>
    </div>
  );
}
