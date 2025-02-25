"use client"
import { useScroll, motion, useTransform } from 'framer-motion';

const { scrollYProgress } = useScroll();
const scrollbarHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

export default function ScrollProgress() {
  return (
    <div className="fixed right-2 top-0 bottom-0 w-1 bg-zinc-800 z-50">
      <motion.div
        className="w-full bg-white rounded-full"
        style={{ height: scrollbarHeight }}
      />
    </div>
  );
}
