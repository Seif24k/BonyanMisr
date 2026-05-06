'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

const LogoModel = () => {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.3;
        }
    });
    const { scene } = useGLTF('/models/bonyanmisr-logo.glb');
    return (
        <group ref={groupRef}>
            <primitive object={scene} scale={2.5} />
        </group>
    );
};

const LoadingFallback = () => (
    <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#c9a961" metalness={0.9} roughness={0.1} />
    </mesh>
);

export const Simple3DLogo = () => (
    <div className="absolute inset-0 w-full h-full">
        <Canvas shadows gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }} dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
            <ambientLight intensity={0.6} />
            <spotLight position={[10, 10, 10]} intensity={2.5} angle={0.3} penumbra={1} castShadow />
            <spotLight position={[-10, 5, 5]} intensity={1.5} angle={0.5} penumbra={1} color="#5a9fd4" />
            <pointLight position={[0, 0, 10]} intensity={1.2} color="#c9a961" />
            <pointLight position={[0, -5, -5]} intensity={0.8} color="#d4af37" />
            <Environment files="/potsdamer_platz_1k.hdr" />
            <Suspense fallback={<LoadingFallback />}>
                <Float speed={1.5} rotationIntensity={0} floatIntensity={0.3}>
                    <LogoModel />
                </Float>
            </Suspense>
        </Canvas>
    </div>
);

useGLTF.preload('/models/bonyanmisr-logo.glb');