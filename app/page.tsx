import MinimalistProfile from '@/components/MinimalistProfile';
import SurvivalUI from '@/components/SurvivalUI';
import ShaderBackground from '@/components/ShaderBackground';

export default function Home() {
  return (
    <main className="min-h-screen text-white py-20 px-4 flex flex-col items-center justify-center gap-32">
      <ShaderBackground />
      <div className="relative z-10 flex flex-col items-center gap-32 w-full">
        <MinimalistProfile />
        <SurvivalUI />
      </div>
    </main>
  );
}
