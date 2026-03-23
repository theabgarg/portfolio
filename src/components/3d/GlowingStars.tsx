'use client';

import { SCENE_POSITIONS } from '@/utils/constants';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface GlowingStarsProps {
    visible: boolean;
}

function createStarShape(): THREE.Shape {
    const shape = new THREE.Shape();
    const outerRadius = 1;
    const innerRadius = 0.25;
    const points = 4;

    for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        if (i === 0) {
            shape.moveTo(x, y);
        } else {
            shape.lineTo(x, y);
        }
    }
    shape.closePath();
    return shape;
}

interface StarData {
    position: THREE.Vector3;
    scale: number;
    phase: number;
    speed: number;
    rotation: number;
    brightness: number;
}

function SparkleStars({ count, spread, height, baseScale, visible }: {
    count: number;
    spread: number;
    height: number;
    baseScale: number;
    visible: boolean;
}) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const starShape = useMemo(() => createStarShape(), []);
    const starGeometry = useMemo(() => new THREE.ShapeGeometry(starShape), [starShape]);

    const stars = useMemo<StarData[]>(() => {
        const data: StarData[] = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random();
            const angle = Math.random() * Math.PI * 2;
            const radiusAtHeight = spread * t * 0.8;
            const y = height * t;

            data.push({
                position: new THREE.Vector3(
                    Math.cos(angle) * radiusAtHeight * (0.5 + Math.random() * 0.5),
                    y,
                    Math.sin(angle) * radiusAtHeight * (0.5 + Math.random() * 0.5)
                ),
                scale: baseScale * (0.3 + Math.random() * 0.7) * (1 - t * 0.3),
                phase: Math.random() * Math.PI * 2,
                speed: 1.5 + Math.random() * 2,
                rotation: Math.random() * Math.PI,
                brightness: 0.5 + Math.random() * 0.5,
            });
        }
        return data;
    }, [count, spread, height, baseScale]);

    const dummy = useMemo(() => new THREE.Object3D(), []);
    const opacities = useRef(new Float32Array(count).fill(1));

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();

        stars.forEach((star, i) => {
            dummy.position.copy(star.position);

            const twinkle = 0.4 + Math.sin(time * star.speed + star.phase) * 0.6;
            const currentScale = star.scale * twinkle * (visible ? 1 : 0);
            dummy.scale.setScalar(currentScale);

            dummy.rotation.set(0, 0, star.rotation + time * 0.2);

            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);

            opacities.current[i] = star.brightness * twinkle;
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh
            ref={meshRef}
            args={[starGeometry, undefined, count]}
        >
            <meshBasicMaterial
                color="#FFE57F"
                transparent
                opacity={0.9}
                side={THREE.DoubleSide}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </instancedMesh>
    );
}

export default function GlowingStars({ visible }: GlowingStarsProps) {
    const groupRef = useRef<THREE.Group>(null);
    const notebookPos = SCENE_POSITIONS.notebook;
    const currentScale = useRef(1);

    useFrame(() => {
        if (groupRef.current) {
            const targetScale = visible ? 1 : 0;
            currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, 0.05);
            groupRef.current.scale.setScalar(currentScale.current);
            groupRef.current.visible = currentScale.current > 0.01;
        }
    });

    return (
        <group
            ref={groupRef}
            position={[notebookPos[0], notebookPos[1] + 0.05, notebookPos[2]]}
        >
            <SparkleStars
                count={60}
                spread={0.35}
                height={0.15}
                baseScale={0.01}
                visible={visible}
            />
            <SparkleStars
                count={25}
                spread={0.45}
                height={0.2}
                baseScale={0.015}
                visible={visible}
            />

            <SparkleStars
                count={40}
                spread={0.4}
                height={0.12}
                baseScale={0.005}
                visible={visible}
            />

            <pointLight
                position={[0, 0.1, 0]}
                color="#FFE066"
                intensity={0.4}
                distance={1}
            />
        </group>
    );
}
