// components/manage-modal.tsx
'use client';

import { deleteBookmark, updateBookmark } from '@/actions/bookmarkAction';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit2, Save, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: any[];
  onUpdate: () => void;
}

export function ManageModal({ isOpen, onClose, bookmarks, onUpdate }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ title: '', url: '' });

  const handleEdit = (bookmark: any) => {
    setEditingId(bookmark.id);
    setEditData({ title: bookmark.title, url: bookmark.url });
  };

  const handleSave = async () => {
    if (!editingId) return;
    await updateBookmark(editingId, editData);
    setEditingId(null);
    onUpdate();
  };

  const handleDelete = async (id: string) => {
    await deleteBookmark(id);
    onUpdate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Manage Bookmarks</DialogTitle>
        </DialogHeader>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>URL</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookmarks.map((bookmark) => (
              <TableRow key={bookmark.id}>
                <TableCell>
                  {editingId === bookmark.id ? (
                    <Input
                      value={editData.title}
                      onChange={(e) =>
                        setEditData({ ...editData, title: e.target.value })
                      }
                    />
                  ) : (
                    bookmark.title
                  )}
                </TableCell>
                <TableCell>
                  {editingId === bookmark.id ? (
                    <Input
                      value={editData.url}
                      onChange={(e) =>
                        setEditData({ ...editData, url: e.target.value })
                      }
                    />
                  ) : (
                    bookmark.url
                  )}
                </TableCell>
                <TableCell>
                  {editingId === bookmark.id ? (
                    <Button size="sm" onClick={handleSave}>
                      <Save className="h-4 w-4" />
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(bookmark)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(bookmark.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
