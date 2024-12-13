'use client'
import React from 'react'
import { useTransform, motion } from "framer-motion";
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import floating2 from 'public/img2.svg';
import floating1 from 'public/img1.svg';
import floating3 from 'public/img3.svg';
import floating4 from 'public/img4.svg';
import floating5 from 'public/img5.svg';
import floating6 from 'public/img6.svg';
import floating7 from 'public/img7.svg';
import floating8 from 'public/img8.svg';

const ShiftDown = ({children, scrollYProgress}) => {

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  const opacity = useTransform(scrollYProgress,[0, 0.7], [1, 0])
  const [stop,setStop] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [scrollCount, setScrollCount] = useState(0);
  
  const plane1 = useRef<HTMLDivElement>(null);
  const plane2 = useRef<HTMLDivElement>(null);
  const plane3 = useRef<HTMLDivElement>(null);

  let requestAnimationFrameId: number | null = null;
  let xForce = 0;
  let yForce = 0;

  const easing = 0.08;
  const speed = 0.01;


  const lerp = (start: number, target: number, amount: number): number => {
    return start * (1 - amount) + target * amount;
  }
 
  const animate = () => {
    xForce = lerp(xForce, 0, easing);
    yForce = lerp(yForce, 0, easing);

    if (plane1.current) {
      gsap.set(plane1.current, { x: `+=${xForce  }`, y: `+=${yForce}` });
    }
    if (plane2.current) {
      gsap.set(plane2.current, { x: `+=${xForce * 0.5}`, y: `+=${yForce * 0.5}` });
    }
    if (plane3.current) {
      gsap.set(plane3.current, { x: `+=${xForce * 0.25}`, y: `+=${yForce * 0.25}` });
    }


    if (Math.abs(xForce) < 0.01) xForce = 0;
    if (Math.abs(yForce) < 0.01) yForce = 0;

    if (xForce !== 0 || yForce !== 0) {
      requestAnimationFrameId = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestAnimationFrameId!);
      requestAnimationFrameId = null;
    }
  };

    // Get the screen height when the component is mounted
    useEffect(() => {
      if(typeof window!== "undefined" && window.innerWidth>990){
        if (typeof window !== "undefined") {
          setScreenHeight(window.innerHeight);
        }

        setStop(1)
        
        return () => {
          if (requestAnimationFrameId) cancelAnimationFrame(requestAnimationFrameId);
        };
    } 
    },[window.innerWidth,requestAnimationFrameId]);

  const handleClick = () => {
    const targetPosition = (scrollCount + 1.1) * screenHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth', // Smooth scroll effect
    });

    setScrollCount(scrollCount + 1); // Increment the scroll count     <button onClick={handleClick}>Move Page Down</button>

  };

  const manageMouseMove = (e: React.MouseEvent) => {
    if(window.innerWidth>990){
      const { movementX, movementY } = e;
      xForce += movementX * speed;
      yForce += movementY * speed;

      if (requestAnimationFrameId === null) {
        requestAnimationFrameId = requestAnimationFrame(animate);
      }
    } else {
      requestAnimationFrameId = null
    }
  };


  return (
    <motion.div
    onMouseMove={e => (manageMouseMove(e))}
    style={{scale, rotate, opacity}}
    className="sticky top-0 h-screen text-[3.5vw] flex flex-col justify-center items-center pb-[30vh] "
  >
        <div  ref={plane1} className="absolute opacity-0 lg:opacity-100 inset-0 filter brightness-75">
        <Image 
          src={floating1} 
          alt="Floating Image 1" 
          className="rounded-lg bg-[#ffffff1a] p-2 absolute left-[77.5%] top-[40%] w-[75px] sm:w-[75px] md:w-[75px] lg:w-[75px] animate-float" 
        />
        <Image 
          src={floating2} 
          alt="Floating Image 2" 
          className="rounded-lg bg-[#ffffff1a] p-2 absolute left-[5%] top-[65%] w-[75px] sm:w-[75px] md:w-[75px] lg:w-[75px] animate-float" 
        />
        <Image 
          src={floating7} 
          alt="Floating Image 3" 
          className="rounded-lg bg-[#ffffff1a] p-2 absolute left-[35%] top-0 w-[75px] sm:w-[75px] md:w-[75px] lg:w-[75px] animate-float" 
        />
         <div 
          className="rounded-lg bg-[#ffffff1a] p-2 absolute left-[40%] top-[45%] w-[75px] h-[75px] sm:w-[75px] md:w-[75px] lg:w-[75px] animate-float" 
        ></div>
        <div 
          className="rounded-lg bg-[#ffffff1a] p-2 absolute left-[82.5%] top-[75%] w-[75px] h-[75px] sm:w-[75px] md:w-[75px] lg:w-[75px] animate-float" 
        ></div>
      </div>

      <div ref={plane2} className="absolute opacity-0 lg:opacity-100 inset-0 filter brightness-60">
        <Image 
          src={floating4} 
          alt="Floating Image 4" 
          className="rounded-lg bg-[#ffffff1a] p-2 absolute left-[5%] top-[10%] w-[75px] sm:w-[75px] md:w-[75px] lg:w-[75px] animate-float" 
        />
        <Image 
          src={floating6} 
          alt="Floating Image 5" 
          className="rounded-lg bg-[#ffffff1a] p-2 absolute left-[80%] top-[5%] w-[75px] sm:w-[75px] md:w-[75px] lg:w-[75px] animate-float" 
        />
        <Image 
          src={floating8} 
          alt="Floating Image 6" 
          className="rounded-lg bg-[#ffffff1a] p-2 absolute left-[55%] top-[60%] w-[75px] sm:w-[75px] md:w-[75px] lg:w-[75px] animate-float" 
        />
        
        <div 
          className="rounded-lg bg-[#ffffff1a] p-2 absolute left-[20%] top-[5%] w-[75px] h-[75px] sm:w-[75px] md:w-[75px] lg:w-[75px] animate-float" 
        ></div>
        <div 
          className="rounded-lg bg-[#ffffff1a] p-2 absolute left-[45%] top-[15%] w-[75px] h-[75px] sm:w-[75px] md:w-[75px] lg:w-[75px] animate-float" 
        ></div>
        <div 
          className="rounded-lg bg-[#ffffff1a] p-2 absolute left-[90%] top-[55%] w-[75px] h-[75px] sm:w-[75px] md:w-[75px] lg:w-[75px] animate-float" 
        ></div>
        <div 
          className="rounded-lg bg-[#ffffff1a] p-2 absolute left-[70%] top-[20%] w-[75px] h-[75px] sm:w-[75px] md:w-[75px] lg:w-[75px] animate-float" 
        ></div>
      </div>

      <div  ref={plane3} className="absolute opacity-0 lg:opacity-100 inset-0 filter brightness-50">
        <Image 
          src={floating3} 
          alt="Floating Image 7" 
          className="rounded-lg bg-[#ffffff1a] p-2 absolute left-[60%] top-[2.5%] w-[75px] sm:w-[75px] md:w-[75px] lg:w-[75px] animate-float" 
        />
        <Image 
          src={floating5} 
          alt="Floating Image 8" 
          className="rounded-lg bg-[#ffffff1a] p-2 absolute left-[40%] top-[75%] w-[75px] sm:w-[75px] md:w-[75px] lg:w-[75px] animate-float" 
        />
        
        <div 
          className="rounded-lg bg-[#ffffff1a] p-2 absolute left-[25%] top-[65%] w-[75px] h-[75px] sm:w-[75px] md:w-[75px] lg:w-[75px] animate-float" 
        ></div>
        <div 
          className="rounded-lg bg-[#ffffff1a] p-2 absolute left-[30%] top-[25%] w-[75px] h-[75px] sm:w-[75px] md:w-[75px] lg:w-[75px] animate-float" 
        ></div>
        <div 
          className="rounded-lg bg-[#ffffff1a] p-2 absolute left-[10%] top-[45%] w-[75px] h-[75px] sm:w-[75px] md:w-[75px] lg:w-[75px] animate-float" 
        ></div>
        <div 
          className="rounded-lg bg-[#ffffff1a] p-2 absolute left-[70%] top-[60%] w-[75px] h-[75px] sm:w-[75px] md:w-[75px] lg:w-[75px] animate-float" 
        ></div>
      </div>
      
    {children}
  </motion.div>
   )
}

export default ShiftDown
