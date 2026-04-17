/**
 * Simple 3D Logo Hero Component
 * Displays the Blender logo model in the center with basic lighting
 */
'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

interface Simple3DLogoProps {
    modelPath?: string;
}

/**
 * The 3D logo model component with rotation animation
 */
const LogoModel = () => {
    const groupRef = useRef<THREE.Group>(null);

    // Add smooth rotation animation
    useFrame((state, delta) => {
        if (groupRef.current) {
            // Slow, continuous rotation - approximately 0.3 radians per second
            groupRef.current.rotation.y += delta * 0.3;
        }
    });

    try {
        // Try to load the Blender GLB model
        const { scene } = useGLTF('/models/bonyanmisr-logo.glb');

        return (
            <group ref={groupRef}>
                <primitive object={scene} scale={2.5} />
            </group>
        );
    } catch (error) {
        console.warn('3D model not found, using fallback cube');
        // Return fallback if model fails to load
        return <LoadingFallback />;
    }
};

/**
 * Fallback component while model loads
 */
const LoadingFallback = () => {
    return (
        <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="#c9a961" metalness={0.9} roughness={0.1} />
        </mesh>
    );
};

/**
 * Main hero component with 3D logo
 */
export const Simple3DLogo: React.FC<Simple3DLogoProps> = ({ modelPath }) => {
    return (
        <div className="absolute inset-0 w-full h-full">
            <Canvas
                shadows
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                }}
                dpr={[1, 2]}
            >
                {/* Camera */}
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

                {/* Enhanced Lighting Setup */}
                <ambientLight intensity={0.6} />

                {/* Main spotlight for dramatic effect */}
                <spotLight
                    position={[10, 10, 10]}
                    intensity={2.5}
                    angle={0.3}
                    penumbra={1}
                    castShadow
                />

                {/* Secondary spotlight with brand blue */}
                <spotLight
                    position={[-10, 5, 5]}
                    intensity={1.5}
                    angle={0.5}
                    penumbra={1}
                    color="#5a9fd4"
                />

                {/* Gold accent light for brand emphasis */}
                <pointLight position={[0, 0, 10]} intensity={1.2} color="#c9a961" />

                {/* Rim light for depth */}
                <pointLight position={[0, -5, -5]} intensity={0.8} color="#d4af37" />

                {/* Environment for premium reflections */}
                <Environment preset="city" />

                {/* The 3D Logo with floating animation and loading fallback */}
                <Suspense fallback={<LoadingFallback />}>
                    <Float
                        speed={1.5}
                        rotationIntensity={0}
                        floatIntensity={0.3}
                    >
                        <LogoModel />
                    </Float>
                </Suspense>

                {/* Optional: Allow user to rotate the model */}
                {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
            </Canvas>

            {/* Removed gradient overlay - it was creating a visible line at section boundary */}
        </div>
    );
};

// Conditionally preload the model (won't crash if missing)
try {
    useGLTF.preload('/models/bonyanmisr-logo.glb');
} catch (e) {
    // Model not available yet, fallback will be shown
}

