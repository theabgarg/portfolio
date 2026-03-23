'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

interface InkBleedTransitionProps {
    isActive: boolean;
}

const FAREWELL_TEXT = "I hope you enjoyed my space";

export default function InkBleedTransition({ isActive }: InkBleedTransitionProps) {
    const router = useRouter();
    const [phase, setPhase] = useState<'idle' | 'expand' | 'text' | 'hold' | 'fadeOutText' | 'darken' | 'complete'>('idle');
    const [displayedText, setDisplayedText] = useState('');
    const [circleSize, setCircleSize] = useState(0);
    const [textOpacity, setTextOpacity] = useState(1);
    const [darkOverlayOpacity, setDarkOverlayOpacity] = useState(0);
    const [showCursor, setShowCursor] = useState(true);

    const letters = useMemo(() => FAREWELL_TEXT.split(''), []);

    useEffect(() => {
        if (!isActive) {
            setPhase('idle');
            setDisplayedText('');
            setCircleSize(0);
            setTextOpacity(1);
            setDarkOverlayOpacity(0);
            return;
        }

        setPhase('expand');
    }, [isActive]);

    useEffect(() => {
        if (phase !== 'text' && phase !== 'hold') return;

        const interval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 530);

        return () => clearInterval(interval);
    }, [phase]);

    useEffect(() => {
        if (phase !== 'expand') return;

        let startTime: number | null = null;
        let animationId: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const duration = 1500;
            const progress = Math.min(elapsed / duration, 1);

            const eased = 1 - Math.pow(1 - progress, 3);
            const size = eased * 250;

            setCircleSize(size);

            if (progress < 1) {
                animationId = requestAnimationFrame(animate);
            }
        };

        animationId = requestAnimationFrame(animate);

        const timer = setTimeout(() => setPhase('text'), 1600);

        return () => {
            cancelAnimationFrame(animationId);
            clearTimeout(timer);
        };
    }, [phase]);

    useEffect(() => {
        if (phase !== 'text') return;

        setDisplayedText('');
        let letterIndex = 0;

        const interval = setInterval(() => {
            if (letterIndex < letters.length) {
                setDisplayedText(letters.slice(0, letterIndex + 1).join(''));
                letterIndex++;
            } else {
                clearInterval(interval);
                setTimeout(() => setPhase('hold'), 600);
            }
        }, 80);

        return () => clearInterval(interval);
    }, [phase, letters]);

    useEffect(() => {
        if (phase !== 'hold') return;

        const timer = setTimeout(() => setPhase('fadeOutText'), 1200);
        return () => clearTimeout(timer);
    }, [phase]);

    useEffect(() => {
        if (phase !== 'fadeOutText') return;

        setShowCursor(false);

        let startTime: number | null = null;
        let animationId: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const duration = 800;
            const progress = Math.min(elapsed / duration, 1);

            const eased = 1 - Math.pow(1 - progress, 3);
            setTextOpacity(1 - eased);

            if (progress < 1) {
                animationId = requestAnimationFrame(animate);
            }
        };

        animationId = requestAnimationFrame(animate);

        const timer = setTimeout(() => setPhase('darken'), 900);

        return () => {
            cancelAnimationFrame(animationId);
            clearTimeout(timer);
        };
    }, [phase]);

    useEffect(() => {
        if (phase !== 'darken') return;

        let startTime: number | null = null;
        let animationId: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const duration = 600;
            const progress = Math.min(elapsed / duration, 1);

            const eased = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            setDarkOverlayOpacity(eased);

            if (progress < 1) {
                animationId = requestAnimationFrame(animate);
            }
        };

        animationId = requestAnimationFrame(animate);

        const timer = setTimeout(() => {
            setPhase('complete');
            router.push('/portfolio');
        }, 700);

        return () => {
            cancelAnimationFrame(animationId);
            clearTimeout(timer);
        };
    }, [phase, router]);

    if (!isActive && phase === 'idle') return null;

    const isExpanding = phase === 'expand';
    const showText = phase === 'text' || phase === 'hold' || phase === 'fadeOutText';
    const showDarkOverlay = phase === 'fadeOutText' || phase === 'darken' || phase === 'complete';

    return (
        <div className="fixed inset-0 z-[100] pointer-events-auto overflow-hidden">
            {isExpanding && (
                <div
                    className="absolute rounded-full bg-[#FFF8E7]"
                    style={{
                        width: `${circleSize}vmax`,
                        height: `${circleSize}vmax`,
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        boxShadow: circleSize > 10
                            ? '0 0 80px rgba(255, 248, 231, 0.6), 0 0 120px rgba(255, 248, 231, 0.3)'
                            : '0 0 20px rgba(255, 248, 231, 0.8)',
                    }}
                />
            )}

            {showText && (
                <div
                    className="absolute inset-0 bg-[#FFF8E7] flex items-center justify-center"
                    style={{ opacity: textOpacity }}
                >
                    <p
                        className="text-4xl md:text-5xl lg:text-6xl leading-relaxed text-center px-8"
                        style={{
                            fontFamily: "var(--font-dancing), 'Dancing Script', cursive",
                            color: '#2a1f0f',
                            textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        }}
                    >
                        {displayedText}
                        <span
                            style={{
                                display: 'inline-block',
                                width: '3px',
                                height: '0.8em',
                                backgroundColor: '#2a1f0f',
                                marginLeft: '4px',
                                verticalAlign: 'middle',
                                opacity: showCursor ? 1 : 0,
                                transition: 'opacity 0.1s ease',
                            }}
                        />
                    </p>
                </div>
            )}

            {showDarkOverlay && (
                <div
                    className="absolute inset-0 bg-[#0a0a0a]"
                    style={{
                        opacity: darkOverlayOpacity,
                    }}
                />
            )}
        </div>
    );
}
