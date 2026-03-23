'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from './ThemeProvider';

interface ContributionDay {
    date: string;
    count: number;
    level: number;
}

interface ContributionWeek {
    days: ContributionDay[];
}

interface GitHubContributionsProps {
    username: string;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const GHCHART_BASE = 'https://ghchart.rshah.org';

function getLevelFromCount(count: number, maxCount: number): number {
    if (count <= 0 || maxCount <= 0) return 0;
    const ratio = count / maxCount;
    if (ratio <= 0.25) return 1;
    if (ratio <= 0.5) return 2;
    if (ratio <= 0.75) return 3;
    return 4;
}

function toIsoDate(date: Date): string {
    return date.toISOString().slice(0, 10);
}

function parseIsoDate(value: string): Date {
    return new Date(`${value}T00:00:00.000Z`);
}

function normalizeContributionDays(raw: unknown): ContributionDay[] {
    const candidate =
        (raw as { contributions?: unknown[] })?.contributions ??
        (raw as { data?: { contributions?: unknown[] } })?.data?.contributions ??
        (Array.isArray(raw) ? raw : []);

    if (!Array.isArray(candidate)) return [];

    const contributionMap = new Map<string, number>();

    for (const entry of candidate) {
        const day = entry as {
            date?: string;
            contributionDate?: string;
            count?: number;
            contributionCount?: number;
        };

        const rawDate = day.date ?? day.contributionDate;
        const rawCount = Number(day.count ?? day.contributionCount ?? 0);
        if (!rawDate || Number.isNaN(rawCount)) continue;

        const date = rawDate.slice(0, 10);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) continue;

        contributionMap.set(date, Math.max(rawCount, 0));
    }

    if (contributionMap.size === 0) return [];

    const sorted = [...contributionMap.entries()]
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([date, count]) => ({ date, count }));

    const maxCount = Math.max(...sorted.map((day) => day.count));
    return sorted.map((day) => ({
        ...day,
        level: getLevelFromCount(day.count, maxCount),
    }));
}

function toWeeks(days: ContributionDay[]): ContributionWeek[] {
    if (days.length === 0) return [];

    const firstDate = parseIsoDate(days[0].date);
    const lastDate = parseIsoDate(days[days.length - 1].date);

    const startDate = new Date(firstDate);
    startDate.setUTCDate(startDate.getUTCDate() - startDate.getUTCDay());

    const endDate = new Date(lastDate);
    endDate.setUTCDate(endDate.getUTCDate() + (6 - endDate.getUTCDay()));

    const dayMap = new Map(days.map((day) => [day.date, day]));
    const calendarDays: ContributionDay[] = [];

    for (const cursor = new Date(startDate); cursor <= endDate; cursor.setUTCDate(cursor.getUTCDate() + 1)) {
        const key = toIsoDate(cursor);
        calendarDays.push(dayMap.get(key) ?? { date: key, count: 0, level: 0 });
    }

    const weeks: ContributionWeek[] = [];
    for (let index = 0; index < calendarDays.length; index += 7) {
        weeks.push({ days: calendarDays.slice(index, index + 7) });
    }

    return weeks;
}

export default function GitHubContributions({ username }: GitHubContributionsProps) {
    const [contributions, setContributions] = useState<ContributionWeek[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalContributions, setTotalContributions] = useState(0);
    const [year, setYear] = useState(new Date().getFullYear());
    const [showImageFallback, setShowImageFallback] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const controller = new AbortController();
        let active = true;

        async function fetchContributions() {
            setLoading(true);
            try {
                const primaryResponse = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
                    signal: controller.signal,
                });

                let normalizedDays: ContributionDay[] = [];

                if (primaryResponse.ok) {
                    const primaryData = await primaryResponse.json();
                    normalizedDays = normalizeContributionDays(primaryData);
                }

                if (normalizedDays.length === 0) {
                    const secondaryResponse = await fetch(`https://github-contributions-api.deno.dev/${username}.json`, {
                        signal: controller.signal,
                    });

                    if (secondaryResponse.ok) {
                        const secondaryData = await secondaryResponse.json();
                        normalizedDays = normalizeContributionDays(secondaryData);
                    }
                }

                if (!active) return;

                if (normalizedDays.length > 0) {
                    const weeks = toWeeks(normalizedDays);
                    const calculatedTotal = normalizedDays.reduce((sum, day) => sum + day.count, 0);
                    const lastDay = normalizedDays[normalizedDays.length - 1];

                    setContributions(weeks);
                    setTotalContributions(calculatedTotal);
                    setYear(lastDay ? parseIsoDate(lastDay.date).getUTCFullYear() : new Date().getUTCFullYear());
                    setShowImageFallback(false);
                } else {
                    setContributions([]);
                    setTotalContributions(0);
                    setShowImageFallback(true);
                }
            } catch {
                if (!active) return;
                setContributions([]);
                setTotalContributions(0);
                setShowImageFallback(true);
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        fetchContributions();

        return () => {
            active = false;
            controller.abort();
        };
    }, [username]);

    useEffect(() => {
        if (!loading && scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        }
    }, [loading]);

    const monthLabels = useMemo(() => {
        if (contributions.length === 0) return [];

        const labels: { month: string; position: number }[] = [];
        let lastMonth = -1;

        contributions.forEach((week, weekIndex) => {
            const date = week.days[0]?.date;
            if (!date) return;

            const month = parseIsoDate(date).getUTCMonth();
            if (month !== lastMonth) {
                labels.push({ month: MONTHS[month], position: weekIndex });
                lastMonth = month;
            }
        });

        return labels;
    }, [contributions]);

    const getLevelColor = (level: number) => {
        if (theme === 'light') {
            switch (level) {
                case 0: return 'bg-[#e9edf3]';
                case 1: return 'bg-[#c9d2df]';
                case 2: return 'bg-[#8ea1ba]';
                case 3: return 'bg-[#5f7ca2]';
                case 4: return 'bg-[#274d80]';
                default: return 'bg-[#e9edf3]';
            }
        }

        switch (level) {
            case 0: return 'bg-[#191e27]';
            case 1: return 'bg-[#2f4057]';
            case 2: return 'bg-[#446184]';
            case 3: return 'bg-[#5f84ae]';
            case 4: return 'bg-[#8eb6e4]';
            default: return 'bg-[#191e27]';
        }
    };

    const tileSize = 11;
    const tileGap = 3;
    const totalWeeks = contributions.length;
    const fallbackImage = `${GHCHART_BASE}/${theme === 'light' ? '334155' : '94a3b8'}/${encodeURIComponent(username)}`;

    if (loading) {
        return (
            <div className="rounded-xl border border-theme-divider bg-theme-card p-4">
                <div className="animate-pulse">
                    <div className="mb-3 h-4 w-1/2 rounded bg-theme-card-hover" />
                    <div className="h-24 rounded bg-theme-card" />
                </div>
            </div>
        );
    }

    if (showImageFallback || contributions.length === 0) {
        return (
            <div id="github-contributions" className="rounded-xl border border-theme-divider bg-theme-card p-4">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-theme-primary">GitHub: @{username}</p>
                    <a
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-theme-secondary transition-colors hover:text-theme-primary"
                    >
                        github.com/{username}
                    </a>
                </div>
                <img src={fallbackImage} alt={`${username} contribution graph`} className="w-full rounded-md border border-theme-divider bg-black/10" />
            </div>
        );
    }

    return (
        <div id="github-contributions" className="rounded-xl border border-theme-divider bg-theme-card p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-theme-primary">GitHub: @{username}</p>
                <p className="text-xs text-theme-muted">{totalContributions.toLocaleString()} contributions in {year}</p>
            </div>
            <div
                ref={scrollContainerRef}
                className="overflow-x-auto scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <div className="flex min-w-max flex-col items-start">
                    <div className="mb-2 flex text-[11px] text-theme-muted" style={{ gap: `${tileGap}px` }}>
                        {monthLabels.map((label, index) => {
                            const nextLabelPos = monthLabels[index + 1]?.position ?? totalWeeks;
                            const weekSpan = nextLabelPos - label.position;
                            const width = weekSpan * tileSize + (weekSpan - 1) * tileGap;
                            const showLabel = index > 0 || width >= 26;

                            return (
                                <div key={`${label.month}-${label.position}`} style={{ width: `${width}px`, minWidth: `${width}px` }} className="text-left">
                                    {showLabel ? label.month : ''}
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex" style={{ gap: `${tileGap}px` }}>
                        {contributions.map((week, weekIndex) => (
                            <div key={weekIndex} className="flex flex-col" style={{ gap: `${tileGap}px` }}>
                                {week.days.map((day, dayIndex) => (
                                    <div
                                        key={`${day.date}-${dayIndex}`}
                                        title={`${day.count} contributions on ${day.date}`}
                                        style={{ width: `${tileSize}px`, height: `${tileSize}px` }}
                                        className={`rounded-[3px] ${getLevelColor(day.level)} transition-all duration-150 hover:scale-125`}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-theme-muted">
                <span>Less</span>
                <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map((level) => (
                        <span
                            key={level}
                            className={`inline-block h-2.5 w-2.5 rounded-[3px] ${getLevelColor(level)}`}
                        />
                    ))}
                </div>
                <span>More</span>
            </div>
        </div>
    );
}
