// components/BookmarkSkeleton.tsx
export function BookmarkSkeleton() {
  return (
    <div className="p-4 border rounded-lg animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-4 h-4 bg-gray-200 rounded" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
        <div className="w-20 h-3 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
