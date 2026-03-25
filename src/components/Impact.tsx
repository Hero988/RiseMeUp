import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useCountUp } from "../hooks/useCountUp";

function StatCard({
  target,
  suffix,
  label,
  isDecimal,
  delay,
}: {
  target: number;
  suffix: string;
  label: string;
  isDecimal: boolean;
  delay: number;
}) {
  const { ref, display } = useCountUp(target, suffix, isDecimal);

  return (
    <div
      className={`stat-card reveal reveal-delay-${delay}`}
      style={{ transitionDelay: `${(delay - 1) * 100}ms` }}
    >
      <div className="stat-number" ref={ref}>
        {display}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function Impact() {
  const stats = useQuery(api.queries.getStats);
  const labelRef = useScrollReveal<HTMLSpanElement>();
  const titleRef = useScrollReveal<HTMLHeadingElement>();
  const subRef = useScrollReveal<HTMLParagraphElement>();

  if (!stats) return null;

  return (
    <section id="impact" className="dark-section">
      <div className="container text-center">
        <span
          className="section-label reveal"
          ref={labelRef}
          style={{ color: "var(--coral-light)" }}
        >
          Our Impact
        </span>
        <h2 className="section-title reveal" ref={titleRef}>
          Numbers That Tell Our Story
        </h2>
        <p className="section-subtitle reveal" ref={subRef} style={{ marginBottom: 48 }}>
          Agriculture investment is 11 times more effective at reducing poverty than any other sector.
        </p>
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <StatCard
              key={stat._id}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
              isDecimal={stat.isDecimal}
              delay={i + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
