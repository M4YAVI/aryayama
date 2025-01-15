import { IconBadge4k } from '@tabler/icons-react';
import { BookAIcon } from 'lucide-react';

function Fav() {
  return (
    <div className="min-h-screen  text-white p-4 ">
      {/* Main Card */}
      <div className="max-w-3xl mx-auto rounded-2xl  p-6 space-y-6">
        {/* Header Section */}
        <div className="relative h-48 overflow-hidden rounded-xl bg-[#1a1a1a]">
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-6 gap-1">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="h-12 w-full">
                  ♥
                </div>
              ))}
            </div>
          </div>

          <div className="relative p-6 flex justify-between items-start">
            <div>
              <div className="text-4xl mb-2">↓</div>
              <h1 className="text-3xl font-bold mb-2">
                Anime a day keeps
                <br />
                the stupid reality away
              </h1>
            </div>
            <div className="w-48 h-48">
              {/* Placeholder for anime character silhouette */}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-[#1a1a1a] p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">
                <IconBadge4k stroke={2} />
              </span>
              <span>My Favorite anime</span>
            </div>
            <div className="text-gray-500">Hyouka</div>
          </div>
          <div className="bg-[#1a1a1a] p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">
                <BookAIcon />
              </span>
              <span>My Favorite Book</span>
            </div>
            <div className="text-gray-500">Alchemist</div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#1a1a1a] p-4 rounded-lg">
            <div className="font-bold">600</div>
            <div className="text-gray-500 text-sm">total animes watched</div>
          </div>
          <div className="bg-[#1a1a1a] p-4 rounded-lg">
            <div className="font-bold">243</div>
            <div className="text-gray-500 text-sm">Total days spent</div>
          </div>
          <div className="bg-[#1a1a1a] p-4 rounded-lg">
            <div className="font-bold">10</div>
            <div className="text-gray-500 text-sm">Total Books read</div>
          </div>
        </div>

        {/* Share Section */}
        <div className="bg-[#1a1a1a] p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span>😊</span>
                <span>My favourite Animes</span>
              </div>
              <div className="flex gap-2">
                <div className="bg-white w-32 h-32 rounded-lg"></div>
                <div className="bg-white w-32 h-32 rounded-lg"></div>
                <div className="bg-white w-32 h-32 rounded-lg"></div>
                <div className="bg-white w-32 h-32 rounded-lg"></div>
                <div className="bg-white w-32 h-32 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a1a] p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span>😊</span>
                <span>My favourite Characters</span>
              </div>
              <div className="flex gap-2">
                <div className="bg-white w-32 h-32 rounded-lg"></div>
                <div className="bg-white w-32 h-32 rounded-lg"></div>
                <div className="bg-white w-32 h-32 rounded-lg"></div>
                <div className="bg-white w-32 h-32 rounded-lg"></div>
                <div className="bg-white w-32 h-32 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Alternative Ways Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span>💎</span>
            <span>My Favorite Songs</span>
          </div>
          <div className="space-y-2">
            {[
              {
                label: 'ethereum',
                value: '0x4B4cF23051c78c7A7E0eA09d39099621c46bc302',
              },

              {
                label: 'monero',
                value: '4B1SNBGs8Pq1hxjNeKPEe8Qa8EP3zdL16Sqsa7QDoJc...',
              },
              {
                label: 'litecoin',
                value: 'ltc1qvp0xhzk2m7pa6p6z844qcslfyxv4p3vf95rhna',
              },
              {
                label: 'ton',
                value: 'UQA3S0-hHZq1oCCT--u6or6o1lB8fd2o52aD8mXiLk9...',
              },
              { label: 'boosty', value: 'boosty.to/wukko/donate' },
            ].map((item, index) => (
              <div key={index} className="bg-[#1a1a1a] p-4 rounded-lg">
                <div className="text-gray-500 text-sm">{item.label}</div>
                <div className="flex items-center gap-2">
                  <div className="truncate">{item.value}</div>
                  <button className="text-gray-500">📋</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fav;
