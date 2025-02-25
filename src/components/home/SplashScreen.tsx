"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ChakraParticle {
  id: number
  angle: number
  distance: number
}

export function SplashScreen() {
  const [progress, setProgress] = useState(0)
  const [riftRunes, setRiftRunes] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [chakraRift, setChakraRift] = useState<ChakraParticle[]>([])

  useEffect(() => {
    const runes = "忍術火風雷水土"
    let interval: NodeJS.Timeout

    const runeInterval = setInterval(() => {
      const randomRunes = Array(6)
        .fill(0)
        .map(() => runes.charAt(Math.floor(Math.random() * runes.length)))
        .join(" ")
      setRiftRunes(randomRunes)
    }, 80)

    const riftInterval = setInterval(() => {
      setChakraRift((prev) => {
        const newParticle: ChakraParticle = {
          id: Date.now(),
          angle: Math.random() * 360,
          distance: Math.random() * 50
        }
        return [...prev, newParticle].slice(-15) // Keep last 15 particles for performance
      })
    }, 120) // Update every 120ms for smooth animation

    interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          clearInterval(runeInterval)
          clearInterval(riftInterval)
          setTimeout(() => setIsComplete(true), 1000)
          return 100
        }
        return prev + 1
      })
    }, 35)

    return () => {
      clearInterval(interval)
      clearInterval(runeInterval)
      clearInterval(riftInterval)
    }
  }, [])

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black transition-all duration-1000",
        isComplete ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100"
      )}
    >
      {/* Cosmic Rift Particle Background */}
      <div className="absolute inset-0 overflow-hidden">
        {chakraRift.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-neon-blue rounded-full animate-riftParticle"
            style={{
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) rotate(${particle.angle}deg) translateY(${particle.distance}px)`,
            }}
          />
        ))}
      </div>

      {/* Loading Animation GIF */}
      <div className="relative w-64 h-64 mb-8 animate-teleportIn">
        <Image
          src="/86.gif"
          alt="Loading Animation"
          fill
          className="object-contain"
          priority
          unoptimized
        />
      </div>
      {/* Ninja rune loading text */}
      <div className="font-mono text-neon-purple mb-4 h-6 tracking-widest">
        {`術式展開: ${riftRunes}`}
      </div>

      {/* Progress bar with chakra glow */}
      <div className="w-80 h-2 bg-dark-900 rounded-full overflow-hidden relative">
        <div
          className="h-full bg-gradient-to-r from-neon-blue to-neon-purple transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-white/40 blur-lg animate-chakraGlow" />
        </div>
      </div>

      {/* Progress percentage */}
      <div className="mt-4 font-mono text-sm text-neon-purple animate-fadeIn">
        {`${progress}% 封印解除`}
      </div>
    </div>
  )
}

// Styles remain the same as before
const cosmicStyles = `
  @keyframes riftParticle {
    0% { opacity: 0; transform: translate(-50%, -50%) rotate(0deg) translateY(0px); }
    20% { opacity: 1; }
    100% { opacity: 0; transform: translate(-50%, -50%) rotate(360deg) translateY(100px); }
  }
  @keyframes teleportIn {
    0% { opacity: 0; transform: scale(0.5) translateY(50px); filter: blur(5px); }
    50% { opacity: 1; transform: scale(1.1) translateY(0); filter: blur(0); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes chakraGlow {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.8; }
  }
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  .animate-riftParticle {
    animation: riftParticle 1.2s ease-out forwards;
  }
  .animate-teleportIn {
    animation: teleportIn 0.8s ease-out forwards;
  }
  .animate-chakraGlow {
    animation: chakraGlow 1.2s ease-in-out infinite;
  }
  .animate-fadeIn {
    animation: fadeIn 0.6s ease-in forwards;
  }
  .text-neon-purple {
    color: #D100FF;
    text-shadow: 0 0 5px #D100FF, 0 0 15px #D100FF;
  }
  .bg-neon-blue {
    background-color: #00DDEB;
  }
  .bg-dark-900 {
    background-color: #0d0d0d;
  }
`