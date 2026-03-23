'use client';

import { motion } from 'framer-motion';

interface AudioControlsProps {
    isPlaying: boolean;
    onOpenPlayer: () => void;
}

export default function AudioControls({
    isPlaying,
    onOpenPlayer,
}: AudioControlsProps) {

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenPlayer}
            className="fixed bottom-6 left-6 z-40 flex items-center gap-3
                 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-4 py-3
                 shadow-xl shadow-black/40 text-white hover:bg-black/80 transition-colors"
        >
            <div className="flex items-center gap-1.5 opacity-80">
                {isPlaying ? (
                    <div className="flex gap-[2px] h-3 items-end">
                        <motion.div animate={{ height: ["4px", "10px", "4px"] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1.5 bg-[#F4D03F] rounded-t-sm" />
                        <motion.div animate={{ height: ["8px", "12px", "6px"] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-1.5 bg-[#F4D03F] rounded-t-sm" />
                        <motion.div animate={{ height: ["6px", "8px", "4px"] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 bg-[#F4D03F] rounded-t-sm" />
                    </div>
                ) : (
                    <svg className="w-4 h-4 text-[#F4D03F]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                )}
            </div>
            <span className="text-sm font-medium tracking-wide">
                {isPlaying ? 'Now Playing' : 'Music Player'}
            </span>
        </motion.button>
    );
}
