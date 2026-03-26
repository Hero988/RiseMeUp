import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useScrollReveal } from "../hooks/useScrollReveal";

const iconMap: Record<string, React.ReactNode> = {
  zap: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  shield: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 22c6-3 10-9 10-15L12 2 2 7c0 6 4 12 10 15z" />
    </svg>
  ),
  briefcase: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      <path d="M12 12v4" />
    </svg>
  ),
  heart: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
  book: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
    </svg>
  ),
  layers: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
};

export default function Objectives() {
  const objectives = useQuery(api.queries.getObjectives);
  const labelRef = useScrollReveal<HTMLSpanElement>();
  const titleRef = useScrollReveal<HTMLHeadingElement>();
  const subRef = useScrollReveal<HTMLParagraphElement>();

  if (!objectives) return null;

  return (
    <section id="objectives">
      <div className="container text-center">
        <span className="section-label reveal" ref={labelRef}>Our Goals</span>
        <h2 className="section-title reveal" ref={titleRef}>Strategic Objectives</h2>
        <p className="section-subtitle reveal" ref={subRef}>
          Six core objectives guiding our mission to transform rural communities through sustainable agriculture.
        </p>
        <div className="objectives-grid">
          {objectives.map((obj, i) => (
            <div
              className={`obj-card reveal reveal-delay-${i + 1}`}
              key={obj._id}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="obj-card-inner">
                <div className="obj-card-front">
                  {obj.image ? (
                    <div className="obj-image">
                      <img src={obj.image} alt={obj.title} />
                    </div>
                  ) : (
                    <div className="obj-icon">
                      {iconMap[obj.iconName] ?? null}
                    </div>
                  )}
                  <h4>{obj.title}</h4>
                  <div className="obj-hint">Hover to learn more</div>
                </div>
                <div className="obj-card-back">
                  <div className="obj-back-icon">
                    {iconMap[obj.iconName] ?? null}
                  </div>
                  <h4>{obj.title}</h4>
                  <p>{obj.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
