'use client'

export const dynamic = "force-dynamic";

import { useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import ShiftDown from "./_components/ShiftDown";
import Lenis from 'lenis';
import ThoughtsAndRants from "./_components/ThoughtsAndRants";
import gsap from 'gsap';

export interface BlogPost {
  id: number;
  createdAt: Date;
  title: string;
  slug: string;
  imageUrl: string;
  content: string;
}

export default function HomePage() {

  const container = useRef();
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  }) 


  useEffect( () => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])


  return (
    <main ref={container} className="px-8 py-4 relative w-auto h-[calc(200vh+300px)]">

      <ShiftDown scrollYProgress={scrollYProgress}>
        <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight"> Fred Really Loves to Yap, Doesn't He?</h1>
        <p className="mt-8 text-lg text-gray-500"> Check Out, his latest rants below</p>
      </ShiftDown>

      <ThoughtsAndRants scrollYProgress={scrollYProgress} />

    </main>
  );
}
