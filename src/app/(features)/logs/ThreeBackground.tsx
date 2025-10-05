"use client";

import { Canvas } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function ThreeBackground() {
  const pointsRef = useRef<any>();

  const count = 500;

  const positions = new Float32Array(count * 3).map(() => (Math.random() - 0.5) * 50);

  return (
    <Canvas
      className="absolute top-0 left-0 w-full h-full z-0"
      camera={{ position: [0, 0, 20], fov: 75 }}
    >
      <ambientLight intensity={0.2} />
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.2} color="#06A8F9" sizeAttenuation />
      </points>
    </Canvas>
  );
}
