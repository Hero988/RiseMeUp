import { useState, useRef, useCallback, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useScrollReveal } from "../hooks/useScrollReveal";

const projectSVGs: Record<string, React.ReactNode> = {
  greenhouse: (
    <svg viewBox="0 0 80 80" fill="none" stroke="var(--terracotta)" strokeWidth="1.5">
      <path d="M15 55 L15 30 L40 15 L65 30 L65 55" strokeWidth="2" />
      <path d="M15 55 L65 55" strokeWidth="2" />
      <path d="M40 15 L40 55" strokeWidth="1" opacity="0.4" />
      <path d="M15 38 L65 38" strokeWidth="1" opacity="0.4" />
      <path d="M27 55 L27 42" strokeWidth="1.5" opacity="0.5" />
      <path d="M53 55 L53 42" strokeWidth="1.5" opacity="0.5" />
      <circle cx="27" cy="40" r="3" opacity="0.4" />
      <circle cx="53" cy="40" r="3" opacity="0.4" />
    </svg>
  ),
  packaging: (
    <svg viewBox="0 0 80 80" fill="none" stroke="var(--coral)" strokeWidth="1.5">
      <rect x="20" y="25" width="40" height="35" rx="3" strokeWidth="2" />
      <path d="M20 40 L60 40" strokeWidth="1.5" />
      <path d="M35 25 L35 40" strokeWidth="1" opacity="0.4" />
      <path d="M45 25 L45 40" strokeWidth="1" opacity="0.4" />
      <path d="M30 48 L50 48" strokeWidth="2" />
      <path d="M30 53 L45 53" strokeWidth="1.5" opacity="0.6" />
      <path d="M15 35 L20 35" strokeWidth="2" />
      <path d="M60 35 L65 35" strokeWidth="2" />
    </svg>
  ),
  poultry: (
    <svg viewBox="0 0 80 80" fill="none" stroke="var(--gold)" strokeWidth="1.5">
      <ellipse cx="40" cy="45" rx="18" ry="15" strokeWidth="2" />
      <circle cx="40" cy="28" r="10" strokeWidth="2" />
      <path d="M34 26 L32 22" strokeWidth="2" />
      <circle cx="37" cy="27" r="1.5" fill="var(--gold)" />
      <path d="M43 30 Q48 32 43 34" strokeWidth="1.5" />
      <path d="M25 50 L20 58" strokeWidth="2" />
      <path d="M55 50 L60 58" strokeWidth="2" />
    </svg>
  ),
};

const phaseLabels = ["Green Energy", "Horticulture", "Post-Harvest", "Food Security"];

export default function Projects() {
  const projects = useQuery(api.queries.getProjects);
  const labelRef = useScrollReveal<HTMLSpanElement>();
  const titleRef = useScrollReveal<HTMLHeadingElement>();
  const subRef = useScrollReveal<HTMLParagraphElement>();

  // Film strip
  const trackRef = useRef<HTMLDivElement>(null);
  const [stripOffset, setStripOffset] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startOffset = useRef(0);

  const getMaxOffset = useCallback(() => {
    if (!trackRef.current) return 0;
    const containerWidth = trackRef.current.parentElement?.clientWidth ?? 0;
    return Math.max(0, trackRef.current.scrollWidth - containerWidth);
  }, []);

  // Mouse drag
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      startX.current = e.clientX;
      startOffset.current = stripOffset;
      track.style.transition = "none";
      e.preventDefault();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const diff = startX.current - e.clientX;
      const max = getMaxOffset();
      const newOffset = Math.max(0, Math.min(max, startOffset.current + diff));
      setStripOffset(newOffset);
    };

    const onMouseUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        track.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
      }
    };

    // Touch events
    const onTouchStart = (e: TouchEvent) => {
      isDragging.current = true;
      startX.current = e.touches[0].clientX;
      startOffset.current = stripOffset;
      track.style.transition = "none";
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      const diff = startX.current - e.touches[0].clientX;
      const max = getMaxOffset();
      const newOffset = Math.max(0, Math.min(max, startOffset.current + diff));
      setStripOffset(newOffset);
    };

    const onTouchEnd = () => {
      isDragging.current = false;
      track.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
    };

    track.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchmove", onTouchMove, { passive: true });
    track.addEventListener("touchend", onTouchEnd);

    return () => {
      track.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchmove", onTouchMove);
      track.removeEventListener("touchend", onTouchEnd);
    };
  }, [stripOffset, getMaxOffset]);

  // Accordion
  const [activeAccordion, setActiveAccordion] = useState(0);

  const toggleAccordion = useCallback((index: number) => {
    setActiveAccordion((prev) => (prev === index ? -1 : index));
  }, []);

  if (!projects) return null;

  return (
    <section id="projects" className="dark-section">
      <div className="container">
        <span className="section-label reveal" ref={labelRef}>Our Work</span>
        <h2 className="section-title reveal" ref={titleRef} style={{ maxWidth: 600 }}>
          Four Phases of Transformation
        </h2>
        <p className="section-subtitle reveal" ref={subRef} style={{ marginLeft: 0, textAlign: "left" }}>
          Each phase builds on the last, creating a self-sustaining ecosystem that transforms lives in the Nuba Mountains.
        </p>
      </div>

      {/* Film strip (desktop) */}
      <div className="film-strip-wrapper">
        <div
          className="film-strip-track"
          ref={trackRef}
          style={{ transform: `translateX(${-stripOffset}px)` }}
        >
          {projects.map((project) => (
            <div className="project-card" key={project._id}>
              <div className="project-card-header">
                <div className="project-phase">Phase {project.phase}</div>
                <h4>{project.title}</h4>
              </div>
              <div className="project-card-visual">
                {project.imageType === "img" ? (
                  <img src={project.imageSrc} alt={project.title} />
                ) : (
                  projectSVGs[project.imageSrc] ?? null
                )}
              </div>
              <div className="project-card-body">
                <p>{project.description}</p>
                <div className="benefits">
                  {project.benefits.map((b) => (
                    <span className="benefit-tag" key={b}>{b}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accordion (mobile) */}
      <div className="project-accordion">
        <div className="accordion">
          {projects.map((project, i) => (
            <div className={`accordion-item${activeAccordion === i ? " active" : ""}`} key={project._id}>
              <div className="accordion-header" onClick={() => toggleAccordion(i)}>
                <div className={`accordion-phase phase-${project.phase}`}>P{project.phase}</div>
                <div className="accordion-header-text">
                  <h3>{project.title}</h3>
                  <span>Phase {project.phase} &mdash; {phaseLabels[project.phase - 1]}</span>
                </div>
                <div className="accordion-chevron">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                </div>
              </div>
              <div
                className="accordion-body"
                style={{ maxHeight: activeAccordion === i ? "500px" : "0" }}
              >
                <div className="accordion-body-inner">
                  {project.imageType === "img" && (
                    <img
                      src={project.imageSrc}
                      alt={project.title}
                      style={{ width: "100%", borderRadius: "var(--radius-sm)", marginBottom: 16, boxShadow: "var(--warm-shadow)" }}
                    />
                  )}
                  <p>{project.description}</p>
                  <div className="accordion-benefits">
                    {project.benefits.map((b) => (
                      <span className="accordion-benefit-tag" key={b}>{b}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <blockquote className="section-slogan section-slogan-light reveal">
        Together we can transform lives.
      </blockquote>
    </section>
  );
}
