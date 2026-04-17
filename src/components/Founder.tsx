import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Founder() {
  const leftRef = useScrollReveal<HTMLDivElement>();
  const rightRef = useScrollReveal<HTMLDivElement>();
  const quoteRef = useScrollReveal<HTMLQuoteElement>();

  return (
    <section id="founder">
      <div className="container founder-grid">
        <div className="founder-portrait-wrap reveal-left" ref={leftRef}>
          <div className="founder-portrait">
            <img src="/founder-suliman.jpg" alt="Suliman — Founder of RiseMeUp Sustainability" />
          </div>
          <div className="founder-portrait-badge">
            <div className="tag">Founder</div>
            <div className="name">Suliman</div>
            <div className="place">London &middot; Sudan</div>
          </div>
        </div>

        <div className="founder-content reveal-right" ref={rightRef}>
          <span className="section-label">The Founder</span>
          <h2>Driven by People, Rooted in Service</h2>
          <p className="founder-lead">
            I am passionate about non-profit work — not as a profession, but as a
            way of life. Long before RiseMeUp had a name, I was already stepping
            in where I saw suffering.
          </p>
          <p>
            During the Coronavirus pandemic, I helped deliver food to a food bank
            and a homeless shelter in London, and coordinated food aid for
            families in Sudan who had been pushed to the edge by the crisis.
            Two cities, one conviction: nobody should go to bed hungry while I
            have the means to move a plate to their table.
          </p>
          <p>
            Today my focus is the war zone. I continue to support vulnerable
            communities in London, and I work alongside trusted partners on the
            ground in Sudan — reaching displaced families in the Nuba Mountains,
            Khartoum and beyond. RiseMeUp is the long-term shape of that work:
            turning emergency aid into sustainable livelihoods, and turning
            130 acres of fragile land into a future the next generation can
            inherit.
          </p>

          <div className="founder-pillars">
            <div className="founder-pillar">
              <div className="founder-pillar-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div>
                <strong>COVID Response</strong>
                <span>Food bank &amp; shelter aid in London and Sudan</span>
              </div>
            </div>
            <div className="founder-pillar">
              <div className="founder-pillar-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <div>
                <strong>War-Zone Relief</strong>
                <span>Direct support to families caught in conflict</span>
              </div>
            </div>
            <div className="founder-pillar">
              <div className="founder-pillar-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21c3-3 6-4 9-4s6 1 9 4" />
                  <path d="M12 3v14" />
                  <path d="M8 7l4-4 4 4" />
                </svg>
              </div>
              <div>
                <strong>Two-City Outreach</strong>
                <span>Active on the ground in London and Sudan</span>
              </div>
            </div>
            <div className="founder-pillar">
              <div className="founder-pillar-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
                </svg>
              </div>
              <div>
                <strong>Long-Term Mission</strong>
                <span>From emergency aid to sustainable livelihoods</span>
              </div>
            </div>
          </div>
        </div>

        <blockquote className="section-slogan reveal" ref={quoteRef}>
          I don&apos;t believe in watching from a distance. If I can help someone
          eat tonight or rebuild tomorrow, that is enough reason to act today.
        </blockquote>
      </div>
    </section>
  );
}
