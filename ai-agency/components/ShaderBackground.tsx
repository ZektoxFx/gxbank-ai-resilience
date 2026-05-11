// components/ShaderBackground.tsx
'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const FragmentShader = `
  uniform float u_time;
  uniform vec2 u_mouse;
  varying vec2 vUv;
  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float d = length(p - u_mouse * 0.5);
    vec3 color = vec3(0.01, 0.01, 0.02); // Deep Obsidian
    float glow = 0.05 / (d + 0.1);
    
    // Electric Blue (#3B82F6) and Cyber Purple (#8B5CF6) accents
    color += vec3(0.23, 0.51, 0.96) * glow * sin(u_time * 0.5); 
    color += vec3(0.54, 0.36, 0.96) * (0.02 / (length(p + u_mouse) + 0.1)); 
    gl_FragColor = vec4(color, 1.0);
  }
`;

const VertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ShaderPlane = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_mouse: { value: new THREE.Vector2(0, 0) }
  }), []);

  useFrame((state) => {
    uniforms.u_time.value = state.clock.elapsedTime;
    uniforms.u_mouse.value.lerp(state.pointer, 0.05);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[5, 5]} />
      <shaderMaterial 
        fragmentShader={FragmentShader} 
        vertexShader={VertexShader} 
        uniforms={uniforms} 
      />
    </mesh>
  );
};

export default function ShaderBackground() {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full bg-[#030305]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ShaderPlane />
      </Canvas>
    </div>
  );
}