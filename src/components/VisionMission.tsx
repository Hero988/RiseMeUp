import { useScrollReveal } from "../hooks/useScrollReveal";

export default function VisionMission() {
  const labelRef = useScrollReveal<HTMLSpanElement>();
  const titleRef = useScrollReveal<HTMLHeadingElement>();
  const subRef = useScrollReveal<HTMLParagraphElement>();
  const visionRef = useScrollReveal<HTMLDivElement>();
  const missionRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="vision-mission">
      <div className="container text-center">
        <span className="section-label reveal" ref={labelRef}>Our Heart</span>
        <h2 className="section-title reveal" ref={titleRef}>Vision &amp; Mission</h2>
        <p className="section-subtitle reveal" ref={subRef}>
          We believe that investing in rural people is investing in a brighter future for all.
        </p>
        <div className="heart-cards">
          <div className="heart-card vision reveal reveal-delay-1" ref={visionRef}>
            <div className="heart-card-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
            </div>
            <h3>Our Vision</h3>
            <p>
              Taking steps towards sustainable development by developing 130 acres of poor-land into horticulture, farming and implementing Green Energy as the main source of infrastructure for the farm.
            </p>
          </div>
          <div className="heart-card mission reveal reveal-delay-2" ref={missionRef}>
            <div className="heart-card-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
            </div>
            <h3>Our Mission</h3>
            <p>
              Turning 130 acres of non-productive land into productive farmland, creating new agricultural job opportunities to help, support the neediest and excluded within this rural community to end poverty.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
