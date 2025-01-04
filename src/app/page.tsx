import DirectoryTree from '@/components/DirectoryTree';
import GitHubHeatmap from '@/components/githeatmap/git';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { BadgeCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen text-white flex flex-col relative overflow-hidden">
      <div className="w-full max-w-2xl mx-auto flex flex-col flex-grow">
        <div className="flex items-center justify-between px-6 h-16">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-zinc-800 transition-colors duration-200"
          >
            {/* You can add a hamburger icon or your logo here */}
          </Button>
          <div className="w-10"></div> {/* Spacer for symmetric layout */}
        </div>

        <div className="relative aspect-[3/1] overflow-hidden group">
          <Image
            src="/images/bng.png"
            alt="Piano keys illustration"
            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
            fill
            style={{ transition: 'transform 0.3s ease-in-out' }}
          />
          <div
            className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ transition: 'opacity 0.3s ease-in-out' }}
          ></div>
        </div>

        {/* Profile Section */}
        <div className="px-6 pb-6 flex-grow">
          <div className="flex flex-col items-center -mt-16 mb-6 space-y-4">
            <Avatar className="h-32 w-32 rounded-full border-4 ring-4 ring-zinc-800 hover:ring-blue-500 transition-all duration-300">
              <AvatarImage src="/images/profile.png" alt="Profile picture" />
              <AvatarFallback className=" text-white">AN</AvatarFallback>
            </Avatar>

            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-2xl font-bold tracking-tight">
                  Aryayama Nyx
                </h2>
                <BadgeCheck className="h-6 w-6 text-blue-500 animate-pulse" />
              </div>
              <p className="text-white ">@sangeeth_rch</p>
            </div>
          </div>

          <div className="max-w-xl mx-auto text-center">
            <p className=" leading-relaxed mb-6  p-4 ">
              "I'm not lazy; I'm just in energy-conserving mode, and adulting
              has started."
            </p>
            <span className="inline-block hover:scale-105 transform transition-all duration-300">
              <Link
                className="bg-yellow-400 text-black px-3 py-1 rounded-md hover:bg-yellow-500 transition-colors duration-200"
                href="https://aryayama.vercel.app/rules"
              >
                My rules
              </Link>
            </span>
            <div className="mt-8">
              <GitHubHeatmap />
            </div>
            <div className="mt-8">
              <DirectoryTree />
            </div>
          </div>
        </div>
      </div>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900/50 to-zinc-900 opacity-75"
          style={{
            background:
              'linear-gradient(180deg, rgba(10, 10, 10, 0.9), rgba(10, 10, 10, 0.7) 20%, transparent 80%)',
          }}
        ></div>
      </div>
    </main>
  );
}
