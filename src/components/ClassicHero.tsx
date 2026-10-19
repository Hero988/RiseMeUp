export default function ClassicHero() {
  return (
    <section id="hero" className="classic-hero">
      <div className="container classic-hero-grid">
        <div className="classic-hero-copy">
          <p className="classic-badge">London rooted. Sudan focused.</p>
          <h1>Two Communities.<br /><em>One Mission.</em><br />A Future of Hope.</h1>
          <p className="classic-hero-lead">
            Standing with Sudan’s <strong>Coptic Orthodox</strong> and <strong>Nuba Mountains</strong> communities through war, displacement and the work of rebuilding.
          </p>
          <p>Food assistance today. Sustainable farming, education and lasting livelihoods through our main project, Virgin Mary Farm.</p>
          <div className="actions">
            <a className="button" href="#donate">Support families today <span aria-hidden="true">→</span></a>
            <a className="button outline" href="#communities">Meet our communities</a>
          </div>
          <a className="classic-farm-link" href="#virgin-mary-farm">Virgin Mary Farm: rebuilding planned <span aria-hidden="true">↗</span></a>
          <p className="classic-slogan">Think globally, act locally.</p>
        </div>
        <aside className="classic-community-panel" aria-label="The two communities we support">
          <p className="eyebrow">No community forgotten</p>
          <h2>Coptic Orthodox</h2>
          <p className="classic-panel-label">Community in Sudan</p>
          <span className="classic-ampersand" aria-hidden="true">&amp;</span>
          <h2>Nuba Mountains</h2>
          <p className="classic-panel-label">Communities in Sudan</p>
          <div className="classic-panel-message">
            <p>Food assistance today.<br />A shared commitment to rebuild.</p>
            <a href="#relief">See our work today <span aria-hidden="true">→</span></a>
          </div>
        </aside>
      </div>
    </section>
  );
}
