"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface OnboardingGuideProps {
  step: "landing" | "lamp" | "hints" | null;
  onEnterSpace: () => void;
  onHintsDone: () => void;
}

export default function OnboardingGuide({
  step,
  onEnterSpace,
  onHintsDone,
}: OnboardingGuideProps) {
  const [visible, setVisible] = useState(false);
  const [hintsVisible, setHintsVisible] = useState(false);
  const [hintsFading, setHintsFading] = useState(false);
  const [dismissedHints, setDismissedHints] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (step === "landing" || step === "lamp") {
      const t = setTimeout(() => setVisible(true), 100);
      return () => clearTimeout(t);
    }
    if (step === "hints") {
      setVisible(false);
      setHintsFading(false);
      const t = setTimeout(() => setHintsVisible(true), 400);
      return () => clearTimeout(t);
    }
    setVisible(false);
    setHintsVisible(false);
    setHintsFading(false);
  }, [step]);

  useEffect(() => {
    if (step !== "hints" || !hintsVisible) return;
    const timeout = setTimeout(() => {
      setHintsFading(true);
      setTimeout(onHintsDone, 1000);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [step, hintsVisible, onHintsDone]);

  useEffect(() => {
    if (dismissedHints.size >= 3) {
      setHintsFading(true);
      setTimeout(onHintsDone, 1000);
    }
  }, [dismissedHints, onHintsDone]);

  const dismissHint = (id: string) => {
    setDismissedHints((prev) => new Set(prev).add(id));
  };

  if (step === "landing") {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(10,10,10,0.92) 0%, rgba(0,0,0,0.98) 100%)",
          opacity: visible ? 1 : 0,
        }}
      >
        <div className="text-center max-w-md px-8">
          <div className="mb-8 relative">
            <div className="relative w-24 h-24 mx-auto">
              <img
                src="/images/avatar.jpg"
                alt="Abhishek"
                className="w-24 h-24 rounded-full object-cover border-2 border-white/20"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-pulse" />
            </div>
          </div>

          <h2
            className="text-2xl mb-3"
            style={{
              fontFamily: "var(--font-dancing), 'Dancing Script', cursive",
              color: "#FFF8E7",
              letterSpacing: "0.02em",
            }}
          >
            hey, welcome to my space
          </h2>

          <p className="text-[#666] text-sm mb-10 font-mono">
            what would you like to do?
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setVisible(false);
                setTimeout(onEnterSpace, 400);
              }}
              className="px-7 py-3 rounded-xl text-sm font-medium transition-all duration-300"
              style={{
                background:
                  "linear-gradient(135deg, rgba(244, 208, 63, 0.15) 0%, rgba(255, 179, 71, 0.1) 100%)",
                border: "1px solid rgba(244, 208, 63, 0.3)",
                color: "#F4D03F",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(244, 208, 63, 0.25) 0%, rgba(255, 179, 71, 0.18) 100%)";
                e.currentTarget.style.borderColor = "rgba(244, 208, 63, 0.5)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(244, 208, 63, 0.15) 0%, rgba(255, 179, 71, 0.1) 100%)";
                e.currentTarget.style.borderColor = "rgba(244, 208, 63, 0.3)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              explore my space
            </button>

            <Link
              href="/"
              className="px-7 py-3 rounded-xl text-sm font-medium transition-all duration-300 no-underline"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#aaa",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                e.currentTarget.style.color = "#ddd";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                e.currentTarget.style.color = "#aaa";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              view portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (step === "lamp") {
    return (
      <div
        className="fixed inset-0 z-40 flex items-end justify-center pb-32 pointer-events-none transition-opacity duration-500"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <div className="text-center pointer-events-none">
          <p
            className="text-sm animate-pulse"
            style={{
              color: "rgba(244, 208, 63, 0.7)",
              fontFamily: "var(--font-dancing), 'Dancing Script', cursive",
              fontSize: "18px",
              letterSpacing: "0.02em",
              textShadow: "0 0 20px rgba(244, 208, 63, 0.3)",
            }}
          >
            click the lamp to light up the room
          </p>
        </div>
      </div>
    );
  }

  if (step === "hints" && hintsVisible) {
    const hints = [
      {
        id: "bookshelf",
        label: "what i'm reading nowadays",
        top: "28%",
        left: "45%",
        translateX: "-50%",
      },
      {
        id: "journal",
        label: "my portfolio",
        top: "48%",
        left: "50%",
        translateX: "-50%",
      },
      {
        id: "vinyl",
        label: "play some music",
        top: "45%",
        left: "28%",
        translateX: "-50%",
      },
    ];

    return (
      <div
        className="fixed inset-0 z-40 pointer-events-none transition-opacity duration-[1000ms]"
        style={{ opacity: hintsFading ? 0 : 1 }}
      >
        {hints.map(
          (hint, i) =>
            !dismissedHints.has(hint.id) && (
              <div
                key={hint.id}
                className="absolute pointer-events-auto cursor-pointer transition-all duration-[600ms]"
                style={{
                  top: hint.top,
                  left: hint.left,
                  transform: `translateX(${hint.translateX})`,
                  animation: hintsVisible
                    ? `bookFadeIn 2s ease-out ${0.2 + i * 0.3}s both`
                    : "none",
                }}
                onClick={() => dismissHint(hint.id)}
              >
                <div
                  className="relative px-4 py-2.5 rounded-xl"
                  style={{
                    background: "rgba(0, 0, 0, 0.75)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(244, 208, 63, 0.2)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                  }}
                >
                  <p
                    className="text-sm whitespace-nowrap"
                    style={{
                      fontFamily:
                        "var(--font-dancing), 'Dancing Script', cursive",
                      color: "rgba(244, 208, 63, 0.85)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {hint.label}
                  </p>
                  <div
                    className="absolute -bottom-2.5 left-1/2 -translate-x-1/2"
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: "5px solid transparent",
                      borderRight: "5px solid transparent",
                      borderTop: "6px solid rgba(0, 0, 0, 0.75)",
                    }}
                  />
                </div>
              </div>
            ),
        )}
      </div>
    );
  }

  return null;
}
