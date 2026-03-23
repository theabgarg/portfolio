'use client';

import { useProgress } from '@react-three/drei';

export default function LoadingScreen() {
    const { progress, active } = useProgress();

    if (!active) return null;

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]">
            <div className="text-center">
                
                <div className="mb-8">
                    <svg
                        className="w-16 h-16 mx-auto text-[#F4D03F] animate-pulse"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 2C9.24 2 7 4.24 7 7c0 1.94 1.1 3.62 2.72 4.46L9 18h6l-.72-6.54C15.9 10.62 17 8.94 17 7c0-2.76-2.24-5-5-5zm0 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                        <path d="M9 20v1c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9z" />
                    </svg>
                </div>

                
                <h2 className="text-xl font-serif text-[#FFF8E7] mb-4">
                    Loading your workspace...
                </h2>

                
                <div className="w-64 h-1 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-[#F4D03F] to-[#FFB347] transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                
                <p className="mt-3 text-sm text-[#888] font-mono">
                    {Math.round(progress)}%
                </p>
            </div>

            
            <p className="absolute bottom-8 text-xs text-[#555] font-mono">
                Pull the lamp string to begin...
            </p>
        </div>
    );
}
