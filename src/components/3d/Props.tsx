'use client';

import { SCENE_POSITIONS } from '@/utils/constants';

export default function Props() {
    return (
        <group>

            <group position={SCENE_POSITIONS.coffeeMug}>

                <mesh castShadow receiveShadow>
                    <cylinderGeometry args={[0.04, 0.035, 0.08, 16]} />
                    <meshStandardMaterial color="#FFF8E7" roughness={0.6} />
                </mesh>

                <mesh position={[0.045, -0.005, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
                    <torusGeometry args={[0.018, 0.005, 8, 16, Math.PI]} />
                    <meshStandardMaterial color="#FFF8E7" roughness={0.6} />
                </mesh>

                <mesh position={[0, 0.03, 0]}>
                    <cylinderGeometry args={[0.035, 0.035, 0.02, 16]} />
                    <meshStandardMaterial color="#3E2723" roughness={0.2} />
                </mesh>
            </group>


            <group position={SCENE_POSITIONS.pen} rotation={[0, 0.5, Math.PI / 2]}>
                <mesh castShadow>
                    <cylinderGeometry args={[0.008, 0.008, 0.15, 8]} />
                    <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.7} />
                </mesh>

                <mesh position={[0, -0.08, 0]} castShadow>
                    <coneGeometry args={[0.008, 0.02, 8]} />
                    <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.2} />
                </mesh>

                <mesh position={[0.01, 0.05, 0]} castShadow>
                    <boxGeometry args={[0.003, 0.04, 0.01]} />
                    <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.2} />
                </mesh>
            </group>


            <group position={[0.6, 0.52, -0.3]}>
                {[0, 0.002, 0.004, 0.006].map((y, i) => (
                    <mesh
                        key={i}
                        position={[0, y, 0]}
                        rotation={[0, (i * 0.1) - 0.15, 0]}
                        castShadow
                    >
                        <boxGeometry args={[0.08, 0.002, 0.08]} />
                        <meshStandardMaterial
                            color={['#FFE082', '#FFECB3', '#FFF59D', '#FFF176'][i]}
                            roughness={0.9}
                        />
                    </mesh>
                ))}
            </group>


            <group position={[-0.8, 0.52, 0.4]}>
                {[0, 0.02, 0.04].map((x, i) => (
                    <mesh
                        key={i}
                        position={[x, 0, 0]}
                        rotation={[Math.PI / 2, 0, 0.2 * i]}
                        castShadow
                    >
                        <torusGeometry args={[0.015, 0.002, 8, 16]} />
                        <meshStandardMaterial
                            color={['#C0C0C0', '#FFD700', '#FF6B6B'][i]}
                            metalness={0.9}
                            roughness={0.2}
                        />
                    </mesh>
                ))}
            </group>


            <group position={[-0.3, 0.52, -0.4]}>

                <mesh castShadow>
                    <cylinderGeometry args={[0.04, 0.03, 0.05, 16]} />
                    <meshStandardMaterial color="#D2691E" roughness={0.8} />
                </mesh>

                <mesh position={[0, 0.04, 0]} castShadow>
                    <dodecahedronGeometry args={[0.03]} />
                    <meshStandardMaterial color="#228B22" roughness={0.7} />
                </mesh>
            </group>
        </group>
    );
}
