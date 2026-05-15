'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

type Simple3DLogoProps = {
    className?: string;
    canvasClassName?: string;
    modelPosition?: [number, number, number];
    modelScale?: number;
    baseRotation?: [number, number, number];
    cameraPosition?: [number, number, number];
    rotationSpeed?: number;
    rotationMode?: 'spin' | 'sway';
    rotationAmplitude?: number;
    floatSpeed?: number;
    floatIntensity?: number;
};

type LogoModelProps = {
    modelPosition: [number, number, number];
    modelScale: number;
    baseRotation: [number, number, number];
    rotationSpeed: number;
    rotationMode: 'spin' | 'sway';
    rotationAmplitude: number;
};

const LogoModel = ({
    modelPosition,
    modelScale,
    baseRotation,
    rotationSpeed,
    rotationMode,
    rotationAmplitude,
}: LogoModelProps) => {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((state, delta) => {
        if (groupRef.current) {
            if (rotationMode === 'sway') {
                groupRef.current.rotation.y = baseRotation[1] + Math.sin(state.clock.elapsedTime * rotationSpeed) * rotationAmplitude;
            } else {
                groupRef.current.rotation.y += delta * rotationSpeed;
            }
        }
    });
    const { scene } = useGLTF('/models/bonyanmisr-logo.glb');
    return (
        <group ref={groupRef} position={modelPosition} rotation={baseRotation}>
            <primitive object={scene} scale={modelScale} />
        </group>
    );
};

const LoadingFallback = () => (
    <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#c9a961" metalness={0.9} roughness={0.1} />
    </mesh>
);

export const Simple3DLogo = ({
    className,
    canvasClassName,
    modelPosition = [0, 0, 0],
    modelScale = 2.5,
    baseRotation = [0, 0, 0],
    cameraPosition = [0, 0, 8],
    rotationSpeed = 0.3,
    rotationMode = 'spin',
    rotationAmplitude = 0.2,
    floatSpeed = 1.5,
    floatIntensity = 0.3,
}: Simple3DLogoProps) => (
    <div className={cn("absolute inset-0 w-full h-full", className)}>
        <Canvas
            className={canvasClassName}
            shadows
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            dpr={[1, 2]}
        >
            <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />
            <ambientLight intensity={0.6} />
            <spotLight position={[10, 10, 10]} intensity={2.5} angle={0.3} penumbra={1} castShadow />
            <spotLight position={[-10, 5, 5]} intensity={1.5} angle={0.5} penumbra={1} color="#5a9fd4" />
            <pointLight position={[0, 0, 10]} intensity={1.2} color="#c9a961" />
            <pointLight position={[0, -5, -5]} intensity={0.8} color="#d4af37" />
            <Environment files="/potsdamer_platz_1k.hdr" />
            <Suspense fallback={<LoadingFallback />}>
                <Float speed={floatSpeed} rotationIntensity={0} floatIntensity={floatIntensity}>
                    <LogoModel
                        modelPosition={modelPosition}
                        modelScale={modelScale}
                        baseRotation={baseRotation}
                        rotationSpeed={rotationSpeed}
                        rotationMode={rotationMode}
                        rotationAmplitude={rotationAmplitude}
                    />
                </Float>
            </Suspense>
        </Canvas>
    </div>
);

useGLTF.preload('/models/bonyanmisr-logo.glb');
