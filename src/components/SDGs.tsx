import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function SDGs() {
  const sdgs = useQuery(api.queries.getSDGs);
  const labelRef = useScrollReveal<HTMLSpanElement>();
  const titleRef = useScrollReveal<HTMLHeadingElement>();
  const subRef = useScrollReveal<HTMLDivElement>();
  const closingRef = useScrollReveal<HTMLParagraphElement>();

  if (!sdgs) return null;

  return (
    <section id="sdgs">
      <div className="container text-center">
        <span className="section-label reveal" ref={labelRef}>Turning global commitments into measurable change.</span>
        <h2 className="section-title reveal" ref={titleRef}>Global Alignment with the United Nations Sustainable Development Goals</h2>
        <div className="section-subtitle reveal" ref={subRef}>
          <p>
            Our work is directly aligned with the United Nations Sustainable Development Goals (SDGs), contributing to a more sustainable, equitable, and resilient future.
          </p>
          <p>
            Through targeted, community-driven initiatives, we translate global commitments into tangible outcomes—delivering measurable impact where it is needed most.
          </p>
        </div>
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
        <p className="sdgs-closing reveal" ref={closingRef}>
          Together, these efforts demonstrate how local action, when strategically aligned, can contribute meaningfully to global progress.
        </p>
      </div>
    </section>
  );
}
