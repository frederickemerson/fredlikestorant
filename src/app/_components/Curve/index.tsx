'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { text, curve, translate } from './anim';

interface CurveProps {
  children: React.ReactNode;
  backgroundColor: string;
  routeName: string;
}

const anim = (variants: any) => {
  return {
    variants,
    initial: "initial",
    animate: "enter",
    exit: "exit",
  };
};

export default function Curve({ children, backgroundColor, routeName }: CurveProps) {
  const [dimensions, setDimensions] = useState({
    width: null as number | null,
    height: null as number | null,
  });

  useEffect(() => {
    function resize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="page curve flex justify-center items-center min-h-screen" style={{ backgroundColor }}>
      <div className={`background fixed h-[calc(100vh+600px)] w-screen pointer-events-none left-0 top-0 bg-black transition-opacity duration-0 delay-100 ${dimensions.width == null ? 'opacity-100' : 'opacity-0'}`} />
      
      <motion.p className="route absolute left-1/2 top-[40%] text-white text-[46px] z-10 transform -translate-x-1/2 text-center" {...anim(text)}>
        {routeName}
      </motion.p>
      
      {dimensions.width != null && <SVG width={dimensions.width} height={dimensions.height} />}
      {children}
    </div>
  );
}

interface SVGProps {
  height: number | null;
  width: number | null;
}

const SVG: React.FC<SVGProps> = ({ height, width }) => {
  const initialPath = `
    M0 300 
    Q${width! / 2} 0 ${width} 300
    L${width} ${height! + 300}
    Q${width! / 2} ${height! + 600} 0 ${height! + 300}
    L0 0
  `;

  const targetPath = `
    M0 300
    Q${width! / 2} 0 ${width} 300
    L${width} ${height}
    Q${width! / 2} ${height} 0 ${height}
    L0 0
  `;

  return (
    <motion.svg className="fixed h-[calc(100vh+600px)] w-screen pointer-events-none left-0 top-0" {...anim(translate)}>
      <motion.path {...anim(curve(initialPath, targetPath))} />
    </motion.svg>
  );
};
