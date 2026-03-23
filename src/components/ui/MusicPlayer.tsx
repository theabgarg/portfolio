'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { IoPauseSharp, IoPlaySharp } from 'react-icons/io5';



interface MusicPlayerProps {
    isOpen: boolean;
    onClose: () => void;
    isPlaying: boolean;
    onTogglePlay: () => void;
}



export default function MusicPlayer({
    isOpen,
    onClose,
    isPlaying,
    onTogglePlay,
}: MusicPlayerProps) {


    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ y: '100%', opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: '100%', opacity: 0, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed bottom-0 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[420px] 
                               bg-[#151515]/90 backdrop-blur-2xl md:rounded-3xl rounded-t-3xl border border-white/10 
                               shadow-2xl shadow-black/50 overflow-hidden flex flex-col"
                    >
                        <div className="flex justify-between items-center p-5 pb-0">
                            <div className="w-10" />
                            <div className="w-12 h-1.5 bg-white/20 rounded-full" />
                            <button
                                onClick={onClose}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/15 
                                         text-white/60 hover:text-white transition-colors"
                            >
                                <FiX size={18} />
                            </button>
                        </div>

                        <div className="p-6 md:p-8 flex flex-col gap-8 h-full">
                            <div className="relative aspect-square w-full max-w-[280px] mx-auto rounded-2xl overflow-hidden shadow-2xl bg-[#0a0a0a] border border-white/5 flex items-center justify-center group">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#F4D03F]/20 to-[#8B4513]/40" />
                                <motion.div
                                    animate={{ rotate: isPlaying ? 360 : 0 }}
                                    transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                                    className="relative w-48 h-48 rounded-full border-[12px] border-[#111] bg-[#1a1a1a] flex items-center justify-center shadow-inner"
                                >
                                    <div className="absolute inset-2 rounded-full border border-white/5" />
                                    <div className="absolute inset-6 rounded-full border border-white/5" />
                                    <div className="absolute inset-10 rounded-full border border-white/5" />
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#F4D03F] to-[#FFB347] flex items-center justify-center shadow-md">
                                        <div className="w-2 h-2 rounded-full bg-black/80" />
                                    </div>
                                </motion.div>
                            </div>

                            <div className="flex flex-col items-center gap-6 mt-4 pb-8">
                                <div className="flex flex-col items-center text-center gap-2">
                                    <h2 className="text-xl font-semibold text-white tracking-tight leading-tight select-none font-sans" style={{ fontFamily: "var(--font-geist-mono), sans-serif" }}>
                                        i&apos;ll be adding my playlist here soon :D
                                    </h2>
                                </div>

                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={onTogglePlay}
                                    className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-xl shadow-white/10 hover:scale-105 transition-all mt-4"
                                >
                                    {isPlaying ? <IoPauseSharp size={32} /> : <IoPlaySharp size={32} className="ml-1" />}
                                </motion.button>
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
