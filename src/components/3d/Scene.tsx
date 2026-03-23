'use client';

import Bookshelf from './Bookshelf';
import CameraController from './CameraController';
import Desk from './Desk';
import DeskLamp from './DeskLamp';
import Effects from './Effects';
import GlowingStars from './GlowingStars';
import Lighting from './Lighting';
import Notebook from './Notebook';
import OrigamiCrane from './OrigamiCrane';
import Props from './Props';
import VinylPlayer from './VinylPlayer';

interface SceneProps {
    lampOn: boolean;
    onLampPull: () => void;
    notebookOpen: boolean;
    onNotebookOpen: () => void;
    currentPage: number;
    isPlaying: boolean;
    onOpenPlayer: () => void;
    onBookshelfClick: () => void;
    isBookshelfOpen: boolean;
    isOnboarding: boolean;
}

export default function Scene({
    lampOn,
    onLampPull,
    notebookOpen,
    onNotebookOpen,
    currentPage,
    isPlaying,
    onOpenPlayer,
    onBookshelfClick,
    isBookshelfOpen,
    isOnboarding,
}: SceneProps) {
    return (
        <>
            <CameraController isJournalOpen={notebookOpen} isBookshelfOpen={isBookshelfOpen} />

            <Lighting lampOn={lampOn} />

            <Effects lampOn={lampOn} />

            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0, 0]}
                receiveShadow
            >
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#1a1512" />
            </mesh>

            <Desk />
            <DeskLamp onPull={onLampPull} lampOn={lampOn} isOnboarding={isOnboarding} />
            <Notebook
                isOpen={notebookOpen}
                onOpen={onNotebookOpen}
                lampOn={lampOn}
                currentPage={currentPage}
                isOnboarding={isOnboarding}
            />
            <GlowingStars visible={true} />
            <VinylPlayer isPlaying={isPlaying} onOpenPlayer={onOpenPlayer} lampOn={lampOn} isOnboarding={isOnboarding} />
            <Bookshelf lampOn={lampOn} isBookshelfOpen={isBookshelfOpen} onBookshelfClick={onBookshelfClick} isOnboarding={isOnboarding} />
            <Props />
            <OrigamiCrane visible={lampOn && !notebookOpen} />
        </>
    );
}
