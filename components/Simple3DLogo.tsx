'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

interface Simple3DLogoProps {
    className?: string;
    modelScale?: number;
}

const LogoModel = ({ modelScale }: { modelScale: number }) => {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((_, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.3;
        }
    });
    const { scene } = useGLTF('/models/bonyanmisr-logo.glb');
    return (
        <group ref={groupRef}>
            <primitive object={scene} scale={modelScale} />
        </group>
    );
};

const LogoScene = ({ modelScale }: { modelScale: number }) => {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
            <ambientLight intensity={0.6} />
            <spotLight position={[10, 10, 10]} intensity={2.5} angle={0.3} penumbra={1} castShadow />
            <spotLight position={[-10, 5, 5]} intensity={1.5} angle={0.5} penumbra={1} color="#5a9fd4" />
            <pointLight position={[0, 0, 10]} intensity={1.2} color="#c9a961" />
            <pointLight position={[0, -5, -5]} intensity={0.8} color="#d4af37" />
            <Suspense fallback={null}>
                <Environment files="/potsdamer_platz_1k.hdr" />
                <Float speed={1.5} rotationIntensity={0} floatIntensity={0.3}>
                    <LogoModel modelScale={modelScale} />
                </Float>
            </Suspense>
        </>
    );
};

export const Simple3DLogo = ({
    className = 'absolute inset-0 w-full h-full',
    modelScale = 2.5,
}: Simple3DLogoProps = {}) => (
    <div className={className}>
        <Canvas
            shadows
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
            }}
            dpr={[1, 1.35]}
        >
            <LogoScene modelScale={modelScale} />
        </Canvas>
    </div>
);

useGLTF.preload('/models/bonyanmisr-logo.glb');
