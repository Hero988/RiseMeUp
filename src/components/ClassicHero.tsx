import './OpeningHero.css';

export default function ClassicHero() {
  return (
    <section id="hero" className="rm-opening" aria-labelledby="rm-opening-title">
      <img className="rm-opening-photo" src="/barley-opening.webp" alt="An illustrative photograph of green barley beneath a blue sky" fetchPriority="high" width="1600" height="1059" />
      <div className="rm-opening-shade" aria-hidden="true" />
      <div className="rm-opening-copy">
        <p className="rm-opening-eyebrow"><span aria-hidden="true" />Rooted in community. Looking ahead.</p>
        <h1 id="rm-opening-title">A <span className="rm-opening-future">future</span><br />worth<br /><em>growing.</em></h1>
        <div className="rm-opening-bottom">
          <p className="rm-opening-slogan">Committed to grow rural communities.</p>
          <a className="rm-opening-link" href="#about">Discover our vision <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <aside className="rm-opening-note" aria-label="The Virgin Mary Farm vision">
        <span>The Virgin Mary Farm vision</span>
        <p>From the land.<br /><em>For the future.</em></p>
      </aside>
      <div className="rm-opening-vertical" aria-hidden="true">Land · Learning · Possibility</div>
    </section>
  );
}
