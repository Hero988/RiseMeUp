import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface ServicesProps {
  onDonate: () => void;
}

const serviceIconMap: Record<string, React.ReactNode> = {
  dollar: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--coral-light)" strokeWidth="2" strokeLinecap="round">
      <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  ),
  book: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--coral-light)" strokeWidth="2" strokeLinecap="round">
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
    </svg>
  ),
  settings: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--coral-light)" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  ),
};

export default function Services({ onDonate }: ServicesProps) {
  const services = useQuery(api.queries.getServices);
  const labelRef = useScrollReveal<HTMLSpanElement>();
  const titleRef = useScrollReveal<HTMLHeadingElement>();
  const subRef = useScrollReveal<HTMLParagraphElement>();
  const ctaRef = useScrollReveal<HTMLDivElement>();

  if (!services) return null;

  return (
    <section id="services" className="dark-section">
      <div className="container text-center">
        <span className="section-label reveal" ref={labelRef}>Get Involved</span>
        <h2 className="section-title reveal" ref={titleRef}>How We Work Together</h2>
        <p className="section-subtitle reveal" ref={subRef}>
          Our comprehensive approach covers every aspect of sustainable development, from initial investment to ongoing operations.
        </p>
        <div className="services-grid">
          {services.map((service, i) => (
            <div
              className={`service-card reveal reveal-delay-${i + 1}`}
              key={service._id}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="service-icon">
                {serviceIconMap[service.iconName] ?? null}
              </div>
              <h4>{service.title}</h4>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
        <div className="services-cta reveal" ref={ctaRef}>
          <h3>Ready to Make a Difference?</h3>
          <p>Your contribution helps us build a sustainable future for the Nuba Mountain community.</p>
          <button className="btn-primary" onClick={onDonate}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
            Donate Today
          </button>
        </div>
      </div>
    </section>
  );
}
