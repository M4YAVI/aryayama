'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

const SECTION_DATA = [
  { label: 1, href: '/', isFirst: true, isLast: false },
  { label: 2, href: '/page2', isFirst: false, isLast: false },
  { label: 3, href: '/page3', isFirst: false, isLast: false },
  { label: 4, href: '/page4', isFirst: false, isLast: true },
];

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [nextPage, setNextPage] = useState<undefined | string>('/');
  const [previousPage, setPreviousPage] = useState<undefined | string>('/');
  const pathname = usePathname();

  const activeSection = SECTION_DATA.find(
    (section) => section.href === pathname
  );

  useEffect(() => {
    if (activeSection) {
      setCurrentIndex(activeSection.label);
      if (!activeSection.isLast) {
        setNextPage(SECTION_DATA[activeSection.label]?.href);
      }
      if (!activeSection.isFirst) {
        setPreviousPage(SECTION_DATA[activeSection.label - 2]?.href);
      }
    }
  }, [pathname]);

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-20   py-4">
        <Link
          href="/"
          className="flex items-center text-2xl font-bold dark:text-white"
        >
          Aryayama.{' '}
          <span className="name group ml-2 inline-block rounded-3xl  px-3 text-sm font-bold text-black"></span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="py-4 px-4 pb-24">
        {' '}
        {/* Added bottom padding for button space */}
        {children}
        <div className="py-2 text-xs font-bold group-hover:bg-[#e1ffe1c5] text-center mt-8">
          <p className="text-xs">
            <span className="inline-block dark:text-white">
              {pathname === activeSection?.href ? activeSection.label : null}
            </span>
            <span className="inline-block px-3 opacity-50">/</span>
            <span className="inline-block opacity-50 dark:text-white">
              {SECTION_DATA.length}
            </span>
          </p>
        </div>
      </div>

      {/* Fixed Navigation Buttons */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-between px-4 z-30">
        <Link href={previousPage || '#'} passHref>
          <Button
            disabled={!previousPage}
            className="rounded-3xl bg-[#e0dede] px-7 py-2 text-sm font-bold text-black opacity-50 hover:bg-[#d1d0d0] dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900"
          >
            <span>Back</span>
          </Button>
        </Link>
        <Link href={nextPage || '#'} passHref>
          <Button
            disabled={!nextPage}
            className="rounded-3xl bg-zinc-900 px-7 py-2 text-sm font-bold text-white dark:bg-white dark:text-black"
          >
            <span>Next</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
