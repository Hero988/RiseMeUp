import { useScrollReveal } from "../hooks/useScrollReveal";

export default function About() {
  const leftRef = useScrollReveal<HTMLDivElement>();
  const rightRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="about">
      <div className="container about-grid">
        <div className="about-image-wrap reveal-left" ref={leftRef}>
          <div className="about-image" />
          <div className="about-image-badge">
            <div className="number">130</div>
            <div className="label">Acres of Farmland</div>
          </div>
        </div>
        <div className="about-content reveal-right" ref={rightRef}>
          <span className="section-label">Who We Are</span>
          <h2>Committed to Grow Rural Communities</h2>
          <p>
            RiseMeUp Sustainable Farming is a non-profit charity dedicated to
            supporting the Nuba Mountain community in Sudan, a region that has
            endured decades of conflict and genocide.
          </p>
          <p>
            Based in London, we work to transform 130 acres of poor-land into
            productive farmland, creating sustainable livelihoods through
            horticulture, farming, and green energy infrastructure.
          </p>
          <div className="about-values">
            <div className="about-value">
              <div className="about-value-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22c6-3 10-9 10-15L12 2 2 7c0 6 4 12 10 15z" /></svg>
              </div>
              <div>
                <strong>Sustainable Growth</strong>
                <span>Long-term solutions</span>
              </div>
            </div>
            <div className="about-value">
              <div className="about-value-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>
              </div>
              <div>
                <strong>Community Focus</strong>
                <span>People-centered</span>
              </div>
            </div>
            <div className="about-value">
              <div className="about-value-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>
              </div>
              <div>
                <strong>Global Impact</strong>
                <span>Think globally, act locally</span>
              </div>
            </div>
            <div className="about-value">
              <div className="about-value-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
              </div>
              <div>
                <strong>Food Security</strong>
                <span>Ending hunger</span>
              </div>
            </div>
          </div>
        </div>
        <blockquote className="section-slogan reveal">
          From fragile land to thriving livelihoods.
        </blockquote>
      </div>
    </section>
  );
}
