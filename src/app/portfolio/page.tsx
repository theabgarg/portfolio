"use client";

import GitHubContributions from "@/components/GitHubContributions";
import SmoothScroll from "@/components/SmoothScroll";
import ThemeToggle from "@/components/ThemeToggle";
import { EDUCATION, EXPERIENCE, PROFILE, PROJECTS } from "@/data/profile";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  SiDocker,
  SiExpress,
  SiGit,
  SiGo,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { FaAws, FaGithub, FaLinkedin } from "react-icons/fa6";
import styles from "./page.module.css";

interface StackItem {
  icon: IconType;
  name: string;
  color: string;
}

const STACK_ITEMS: StackItem[] = [
  { icon: SiNextdotjs, name: "Next.js", color: "#f5f5f5" },
  { icon: SiReact, name: "React", color: "#61dafb" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178c6" },
  { icon: SiJavascript, name: "JavaScript", color: "#f7df1e" },
  { icon: SiNodedotjs, name: "Node.js", color: "#5fa04e" },
  { icon: SiExpress, name: "Express", color: "#bfbfbf" },
  { icon: SiTailwindcss, name: "Tailwind", color: "#38bdf8" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#336791" },
  { icon: SiMongodb, name: "MongoDB", color: "#47a248" },
  { icon: SiDocker, name: "Docker", color: "#2496ed" },
  { icon: SiRedis, name: "Redis", color: "#dc382d" },
  { icon: SiPrisma, name: "Prisma", color: "#9ca3af" },
  { icon: SiGit, name: "Git", color: "#f05032" },
  { icon: SiPython, name: "Python", color: "#3776ab" },
  { icon: FaAws, name: "AWS", color: "#ff9900" },
  { icon: SiGo, name: "Golang", color: "#00add8" },
];

export default function PortfolioPage() {
  const [views, setViews] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileMenuOpen]);

  useEffect(() => {
    async function updateViews() {
      try {
        const res = await fetch("/api/views", { method: "POST" });
        if (!res.ok) return;
        const data = (await res.json()) as { views?: number };
        if (typeof data.views === "number") setViews(data.views);
      } catch {
        setViews(null);
      }
    }
    updateViews();
  }, []);

  const socialPills = useMemo(() => {
    const links = [...PROFILE.socialLinks];
    links.push({ name: "Resume", url: PROFILE.resumeUrl });
    return links;
  }, []);

  return (
    <SmoothScroll>
      <div className={styles.pageRoot}>
        <header className={styles.navShell} ref={mobileMenuRef}>
          <nav className={`${styles.nav} ${styles.container}`}>
            <a href="#home" className={styles.brand}>
              {PROFILE.shortName}
              <span>.</span>
            </a>
            <ul className={styles.navLinks}>
              <li>
                <a
                  href="https://blog.theabgarg.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blog
                </a>
              </li>
              <li>
                <a href="#projects">Projects</a>
              </li>
              <li>
                <a href="#experience">Experience</a>
              </li>
            </ul>
            <div className={styles.navActions}>
              <ThemeToggle />
              <button
                className={styles.hamburger}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen((v) => !v)}
              >
                <span
                  className={mobileMenuOpen ? styles.barOpen1 : styles.bar}
                />
                <span
                  className={mobileMenuOpen ? styles.barOpen2 : styles.bar}
                />
                <span
                  className={mobileMenuOpen ? styles.barOpen3 : styles.bar}
                />
              </button>
            </div>
          </nav>
          {mobileMenuOpen && (
            <div className={styles.mobileMenu}>
              <a
                href="https://blog.theabgarg.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </a>
              <a href="#projects" onClick={() => setMobileMenuOpen(false)}>
                Projects
              </a>
              <a href="#experience" onClick={() => setMobileMenuOpen(false)}>
                Experience
              </a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </a>
            </div>
          )}
        </header>

        <main
          id="home"
          className={`${styles.page} ${styles.container}`}
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0px)" : "translateY(12px)",
            transition: "all 600ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <section className={styles.hero}>
            <div className={styles.avatarWrap}>
              <div className={styles.avatar}>
                <Image
                  src={PROFILE.avatar}
                  alt={`${PROFILE.name} avatar`}
                  width={256}
                  height={256}
                  priority
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
            </div>

            <div className={styles.intro}>
              <svg
                className={styles.signature}
                viewBox="0 0 420 100"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <text className={styles.sigText} x="10" y="82">
                  {PROFILE.shortName}
                </text>
              </svg>
              <p className={styles.subtitle}>
                Software Engineer · React · Next.js · Golang
              </p>
              <div className={styles.socialPills}>
                {socialPills.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    {social.name === "GitHub" && (
                      <FaGithub aria-hidden="true" />
                    )}
                    {social.name === "LinkedIn" && (
                      <FaLinkedin aria-hidden="true" />
                    )}
                    {social.name}
                  </a>
                ))}
              </div>
              {views !== null && (
                <p className={styles.liveCount}>
                  Views: {views.toLocaleString()}
                </p>
              )}
            </div>
          </section>

          <section id="about" className={styles.section}>
            <h2 className={styles.sectionTitle}>About</h2>
            <p className={styles.aboutLead}>{PROFILE.aboutIntro}</p>
            <p className={styles.aboutCopy}>{PROFILE.about[0]}</p>
            <div className={styles.aboutGrid}>
              <article className={styles.aboutCard}>
                <h3>How I work</h3>
                <p>
                  Keep things simple first, then scale with clean architecture,
                  measurable performance, and practical trade-offs.
                </p>
              </article>
              <article className={styles.aboutCard}>
                <h3>What matters to me</h3>
                <p>
                  Ownership, maintainable code, and products that are genuinely
                  useful in real production workflows.
                </p>
              </article>
            </div>
          </section>

          <section id="stack" className={styles.section}>
            <h2 className={styles.sectionTitle}>Tech Stack</h2>
            <p className={styles.muted}>
              Tools and technologies I use to ship products.
            </p>
            <div className={styles.stackMarquee}>
              <div className={styles.stackTrack}>
                {[...STACK_ITEMS, ...STACK_ITEMS].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <article
                      key={`${item.name}-${index}`}
                      className={styles.stackItem}
                    >
                      <div className={styles.stackIcon}>
                        <Icon style={{ color: item.color }} />
                      </div>
                      <span>{item.name}</span>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section id="contributions" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              GitHub Contributions @{PROFILE.githubUsername}
            </h2>
            <GitHubContributions username={PROFILE.githubUsername} />
          </section>

          <section id="projects" className={styles.section}>
            <h2 className={styles.sectionTitle}>Projects</h2>
            <p className={styles.muted}>
              Things I&apos;ve designed and shipped.
            </p>
            <div className={styles.projectList}>
              {PROJECTS.map((project) => (
                <article key={project.title} className={styles.projectCard}>
                  <div className={styles.projectHead}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <div className={styles.projectLinks}>
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} repository`}
                        >
                          <FaGithub aria-hidden="true" /> Repo
                        </a>
                      )}
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} live site`}
                        >
                          ↗ Live
                        </a>
                      )}
                    </div>
                  </div>
                  <p className={styles.desc}>{project.description}</p>
                  <div className={styles.projectTags}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="experience" className={styles.section}>
            <h2 className={styles.sectionTitle}>Experience</h2>
            <div className={styles.expList}>
              {EXPERIENCE.map((item) => (
                <article
                  key={`${item.company}-${item.period}`}
                  className={styles.expCard}
                >
                  <div className={styles.expHead}>
                    <div>
                      <h3 className={styles.expTitle}>
                        {item.title} at {item.company}
                      </h3>
                      <p className={styles.expSub}>
                        {item.location} • {item.type}
                      </p>
                    </div>
                    <span className={styles.period}>{item.period}</span>
                  </div>
                  {item.description && (
                    <p className={styles.desc}>{item.description}</p>
                  )}
                  <ul className={styles.resp}>
                    {item.responsibilities.map((responsibility) => (
                      <li key={responsibility}>{responsibility}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section id="education" className={styles.section}>
            <h2 className={styles.sectionTitle}>Education</h2>
            <div className={styles.expList}>
              {EDUCATION.map((item) => (
                <article key={item.institution} className={styles.expCard}>
                  <div className={styles.expHead}>
                    <div>
                      <h3 className={styles.expTitle}>{item.institution}</h3>
                      <p className={styles.expSub}>{item.degree}</p>
                    </div>
                    <span className={styles.period}>{item.period}</span>
                  </div>
                  {item.description && (
                    <p className={styles.desc}>{item.description}</p>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section id="contact" className={styles.section}>
            <h2 className={styles.sectionTitle}>Contact</h2>
            <p className={styles.muted}>
              If you reached here, let&apos;s connect and build something
              meaningful.
            </p>
            <div className={styles.contactButtons}>
              <a
                className={styles.cta}
                href={
                  PROFILE.socialLinks[1]?.url ?? PROFILE.socialLinks[0]?.url
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect on LinkedIn"
              >
                <FaLinkedin aria-hidden="true" />
                Connect on LinkedIn
              </a>
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
          <div className={`${styles.container} ${styles.footerInner}`}>
            <p className={styles.footerCopy}>Let&apos;s connect</p>
            <div className={styles.footerLinks}>
              {PROFILE.socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.name}
                </a>
              ))}
            </div>
            <p className={styles.footerCopy}>
              © {new Date().getFullYear()} {PROFILE.shortName}
            </p>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
