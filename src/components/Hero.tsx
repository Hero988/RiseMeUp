import { useEffect, useRef, useCallback } from "react";

interface HeroProps {
  onDonate: () => void;
}

// Text scramble effect
class TextScramble {
  el: HTMLElement;
  chars = "!<>-_\\/[]{}=+*^?#________";
  queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];
  frame = 0;
  frameRequest = 0;
  resolve: () => void = () => {};

  constructor(el: HTMLElement) {
    this.el = el;
    this.update = this.update.bind(this);
  }

  setText(newText: string) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise<void>((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = "";
    let complete = 0;
    for (let i = 0; i < this.queue.length; i++) {
      const item = this.queue[i];
      if (this.frame >= item.end) {
        complete++;
        output += item.to;
      } else if (this.frame >= item.start) {
        if (!item.char || Math.random() < 0.28) {
          item.char = this.chars[Math.floor(Math.random() * this.chars.length)];
        }
        output += `<span style="color:var(--gray);opacity:0.5">${item.char}</span>`;
      } else {
        output += item.from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
}

const headingLines = [
  { text: "Investing in", className: "" },
  { text: "Rural People", className: "line-terracotta" },
  { text: "is Investing in", className: "line-gold" },
  { text: "a Brighter Future.", className: "" },
];

export default function Hero({ onDonate }: HeroProps) {
  const scrambleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrambleRefs.current.forEach((el, i) => {
        if (!el) return;
        const fx = new TextScramble(el);
        el.innerText = "";
        setTimeout(() => fx.setText(headingLines[i].text), 300 + i * 400);
      });
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Parallax
  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        const content = heroContentRef.current;
        const bg = heroBgRef.current;
        if (content) {
          content.style.transform = `translateY(${scrollY * 0.15}px)`;
          content.style.opacity = String(
            1 - scrollY / (window.innerHeight * 0.9)
          );
        }
        if (bg) {
          bg.style.transform = `translateY(${scrollY * 0.08}px)`;
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToProjects = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const target = document.querySelector("#projects");
      if (target) {
        const offset =
          (document.getElementById("navbar")?.offsetHeight ?? 80) + 10;
        const top =
          target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    },
    []
  );

  return (
    <section id="hero" className="dark-section">
      <div className="hero-bg" ref={heroBgRef} aria-hidden="true">
        <div className="hero-grid-lines">
          {[10, 25, 50, 75, 90].map((pct) => (
            <div key={pct} className="line" style={{ left: `${pct}%` }} />
          ))}
        </div>
      </div>

      <div className="container hero-content" ref={heroContentRef}>
        <div className="hero-text">
          <div className="hero-badge">
            <span className="dot" aria-hidden="true" />
            Non-Profit Charity &middot; London, UK
          </div>
          <h1 className="hero-heading">
            {headingLines.map((line, i) => (
              <span key={i}>
                <span
                  className={`scramble-text ${line.className}`}
                  ref={(el) => { scrambleRefs.current[i] = el; }}
                  data-text={line.text}
                >
                  {line.text}
                </span>
                {i < headingLines.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="hero-sub">
            Supporting the Nuba Mountain community in Sudan through sustainable
            horticulture, farming, and green energy infrastructure across 130
            acres.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={onDonate}>
              Donate Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
            </button>
            <a href="#projects" className="btn-outline" onClick={scrollToProjects}>
              Our Projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-graphic">
            <div className="hero-graphic-main">
              <img src="/farmland-satellite.png" alt="130 acres farmland satellite view" className="hero-satellite-img" />
            </div>
            <div className="hero-float-card">
              <div className="card-icon green">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <div className="card-text">
                <strong>130 Acres</strong>
                <span>Farmland Development</span>
              </div>
            </div>
            <div className="hero-float-card">
              <div className="card-icon orange">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>
              </div>
              <div className="card-text">
                <strong>Community First</strong>
                <span>Nuba Mountains</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator" aria-hidden="true">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
