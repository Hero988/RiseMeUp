import './OpeningHero.css';

export default function ClassicHero() {
  return (
    <section id="hero" className="rm-opening" aria-labelledby="rm-opening-title">
      <img className="rm-opening-photo" src="/wheat-field.png" alt="Golden wheat illustrating the possibility of a future harvest" fetchPriority="high" />
      <div className="rm-opening-shade" />
      <div className="rm-opening-inner">
        <div className="rm-opening-copy">
          <p className="rm-opening-eyebrow"><span />For people. For dignity. For tomorrow.</p>
          <h1 id="rm-opening-title">Where hope<br />takes <em>root.</em></h1>
          <p className="rm-opening-description">Standing with Sudan’s forgotten communities.<br />Nourishing lives today. Growing a future, together.</p>
          <a className="rm-opening-button" href="#donate">Help a family today <span aria-hidden="true">↗</span></a>
          <p className="rm-opening-slogan">Committed to grow rural communities.</p>
        </div>
        <aside className="rm-opening-card" aria-label="Our shared commitment">
          <svg viewBox="0 0 120 160" fill="none" aria-hidden="true"><path d="M60 153V58M60 110C14 108 7 77 11 52c35-2 49 21 49 58Zm0-30c43-4 50-35 45-60-31 2-45 23-45 60Z" stroke="currentColor" strokeWidth="1.1" /><path d="m60 109-34-39m34 9 30-41" stroke="currentColor" strokeWidth="1.1" /></svg>
          <p>Two communities.<br /><em>One shared future.</em></p>
          <span>Coptic Orthodox &amp; Nuba Mountains</span>
        </aside>
      </div>
      <div className="rm-opening-foot"><span>Rooted in London. Connected to Sudan.</span><span>Illustrative harvest photograph</span><a href="#about">Scroll to explore <span aria-hidden="true">↓</span></a></div>
    </section>
  );
}
