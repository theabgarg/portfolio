'use client';

import { currentlyReading } from '@/data/books';
import { useEffect, useState } from 'react';

interface BookViewerProps {
    isOpen: boolean;
    onClose: () => void;
}

function BookCard({ book, index, delayBase }: { book: { title: string; author: string; genre: string; cover: string; goodreadsUrl: string }; index: number; delayBase: number }) {
    return (
        <a
            href={book.goodreadsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/book flex flex-col items-center no-underline"
            style={{
                animation: `bookFadeIn 0.4s ease-out ${delayBase + index * 0.1}s both`,
                textDecoration: 'none',
            }}
        >
            <div
                className="w-[78px] h-[112px] rounded overflow-hidden transition-transform duration-200 group-hover/book:scale-105 group-hover/book:-translate-y-1 relative"
                style={{
                    boxShadow: '4px 4px 14px rgba(0,0,0,0.3), -1px -1px 4px rgba(255,255,255,0.12)',
                }}
            >
                <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover"
                />
            </div>
            <p
                className="text-center"
                style={{
                    color: '#777',
                    maxWidth: '86px',
                    marginTop: '7px',
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    lineHeight: 1.3,
                    fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
                }}
            >
                {book.author}
            </p>
        </a>
    );
}

export default function BookViewer({ isOpen, onClose }: BookViewerProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setVisible(true));
            });
        } else {
            setVisible(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-start"
            onClick={onClose}
        >
            <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                    background: 'radial-gradient(ellipse at 30% 50%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.75) 100%)',
                    opacity: visible ? 1 : 0,
                }}
            />

            <div
                className="relative ml-8 md:ml-16 lg:ml-24 max-w-md w-full transition-all duration-500 ease-out"
                style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateX(0) scale(1)' : 'translateX(-30px) scale(0.95)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="relative rounded-2xl px-8 py-7 overflow-hidden"
                    style={{
                        background: 'linear-gradient(145deg, #FFF8E7 0%, #F5E6C8 40%, #EDD9B3 100%)',
                        boxShadow: `
                            0 8px 40px rgba(0, 0, 0, 0.25),
                            0 0 40px rgba(244, 208, 63, 0.12),
                            0 24px 70px rgba(0, 0, 0, 0.35),
                            inset 0 1px 0 rgba(255, 255, 255, 0.5),
                            inset 0 -1px 0 rgba(0, 0, 0, 0.05)
                        `,
                        border: '1px solid rgba(180, 150, 100, 0.3)',
                    }}
                >
                    <div
                        className="absolute inset-0 pointer-events-none opacity-20"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
                        }}
                    />

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full transition-all duration-150 z-10"
                        style={{ color: '#8B7355' }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.06)';
                            e.currentTarget.style.color = '#5D4037';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#8B7355';
                        }}
                    >
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M2 2L12 12M12 2L2 12" />
                        </svg>
                    </button>


                    <div className="relative z-[1]">
                        <h3
                            style={{
                                fontFamily: "var(--font-dancing), 'Dancing Script', cursive",
                                color: '#3E2723',
                                fontSize: '22px',
                                letterSpacing: '0.02em',
                                lineHeight: 1.6,
                                marginBottom: '10px',
                            }}
                        >
                            reading nowadays:
                        </h3>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(86px, 1fr))',
                                gap: '16px',
                            }}
                        >
                            {currentlyReading.map((book, i) => (
                                <BookCard key={i} book={book} index={i} delayBase={0.1} />
                            ))}
                        </div>

                        <p
                            style={{
                                fontFamily: "var(--font-dancing), 'Dancing Script', cursive",
                                color: '#8D6E63',
                                fontSize: '15px',
                                lineHeight: 1.6,
                                marginTop: '24px',
                                paddingTop: '16px',
                                borderTop: '1px solid rgba(0,0,0,0.08)',
                                animation: 'bookFadeIn 0.4s ease-out 0.5s both',
                            }}
                        >
                            i&apos;ll be adding the books i&apos;ve read here soon :D
                        </p>
                    </div>

                    <div className="absolute top-2.5 left-2.5 w-5 h-5 border-t border-l opacity-15" style={{ borderColor: '#8B7355' }} />
                    <div className="absolute top-2.5 right-2.5 w-5 h-5 border-t border-r opacity-15" style={{ borderColor: '#8B7355' }} />
                    <div className="absolute bottom-2.5 left-2.5 w-5 h-5 border-b border-l opacity-15" style={{ borderColor: '#8B7355' }} />
                    <div className="absolute bottom-2.5 right-2.5 w-5 h-5 border-b border-r opacity-15" style={{ borderColor: '#8B7355' }} />
                </div>
            </div>
        </div>
    );
}
