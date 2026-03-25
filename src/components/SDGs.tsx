import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function SDGs() {
  const sdgs = useQuery(api.queries.getSDGs);
  const labelRef = useScrollReveal<HTMLSpanElement>();
  const titleRef = useScrollReveal<HTMLHeadingElement>();
  const subRef = useScrollReveal<HTMLParagraphElement>();

  if (!sdgs) return null;

  return (
    <section id="sdgs">
      <div className="container text-center">
        <span className="section-label reveal" ref={labelRef}>Global Alignment</span>
        <h2 className="section-title reveal" ref={titleRef}>United Nations SDGs</h2>
        <p className="section-subtitle reveal" ref={subRef}>
          Our work directly contributes to four of the UN's 17 Sustainable Development Goals, driving global progress from the ground up.
        </p>
        <div className="sdgs-grid">
          {sdgs.map((sdg, i) => (
            <div
              className={`sdg-card ${sdg.colorClass} reveal reveal-delay-${i + 1}`}
              key={sdg._id}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="sdg-number">#{sdg.number}</div>
              <h3>{sdg.title}</h3>
              <p>{sdg.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
