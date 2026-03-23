'use client';

import { SCENE_POSITIONS } from '@/utils/constants';
import { useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';

function DeskModel() {
    const { scene } = useGLTF('/models/desk.glb');
    const modelRef = useRef<THREE.Group>(null);

    useEffect(() => {
        scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }, [scene]);

    return (
        <primitive
            ref={modelRef}
            object={scene}
            scale={0.5}
            position={[0, 0, 0]}
            rotation={[0, -Math.PI / 2, 0]}
        />
    );
}

function FallbackDesk() {
    return (
        <>
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
                <boxGeometry args={[2.5, 0.05, 1.5]} />
                <meshStandardMaterial color="#8B4513" roughness={0.7} metalness={0.1} />
            </mesh>
            {[
                [-1.1, 0.25, -0.6],
                [1.1, 0.25, -0.6],
                [-1.1, 0.25, 0.6],
                [1.1, 0.25, 0.6],
            ].map((pos, i) => (
                <mesh key={i} position={pos as [number, number, number]} castShadow receiveShadow>
                    <boxGeometry args={[0.08, 0.5, 0.08]} />
                    <meshStandardMaterial color="#8B4513" roughness={0.7} metalness={0.1} />
                </mesh>
            ))}
        </>
    );
}

export default function Desk() {
    return (
        <group position={SCENE_POSITIONS.desk}>
            <Suspense fallback={<FallbackDesk />}>
                <DeskModel />
            </Suspense>
        </group>
    );
}

useGLTF.preload('/models/desk.glb');
