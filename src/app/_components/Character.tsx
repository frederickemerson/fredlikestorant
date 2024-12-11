// src/CuteCharacter.tsx
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Mesh } from 'three';
import { OrbitControls } from '@react-three/drei';
import { SphereGeometry } from 'three';

// Extend the geometries to be available in JSX
extend({ SphereGeometry });

const CuteCharacter = () => {
  const meshRef = useRef<Mesh>(null);
  const [isAngry, setIsAngry] = useState(false);
  const [isTalking, setIsTalking] = useState(true);

  // Animation loop to keep the character talking
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01; // Rotating
      if (isTalking) {
        const scale = 1 + Math.sin(Date.now() / 150) * 0.05; // Simple talking animation
        meshRef.current.scale.set(scale, scale, scale);
      } else {
        meshRef.current.scale.set(1, 1, 1);
      }
    }
  });

  const handleClick = () => {
    setIsAngry(true);
    setIsTalking(false); // Stop talking when angry
    setTimeout(() => {
      setIsAngry(false);
      setIsTalking(true); // Resume talking after anger
    }, 1000); // Angry for 1 second
  };

  return (
    <mesh ref={meshRef} onClick={handleClick}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={isAngry ? 'red' : 'orange'} />
    </mesh>
  );
};

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
    <header className="bg-gray-800 p-4 w-full text-center">
      <h1 className="text-3xl font-bold">My 3D Cute Character</h1>
    </header>
    <main className="flex-grow w-full flex items-center justify-center">
      <div className="w-full h-full">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <OrbitControls />
          <CuteCharacter />
        </Canvas>
      </div>
    </main>
  </div>
  );
};

export default App;
