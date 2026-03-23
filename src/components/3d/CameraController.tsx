'use client';

import { SCENE_POSITIONS } from '@/utils/constants';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect } from 'react';

interface CameraControllerProps {
    isJournalOpen: boolean;
    isBookshelfOpen: boolean;
}

export default function CameraController({ isJournalOpen, isBookshelfOpen }: CameraControllerProps) {
    const { camera } = useThree();

    useEffect(() => {
        if (isJournalOpen) {
            const journalPos = SCENE_POSITIONS.notebook;
            gsap.to(camera.position, {
                x: journalPos[0],
                y: 1.88,
                z: journalPos[2] + 0.4,
                duration: 1.8,
                ease: 'power2.inOut',
            });
            gsap.to(camera.rotation, {
                x: -Math.PI / 2.8,
                y: 0,
                z: 0,
                duration: 1.8,
                ease: 'power2.inOut',
            });
        } else if (isBookshelfOpen) {
            const shelfPos = SCENE_POSITIONS.bookshelf;
            gsap.to(camera.position, {
                x: shelfPos[0] + 0.5,
                y: 2.8,
                z: 4.0,
                duration: 1.2,
                ease: 'power2.inOut',
            });
            gsap.to(camera.rotation, {
                x: -0.25,
                y: -0.1,
                z: 0,
                duration: 1.2,
                ease: 'power2.inOut',
            });
        } else {
            gsap.to(camera.position, {
                x: 0,
                y: 2.2,
                z: 3.2,
                duration: 1.0,
                ease: 'power2.inOut',
            });
            gsap.to(camera.rotation, {
                x: -0.3,
                y: 0,
                z: 0,
                duration: 1.0,
                ease: 'power2.inOut',
            });
        }
    }, [isJournalOpen, isBookshelfOpen, camera]);

    return null;
}
