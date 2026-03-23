'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: (x?: number, y?: number) => void;
}

const THEME_STORAGE_KEY = 'theme';

const ThemeContext = createContext<ThemeContextType>({
    theme: 'dark',
    toggleTheme: () => { },
});

export function useTheme() {
    return useContext(ThemeContext);
}

function getInitialTheme(): Theme {
    if (typeof document === 'undefined') return 'dark';
    return document.documentElement.classList.contains('light') ? 'light' : 'dark';
}

function syncDocumentTheme(nextTheme: Theme) {
    document.documentElement.classList.toggle('light', nextTheme === 'light');
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);
    const overlayRef = useRef<HTMLDivElement>(null);
    const animatingRef = useRef(false);

    useEffect(() => {
        syncDocumentTheme(theme);
    }, [theme]);

    const applyTheme = (nextTheme: Theme) => {
        setTheme(nextTheme);
        try {
            window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
        } catch {
            // localStorage can be blocked in privacy mode, so we silently continue.
        }
        syncDocumentTheme(nextTheme);
    };

    const toggleTheme = (_x?: number, _y?: number) => {
        void _x;
        void _y;
        if (animatingRef.current) return;

        const next = theme === 'dark' ? 'light' : 'dark';
        const overlay = overlayRef.current;

        if (!overlay) {
            applyTheme(next);
            return;
        }

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            applyTheme(next);
            return;
        }

        animatingRef.current = true;
        overlay.getAnimations().forEach(a => a.cancel());

        overlay.style.backgroundColor = next === 'light' ? '#fafafa' : '#050505';
        overlay.style.opacity = '0';
        overlay.style.display = 'block';

        let switched = false;
        const applySwitch = () => {
            if (switched) return;
            switched = true;
            applyTheme(next);
        };

        const clearOverlay = () => {
            overlay.style.display = 'none';
            overlay.style.opacity = '';
            animatingRef.current = false;
        };

        const fadeInAnim = overlay.animate(
            [{ opacity: '0' }, { opacity: '1' }],
            { duration: 190, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' }
        );
        const switchTimer = window.setTimeout(applySwitch, 95);

        fadeInAnim.onfinish = () => {
            applySwitch();

            const fadeAnim = overlay.animate(
                [{ opacity: '1' }, { opacity: '0' }],
                { duration: 240, easing: 'ease-out', fill: 'forwards' }
            );

            fadeAnim.onfinish = () => {
                clearOverlay();
            };
            fadeAnim.oncancel = clearOverlay;
        };

        fadeInAnim.oncancel = () => {
            window.clearTimeout(switchTimer);
            clearOverlay();
        };
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
            <div
                ref={overlayRef}
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 60,
                    pointerEvents: 'none',
                    display: 'none',
                    willChange: 'opacity',
                }}
            />
        </ThemeContext.Provider>
    );
}
