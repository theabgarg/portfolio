'use client';

import { COLORS } from '@/utils/constants';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

function createCraneGeometry() {
    const vertices: number[] = [];
    const normals: number[] = [];

    const addTriangle = (a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3) => {
        const edge1 = new THREE.Vector3().subVectors(b, a);
        const edge2 = new THREE.Vector3().subVectors(c, a);
        const normal = new THREE.Vector3().crossVectors(edge1, edge2).normalize();
        vertices.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);
        normals.push(normal.x, normal.y, normal.z, normal.x, normal.y, normal.z, normal.x, normal.y, normal.z);
    };

    const nose = new THREE.Vector3(0, 0, -0.12);
    const tail = new THREE.Vector3(0, 0, 0.12);
    const left = new THREE.Vector3(-0.04, 0, 0);
    const right = new THREE.Vector3(0.04, 0, 0);
    const top = new THREE.Vector3(0, 0.02, 0);
    const bottom = new THREE.Vector3(0, -0.02, 0);

    addTriangle(nose, top, left);
    addTriangle(nose, right, top);
    addTriangle(top, left, tail);
    addTriangle(top, tail, right);
    addTriangle(nose, left, bottom);
    addTriangle(nose, bottom, right);
    addTriangle(bottom, left, tail);
    addTriangle(bottom, tail, right);

    const headTip = new THREE.Vector3(0, 0.015, -0.18);
    const headL = new THREE.Vector3(-0.01, 0.01, -0.12);
    const headR = new THREE.Vector3(0.01, 0.01, -0.12);
    addTriangle(headTip, headL, headR);
    addTriangle(headTip, headR, headL);

    const tailTip = new THREE.Vector3(0, 0.04, 0.18);
    const tailL = new THREE.Vector3(-0.01, 0, 0.12);
    const tailR = new THREE.Vector3(0.01, 0, 0.12);
    addTriangle(tailTip, tailL, tailR);
    addTriangle(tailTip, tailR, tailL);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    return geo;
}

function createWingGeometry(side: 'left' | 'right') {
    const vertices: number[] = [];
    const normals: number[] = [];
    const s = side === 'left' ? -1 : 1;

    const addTriangle = (a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3) => {
        const edge1 = new THREE.Vector3().subVectors(b, a);
        const edge2 = new THREE.Vector3().subVectors(c, a);
        const normal = new THREE.Vector3().crossVectors(edge1, edge2).normalize();
        vertices.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);
        normals.push(normal.x, normal.y, normal.z, normal.x, normal.y, normal.z, normal.x, normal.y, normal.z);
    };

    const root1 = new THREE.Vector3(0, 0, -0.04);
    const root2 = new THREE.Vector3(0, 0, 0.06);
    const tip = new THREE.Vector3(s * 0.14, 0.02, 0.01);
    addTriangle(root1, tip, root2);
    addTriangle(root1, root2, tip);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    return geo;
}

const GLITTER_COUNT = 30;

function GlitterTrail({ cranePos, active, flightProgress }: { cranePos: THREE.Vector3; active: boolean; flightProgress: number }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const wasActive = useRef(false);

    const particleData = useMemo(() => {
        return Array.from({ length: GLITTER_COUNT }, () => ({
            position: new THREE.Vector3(),
            velocity: new THREE.Vector3(),
            life: 0,
            maxLife: 0,
            scale: 0,
            delay: 0,
        }));
    }, []);

    const spawnTimer = useRef(0);
    const nextParticle = useRef(0);

    useFrame((_, delta) => {
        if (!meshRef.current) return;

        if (wasActive.current && !active) {
            for (let i = 0; i < GLITTER_COUNT; i++) {
                const p = particleData[i];
                if (p.maxLife > 0) {
                    const remaining = p.maxLife - p.life;
                    if (remaining > 0.3) {
                        p.maxLife = p.life + 0.3;
                    }
                }
            }
            wasActive.current = false;
        }
        if (active) wasActive.current = true;

        spawnTimer.current += delta;

        const spawnInterval = flightProgress > 0.8 ? 0.12 : 0.06;

        if (active && spawnTimer.current > spawnInterval) {
            spawnTimer.current = 0;
            const p = particleData[nextParticle.current % GLITTER_COUNT];
            p.position.copy(cranePos).add(
                new THREE.Vector3(
                    (Math.random() - 0.5) * 0.06,
                    (Math.random() - 0.5) * 0.06,
                    (Math.random() - 0.5) * 0.06
                )
            );
            p.velocity.set(
                (Math.random() - 0.5) * 0.2,
                Math.random() * 0.1 - 0.02,
                (Math.random() - 0.5) * 0.2
            );
            p.life = 0;
            p.maxLife = flightProgress > 0.7 ? 0.2 + Math.random() * 0.2 : 0.4 + Math.random() * 0.3;
            p.scale = 0.006 + Math.random() * 0.008;
            nextParticle.current++;
        }

        for (let i = 0; i < GLITTER_COUNT; i++) {
            const p = particleData[i];
            if (p.maxLife <= 0) {
                dummy.scale.setScalar(0);
                dummy.updateMatrix();
                meshRef.current.setMatrixAt(i, dummy.matrix);
                continue;
            }

            p.life += delta;
            if (p.life > p.maxLife) {
                p.maxLife = 0;
                dummy.scale.setScalar(0);
                dummy.updateMatrix();
                meshRef.current.setMatrixAt(i, dummy.matrix);
                continue;
            }

            p.position.add(p.velocity.clone().multiplyScalar(delta));
            p.velocity.y -= delta * 0.5;

            const lifeRatio = p.life / p.maxLife;
            const fadeScale = lifeRatio < 0.1 ? lifeRatio / 0.1 : 1 - Math.pow((lifeRatio - 0.1) / 0.9, 2);

            dummy.position.copy(p.position);
            dummy.scale.setScalar(p.scale * Math.max(fadeScale, 0));
            dummy.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        }

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, GLITTER_COUNT]}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
                color="#FFD700"
                emissive="#FFD700"
                emissiveIntensity={1.5}
                transparent
                opacity={0.8}
                roughness={0.1}
                metalness={0.8}
            />
        </instancedMesh>
    );
}

const DESK_SPOT = new THREE.Vector3(0.85, 1.07, 0.25);
const DESK_ROT = Math.PI * 0.75;
const ENTRY_POS = new THREE.Vector3(-3, 1.5, 2);
const ENTRY_DURATION = 4;
const LOOP_DURATION = 6;

function bezier3(t: number, p0: THREE.Vector3, p1: THREE.Vector3, p2: THREE.Vector3, p3: THREE.Vector3): THREE.Vector3 {
    const t1 = 1 - t;
    return new THREE.Vector3(
        t1 * t1 * t1 * p0.x + 3 * t1 * t1 * t * p1.x + 3 * t1 * t * t * p2.x + t * t * t * p3.x,
        t1 * t1 * t1 * p0.y + 3 * t1 * t1 * t * p1.y + 3 * t1 * t * t * p2.y + t * t * t * p3.y,
        t1 * t1 * t1 * p0.z + 3 * t1 * t1 * t * p1.z + 3 * t1 * t * t * p2.z + t * t * t * p3.z,
    );
}

function getLoopPosition(t: number, segments: { p0: THREE.Vector3; p1: THREE.Vector3; p2: THREE.Vector3; p3: THREE.Vector3 }[]): THREE.Vector3 {
    const n = segments.length;
    const scaled = t * n;
    const i = Math.min(Math.floor(scaled), n - 1);
    const local = scaled - i;
    return bezier3(local, segments[i].p0, segments[i].p1, segments[i].p2, segments[i].p3);
}

interface OrigamiCraneProps {
    visible: boolean;
}

type FlightMode = 'entry' | 'idle' | 'loop';

export default function OrigamiCrane({ visible }: OrigamiCraneProps) {
    const groupRef = useRef<THREE.Group>(null);
    const hitboxRef = useRef<THREE.Mesh>(null);
    const leftWingRef = useRef<THREE.Mesh>(null);
    const rightWingRef = useRef<THREE.Mesh>(null);
    const flightTime = useRef(0);
    const flightProgressRef = useRef(0);
    const [mode, setMode] = useState<FlightMode>('entry');
    const wasVisible = useRef(false);

    const entryCP1 = new THREE.Vector3(-1, 3.5, -1.5);
    const entryCP2 = new THREE.Vector3(2, 3, -1);

    const loopSegments = useMemo(() => [
        { p0: DESK_SPOT, p1: new THREE.Vector3(0.6, 1.8, 1.5), p2: new THREE.Vector3(0.0, 2.5, 3.0), p3: new THREE.Vector3(-1.5, 2.0, 2.5) },
        { p0: new THREE.Vector3(-1.5, 2.0, 2.5), p1: new THREE.Vector3(-2.5, 1.8, 2.2), p2: new THREE.Vector3(-3.0, 1.5, 2.0), p3: ENTRY_POS },
        { p0: ENTRY_POS, p1: new THREE.Vector3(-1, 3.5, -1.5), p2: new THREE.Vector3(2, 3, -1), p3: DESK_SPOT },
    ], []);

    const bodyGeo = useMemo(() => createCraneGeometry(), []);
    const leftWingGeo = useMemo(() => createWingGeometry('left'), []);
    const rightWingGeo = useMemo(() => createWingGeometry('right'), []);
    const craneWorldPos = useRef(new THREE.Vector3().copy(ENTRY_POS));

    const handleClick = () => {
        if (!visible || mode !== 'idle') return;
        flightTime.current = 0;
        flightProgressRef.current = 0;
        setMode('loop');
    };

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        if (visible && !wasVisible.current) {
            flightTime.current = 0;
            flightProgressRef.current = 0;
            craneWorldPos.current.copy(ENTRY_POS);
            setMode('entry');
        }
        wasVisible.current = visible;

        if (!visible) {
            groupRef.current.visible = false;
            return;
        }
        groupRef.current.visible = true;

        if (mode === 'entry') {
            flightTime.current += delta;
            const t = Math.min(flightTime.current / ENTRY_DURATION, 1);
            flightProgressRef.current = t;
            const eased = 1 - Math.pow(1 - t, 3);
            const pos = bezier3(eased, ENTRY_POS, entryCP1, entryCP2, DESK_SPOT);
            groupRef.current.position.copy(pos);
            craneWorldPos.current.copy(pos);

            if (t < 0.95) {
                const ne = 1 - Math.pow(1 - Math.min((flightTime.current + 0.05) / ENTRY_DURATION, 1), 3);
                const np = bezier3(ne, ENTRY_POS, entryCP1, entryCP2, DESK_SPOT);
                const dir = new THREE.Vector3().subVectors(np, pos).normalize();
                groupRef.current.rotation.y = Math.atan2(-dir.x, -dir.z);
                groupRef.current.rotation.z = -dir.x * 0.4;
                groupRef.current.rotation.x = dir.y * 0.3;
            }

            const w = Math.sin(state.clock.elapsedTime * 6) * 0.4;
            if (leftWingRef.current) leftWingRef.current.rotation.z = w;
            if (rightWingRef.current) rightWingRef.current.rotation.z = -w;

            if (t >= 1) {
                setMode('idle');
                groupRef.current.position.copy(DESK_SPOT);
                groupRef.current.rotation.set(0, DESK_ROT, 0);
            }
        } else if (mode === 'loop') {
            flightTime.current += delta;
            const t = Math.min(flightTime.current / LOOP_DURATION, 1);
            flightProgressRef.current = t;
            const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(1 - t, 3);
            const pos = getLoopPosition(eased, loopSegments);
            groupRef.current.position.copy(pos);
            craneWorldPos.current.copy(pos);

            if (t < 0.95) {
                const nt = Math.min((flightTime.current + 0.03) / LOOP_DURATION, 1);
                const ne = nt < 0.5 ? 2 * nt * nt : 1 - Math.pow(1 - nt, 3);
                const np = getLoopPosition(ne, loopSegments);
                const dir = new THREE.Vector3().subVectors(np, pos).normalize();
                groupRef.current.rotation.y = Math.atan2(-dir.x, -dir.z);
                groupRef.current.rotation.z = -dir.x * 0.5;
                groupRef.current.rotation.x = dir.y * 0.3;
            }

            const w = Math.sin(state.clock.elapsedTime * 7) * 0.45;
            if (leftWingRef.current) leftWingRef.current.rotation.z = w;
            if (rightWingRef.current) rightWingRef.current.rotation.z = -w;

            if (t >= 1) {
                setMode('idle');
                groupRef.current.position.copy(DESK_SPOT);
                groupRef.current.rotation.set(0, DESK_ROT, 0);
            }
        } else {
            groupRef.current.position.copy(DESK_SPOT);
            groupRef.current.rotation.y = DESK_ROT;
            groupRef.current.rotation.x = 0;
            groupRef.current.rotation.z = 0;

            const breathe = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
            if (leftWingRef.current) leftWingRef.current.rotation.z = breathe;
            if (rightWingRef.current) rightWingRef.current.rotation.z = -breathe;
        }

        if (hitboxRef.current) {
            hitboxRef.current.position.copy(groupRef.current.position);
        }
    });

    if (!visible) return null;

    return (
        <>
            <group ref={groupRef} scale={0.5}>
                <mesh geometry={bodyGeo} castShadow>
                    <meshStandardMaterial color={COLORS.cream} roughness={0.85} side={THREE.DoubleSide} />
                </mesh>
                <mesh ref={leftWingRef} geometry={leftWingGeo} castShadow>
                    <meshStandardMaterial color={COLORS.cream} roughness={0.85} side={THREE.DoubleSide} />
                </mesh>
                <mesh ref={rightWingRef} geometry={rightWingGeo} castShadow>
                    <meshStandardMaterial color={COLORS.cream} roughness={0.85} side={THREE.DoubleSide} />
                </mesh>
            </group>

            <mesh
                ref={hitboxRef}
                onClick={(e) => { e.stopPropagation(); handleClick(); }}
                onPointerEnter={(e) => { e.stopPropagation(); if (mode === 'idle') document.body.style.cursor = 'pointer'; }}
                onPointerLeave={(e) => { e.stopPropagation(); document.body.style.cursor = 'auto'; }}
            >
                <sphereGeometry args={[0.15, 8, 8]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>

            <GlitterTrail cranePos={craneWorldPos.current} active={visible && mode !== 'idle'} flightProgress={flightProgressRef.current} />
        </>
    );
}
