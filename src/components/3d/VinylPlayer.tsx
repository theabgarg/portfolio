'use client';

import { SCENE_POSITIONS } from '@/utils/constants';
import { Html, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface VinylPlayerProps {
    isPlaying: boolean;
    onOpenPlayer: () => void;
    lampOn: boolean;
    isOnboarding: boolean;
}

function VinylModel({ isPlaying }: { isPlaying: boolean }) {
    const { scene } = useGLTF('/models/vinyl_player.glb');
    const modelRef = useRef<THREE.Group>(null);

    useEffect(() => {
        scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }, [scene]);

    useFrame(() => {
        if (modelRef.current && isPlaying) {
        }
    });

    return (
        <primitive
            ref={modelRef}
            object={scene}
            scale={0.6}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
        />
    );
}

function FallbackVinyl() {
    return (
        <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.4, 0.1, 0.3]} />
            <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
        </mesh>
    );
}

export default function VinylPlayer({ isPlaying, onOpenPlayer, lampOn, isOnboarding }: VinylPlayerProps) {
    const groupRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    const handleClick = () => {
        if (!lampOn) return;
        onOpenPlayer();
    };

    return (
        <group ref={groupRef} position={SCENE_POSITIONS.vinylPlayer}>
            <Suspense fallback={<FallbackVinyl />}>
                <VinylModel isPlaying={isPlaying} />
            </Suspense>

            <mesh
                position={[0, 0.1, 0]}
                onPointerEnter={() => {
                    if (lampOn && !isOnboarding) {
                        setHovered(true);
                        document.body.style.cursor = 'pointer';
                    }
                }}
                onPointerLeave={() => {
                    setHovered(false);
                    document.body.style.cursor = 'auto';
                }}
                onClick={handleClick}
            >
                <boxGeometry args={[0.5, 0.3, 0.4]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>

            {lampOn && hovered && !isOnboarding && (
                <Html position={[0, 0.70, 0]} center>
                    <div
                        className="bg-black/90 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap pointer-events-none border border-yellow-400/50 shadow-xl"
                        style={{
                            animation: 'fadeIn 0.2s ease-out forwards',
                        }}
                    >
                        {isPlaying ? '🎵 Open Music Player' : 'Play Music'}
                    </div>
                </Html>
            )}
        </group>
    );
}

useGLTF.preload('/models/vinyl_player.glb');
