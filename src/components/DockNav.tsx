import { FloatingDock } from '@/components/Dock';
import {
  IconBook,
  IconBrandGithub,
  IconBrandX,
  IconHome,
  IconTargetArrow,
} from '@tabler/icons-react';

export function DockNav() {
  const links = [
    {
      title: 'Home',
      icon: <IconHome className="h-full w-full text-neutral-300" />,
      href: '/',
    },
    {
      title: 'Entry',
      icon: <IconBook className="h-full w-full text-neutral-300" />,
      href: '/entry',
    },
    {
      title: 'Goals',
      icon: <IconTargetArrow className="h-full w-full text-neutral-300" />,
      href: '/goals',
    },
    {
      title: 'X',
      icon: <IconBrandX className="h-full w-fulltext-neutral-300" />,
      href: 'https://x.com/aryayama_nyx',
    },
    {
      title: 'GitHub',
      icon: <IconBrandGithub className="h-full w-full text-neutral-300" />,
      href: 'https://github.com/SangeethChejerla',
    },
  ];

  return (
    <div className="fixed bottom-0  z-50 ">
      <FloatingDock mobileClassName="translate-y-20" items={links} />
    </div>
  );
}
