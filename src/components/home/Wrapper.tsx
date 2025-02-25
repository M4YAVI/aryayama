'use client';

import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

const SECTION_DATA = [
  { label: 1, href: '/', isFirst: true, isLast: false, title: 'Home' },
  { label: 2, href: '/page2', isFirst: false, isLast: false, title: 'Page 2' },
  { label: 3, href: '/page3', isFirst: false, isLast: false, title: 'Page 3' },
  { label: 4, href: '/page4', isFirst: false, isLast: false, title: 'Page 4' },
  { label: 5, href: '/page5', isFirst: false, isLast: true, title: 'Page 5' },
];

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: 'easeInOut' },
};

// Singleton Audio Manager
let audio: HTMLAudioElement | null = null;
let isAudioInitialized = false;

const getOrCreateAudio = (url: string) => {
  if (!audio) {
    audio = new Audio(url);
    audio.loop = true;
  }
  return audio;
};

// Custom Hook for Audio
const useAudio = (url: string) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [hasInteracted, setHasInteracted] = React.useState(false);

  React.useEffect(() => {
    if (hasInteracted && typeof window !== 'undefined') {
      const savedState = JSON.parse(localStorage.getItem('audioPlaying') || 'false');
      setIsPlaying(savedState);
    }
  }, [hasInteracted]);

  React.useEffect(() => {
    if (!hasInteracted) return;

    const audioInstance = getOrCreateAudio(url);

    if (isPlaying) {
      const playPromise = audioInstance.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error('Audio playback error:', error);
          setIsPlaying(false);
        });
      }
    } else {
      audioInstance.pause();
    }

    localStorage.setItem('audioPlaying', JSON.stringify(isPlaying));
  }, [isPlaying, url, hasInteracted]);

  const toggleAudio = React.useCallback(() => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    setIsPlaying((prev) => !prev);
  }, [hasInteracted]);

  return { isPlaying, toggleAudio };
};

export default function EnhancedCommandDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isPlaying, toggleAudio } = useAudio('/music/foolish-dream.mp3');

  // Find the active section and adjust index (0-based)
  const activeSectionIndex = SECTION_DATA.findIndex(
    (section) => section.href === pathname
  );
  const currentIndex = activeSectionIndex >= 0 ? activeSectionIndex : 0; // Default to 0 if not found
  const currentLabel = activeSectionIndex >= 0 ? SECTION_DATA[currentIndex].label : 1;

  // Adjust next and previous page logic (0-based index)
  const nextPage = currentIndex < SECTION_DATA.length - 1 ? SECTION_DATA[currentIndex + 1]?.href : undefined;
  const previousPage = currentIndex > 0 ? SECTION_DATA[currentIndex - 1]?.href : undefined;

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore shortcuts if focused on input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }

      if (e.key === 'ArrowRight' && nextPage) {
        e.preventDefault();
        router.push(nextPage);
      }
      if (e.key === 'ArrowLeft' && previousPage) {
        e.preventDefault();
        router.push(previousPage);
      }

      if (e.shiftKey && e.key === 'M') {
        e.preventDefault();
        toggleAudio();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [nextPage, previousPage, router, toggleAudio]);

  return (
    <div className="relative min-h-screen">
      <div className="flex items-center justify-between px-4">
        <Link href="/" className="flex items-center text-2xl font-bold text-white">
          Aryayama.
        </Link>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full w-10 h-10 bg-zinc-800 text-white hover:bg-zinc-700 transition-all duration-300"
          onClick={toggleAudio}
          title="Toggle Audio (Shift + M)"
        >
          {isPlaying ? (
            <Volume2 className="h-5 w-5" />
          ) : (
            <VolumeX className="h-5 w-5" />
          )}
        </Button>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search pages..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {SECTION_DATA.map((section) => (
              <CommandItem
                key={section.href}
                onSelect={() => router.push(section.href)}
              >
                {section.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          {...pageTransition}
          className="py-4 px-4 pb-24"
        >
          {children}
          <div className="py-2 text-xs font-bold text-center mt-8 text-white/80">
            {currentLabel} / {SECTION_DATA.length}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="sticky bottom-8 left-0 right-0 flex justify-between px-4 z-30">
        <Link href={previousPage || '#'} passHref>
          <Button
            variant="outline"
            disabled={!previousPage}
            className="rounded-full bg-zinc-800 px-7 py-6 text-sm font-bold text-zinc-400 hover:bg-zinc-700 hover:text-white transition-all duration-300 disabled:opacity-50"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <Link href={nextPage || '#'} passHref>
          <Button
            disabled={!nextPage}
            className="rounded-full bg-white px-7 py-6 text-sm font-bold text-black hover:bg-zinc-100 transition-all duration-300 disabled:opacity-50"
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}