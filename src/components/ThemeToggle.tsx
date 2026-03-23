'use client';

import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const isLight = theme === 'light';

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        toggleTheme(x, y);
    };

    return (
        <button
            onClick={handleClick}
            type="button"
            className="group relative flex h-9 w-9 items-center justify-center rounded-[0.72rem] border border-theme-divider bg-theme-card/70 text-theme-secondary transition-all duration-200 ease-out hover:scale-[1.03] hover:bg-theme-card-hover hover:text-theme-primary active:scale-95"
            aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
            title={`Switch to ${isLight ? 'dark' : 'light'} mode`}
        >
            <span className="pointer-events-none absolute inset-0 rounded-[0.72rem] ring-1 ring-white/0 transition group-hover:ring-white/10" />
            <svg
                className={`absolute h-[18px] w-[18px] transition-all duration-300 ease-out will-change-transform ${isLight ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
                    }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
            >
                <circle cx="12" cy="12" r="4" />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-5.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 4.636"
                />
            </svg>
            <svg
                className={`absolute h-[18px] w-[18px] transition-all duration-300 ease-out will-change-transform ${isLight ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                    }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                />
            </svg>
        </button>
    );
}
