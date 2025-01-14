import Wrapper from '@/components/home/Wrapper';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BadgeCheck } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <Wrapper>
      <div className="w-full max-w-3xl mx-auto space-y-8">
        {/* Hero Image */}
        <div className="relative aspect-[3/1] rounded-2xl overflow-hidden group">
          <Image
            src="/images/bng.png"
            alt="Piano keys illustration"
            className="w-full h-full object-cover transform transition-all duration-500 group-hover:scale-105"
            fill
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        </div>

        {/* Profile Section */}
        <div className="relative px-6">
          <div className="flex flex-col items-center -mt-24 space-y-6">
            <Avatar className="h-40 w-40 rounded-full border-4 border-zinc-900 ring-4 ring-zinc-800 hover:ring-blue-500 transition-all duration-300 shadow-2xl">
              <AvatarImage
                src="/images/profile.png"
                alt="Profile picture"
                className="object-cover"
              />
              <AvatarFallback className="text-white">AN</AvatarFallback>
            </Avatar>

            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  Aryayama Nyx
                </h1>
                <BadgeCheck className="h-6 w-6 text-blue-500 animate-pulse" />
              </div>
              <p className="text-white/80 text-lg">@sangeeth_rch</p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mt-12">
            <blockquote className="text-center text-xl italic leading-relaxed">
              "I'm not lazy; I'm just in energy-conserving mode, and adulting
              has started."
            </blockquote>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
