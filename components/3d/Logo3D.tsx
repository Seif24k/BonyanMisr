'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Stage, Float, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface Logo3DProps {
    modelPath: string;
    scale?: number;
    autoRotate?: boolean;
}

const Model = ({ path, scale = 1, autoRotate = true }: { path: string; scale?: number; autoRotate?: boolean }) => {
    const { scene } = useGLTF(path);
    const ref = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (autoRotate && ref.current) {
            ref.current.rotation.y += delta * 0.5;
        }
    });

    return (
        <group ref={ref} scale={scale}>
            <primitive object={scene} />
        </group>
    );
};

export const Logo3D: React.FC<Logo3DProps> = ({
    modelPath,
    scale = 2,
    autoRotate = true
}) => {
    return (
        <div className="w-full h-full">
            <Canvas shadows dpr={[1, 2]} camera={{ fov: 50, position: [0, 0, 8] }}>
                <React.Suspense fallback={null}>
                    {/* Enhanced Lighting Setup without HDR dependency */}
                    <ambientLight intensity={0.6} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
                    <spotLight position={[-10, -5, 5]} angle={0.2} penumbra={1} intensity={1} color="#c9a961" />
                    <pointLight position={[0, 0, 8]} intensity={0.8} color="#5a9fd4" />

                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        <Model path={modelPath} scale={scale} autoRotate={autoRotate} />
                    </Float>

                    <OrbitControls enableZoom={false} enablePan={false} />
                </React.Suspense>
            </Canvas>
        </div>
    );
};

// Pre-load the GLTF to avoid pop-in
useGLTF.preload('/models/logo.glb');
