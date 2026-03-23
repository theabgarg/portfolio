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

    const toggleTheme = (x?: number, y?: number) => {
        if (animatingRef.current) return;
        animatingRef.current = true;

        const next = theme === 'dark' ? 'light' : 'dark';
        const overlay = overlayRef.current;

        if (!overlay || x === undefined || y === undefined) {
            applyTheme(next);
            animatingRef.current = false;
            return;
        }

        overlay.getAnimations().forEach(a => a.cancel());

        const maxRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        overlay.style.backgroundColor = next === 'light' ? '#fafafa' : '#000000';
        overlay.style.opacity = '1';
        overlay.style.clipPath = `circle(0px at ${x}px ${y}px)`;
        overlay.style.display = 'block';
        void overlay.offsetHeight;

        let switched = false;
        const applySwitch = () => {
            if (switched) return;
            switched = true;
            applyTheme(next);
        };

        const expandAnim = overlay.animate(
            [
                { clipPath: `circle(0px at ${x}px ${y}px)` },
                { clipPath: `circle(${maxRadius}px at ${x}px ${y}px)` },
            ],
            { duration: 800, easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)' }
        );

        const switchTimer = window.setTimeout(applySwitch, 430);

        expandAnim.onfinish = () => {
            applySwitch();
            overlay.style.clipPath = `circle(${maxRadius}px at ${x}px ${y}px)`;

            const fadeAnim = overlay.animate(
                [{ opacity: '1' }, { opacity: '0' }],
                { duration: 200, easing: 'ease-out' }
            );

            fadeAnim.onfinish = () => {
                overlay.style.display = 'none';
                overlay.style.clipPath = '';
                overlay.style.opacity = '';
                animatingRef.current = false;
            };
        };

        expandAnim.oncancel = () => {
            window.clearTimeout(switchTimer);
            overlay.style.display = 'none';
            overlay.style.clipPath = '';
            overlay.style.opacity = '';
            animatingRef.current = false;
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
                }}
            />
        </ThemeContext.Provider>
    );
}
