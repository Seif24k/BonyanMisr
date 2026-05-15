'use client';

import { useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, Float } from '@react-three/drei';
import * as THREE from 'three';

interface Simple3DLogoProps {
    className?: string;
    modelScale?: number;
}

const LogoModel = ({ modelScale }: { modelScale: number }) => {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.38;
        }
    });
    const { scene } = useGLTF('/models/bonyanmisr-logo.glb');
    const clonedScene = useMemo(() => {
        const clone = scene.clone(true);

        clone.traverse((object) => {
            if (!(object instanceof THREE.Mesh)) return;

            const tuneMaterial = (material: THREE.Material) => {
                const tuned = material.clone();

                if (tuned instanceof THREE.MeshStandardMaterial || tuned instanceof THREE.MeshPhysicalMaterial) {
                    tuned.roughness = Math.min(tuned.roughness, 0.42);
                    tuned.metalness = Math.min(Math.max(tuned.metalness, 0.45), 0.82);
                    tuned.emissive = tuned.color.clone().multiplyScalar(0.12);
                    tuned.emissiveIntensity = 0.45;
                    tuned.needsUpdate = true;
                }

                return tuned;
            };

            object.material = Array.isArray(object.material)
                ? object.material.map(tuneMaterial)
                : tuneMaterial(object.material);
        });

        return clone;
    }, [scene]);
    return (
        <group ref={groupRef}>
            <primitive object={clonedScene} scale={modelScale} />
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
    className = 'absolute inset-0 w-full h-full',
    modelScale = 2.5,
}: Simple3DLogoProps = {}) => (
    <div className={className}>
        <Canvas
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            dpr={1}
        >
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
            <ambientLight intensity={1.05} />
            <hemisphereLight args={['#f7e7a2', '#071731', 1.5]} />
            <directionalLight position={[0, 2, 8]} intensity={2.6} color="#fff2c4" />
            <spotLight position={[7, 8, 8]} intensity={3.8} angle={0.44} penumbra={0.7} />
            <spotLight position={[-8, 4, 5]} intensity={1.6} angle={0.55} penumbra={0.7} color="#5a9fd4" />
            <pointLight position={[0, 0, 8]} intensity={1.4} color="#d4af37" />
            <Suspense fallback={<LoadingFallback />}>
                <Float speed={1.5} rotationIntensity={0} floatIntensity={0.3}>
                    <LogoModel modelScale={modelScale} />
                </Float>
            </Suspense>
        </Canvas>
    </div>
);

useGLTF.preload('/models/bonyanmisr-logo.glb');
