'use client';

import { COLORS, LIGHTING } from '@/utils/constants';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface LightingProps {
    lampOn: boolean;
}

export default function Lighting({ lampOn }: LightingProps) {
    const ambientRef = useRef<THREE.AmbientLight>(null);
    const pointRef = useRef<THREE.PointLight>(null);
    const spotRef = useRef<THREE.SpotLight>(null);
    const { scene } = useThree();

    useEffect(() => {
        if (!ambientRef.current || !pointRef.current || !spotRef.current) return;

        const targetLighting = lampOn ? LIGHTING.lampOn : LIGHTING.lampOff;

        gsap.to(ambientRef.current, {
            intensity: targetLighting.ambientIntensity,
            duration: 0.5,
            ease: 'power2.out',
        });

        gsap.to(pointRef.current, {
            intensity: targetLighting.pointIntensity,
            duration: 0.3,
            ease: 'power2.out',
        });

        gsap.to(spotRef.current, {
            intensity: lampOn ? targetLighting.spotIntensity : 0,
            duration: 0.4,
            ease: 'power2.out',
        });
    }, [lampOn]);

    return (
        <>

            <ambientLight
                ref={ambientRef}
                intensity={LIGHTING.lampOff.ambientIntensity}
                color={COLORS.softBlue}
            />


            <pointLight
                ref={pointRef}
                position={[0.70, 1.35, -0.1]}
                intensity={0}
                color={COLORS.warmYellow}
                distance={5}
                decay={2}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-bias={-0.0001}
            />


            <spotLight
                ref={spotRef}
                position={[0.70, 1.5, -0.1]}
                target-position={[-0.01, 1.05, 0.1]}
                angle={0.8}
                penumbra={0.5}
                intensity={0}
                color={COLORS.softOrange}
                castShadow
            />


            <directionalLight
                position={[-5, 3, -5]}
                intensity={0.1}
                color={COLORS.softBlue}
            />
        </>
    );
}
