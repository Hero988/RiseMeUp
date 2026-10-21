export function ClassicAbout() {
  const values = [
    ["↗", "Recovery", "Long-term livelihoods"],
    ["♡", "Community", "People at the centre"],
    ["◎", "Partnership", "Shared expertise"],
    ["✧", "Food assistance", "Practical help today"],
  ];
  return <section id="about" className="section classic-about">
    <div className="container classic-about-grid">
      <div className="classic-about-visual">
        <figure className="classic-image-wrap" aria-describedby="map-survey-note">
          <img src="/farmland-satellite.png" alt="Supplied satellite image with an outlined plot associated with Virgin Mary Farm" width="772" height="421" loading="lazy" decoding="async" />
          <div className="classic-map-measurements" aria-label="Original map annotations, not a verified whole-farm survey">
            <span>Marked perimeter</span><strong>2,234.92 m</strong>
            <span>Marked plot area</span><strong>296,258.95 m²</strong>
          </div>
          <figcaption className="classic-image-badge"><strong>One</strong><span>Shared commitment</span></figcaption>
        </figure>
        <p className="classic-map-note" id="map-survey-note">Supplied map image; the marked plot and measurements await survey confirmation. The farm’s reported total area is 130 hectares. The image is not a verified survey of the full site.</p>
      </div>
      <div>
        <p className="eyebrow">Who we are</p>
        <h2>No community should be <span className="classic-about-emphasis">forgotten.</span></h2>
        <p className="lead">Risemeup is a London-based initiative supporting Sudan’s Coptic Orthodox and Nuba Mountains communities.</p>
        <p>We connect food assistance today with a longer-term commitment to recovery. Our main project, Virgin Mary Farm, brings together sustainable agriculture, clean energy, education and the opportunity to earn a living.</p>
        <div className="classic-values">{values.map(([icon, title, description]) => <div key={title}><span className="classic-value-icon" aria-hidden="true">{icon}</span><div><strong>{title}</strong><span>{description}</span></div></div>)}</div>
        <p className="classic-about-slogan">Think globally, act locally.</p>
      </div>
    </div>
  </section>;
}

export function ClassicVision() {
  return <section id="vision-mission" className="section classic-vision">
    <div className="container">
      <div className="section-head"><p className="eyebrow">Our heart</p><h2>Vision &amp; Mission</h2><p>Two Communities. One Vision. A Future of Hope.</p></div>
      <div className="vision-grid">
        <article id="vision"><span className="vision-icon" aria-hidden="true">◎</span><h3>Our Vision</h3><p>A future in which communities affected by war can live with dignity, access nutritious food and build secure livelihoods.</p><p>We envision productive land, shared opportunity and a place for people to learn, work and rebuild their lives.</p><p>From fragile land to thriving communities.</p></article>
        <article id="mission"><span className="vision-icon" aria-hidden="true">↗</span><h3>Our Mission</h3><p>To stand alongside Sudan’s Coptic Orthodox and Nuba Mountains communities through practical food assistance and long-term recovery.</p><p>Working with partners, we aim to rebuild Virgin Mary Farm through sustainable farming, clean energy, education and practical training.</p><p>Think globally, act locally.</p></article>
      </div>
    </div>
  </section>;
}

export function ClassicObjectives() {
  const objectives = [
    ["Green energy", "obj-green-energy.jpeg", "Develop solar power and biogas to support farming and make productive use of organic by-products."],
    ["Food security", "obj-food-security.jpeg", "Combine immediate food assistance with planned crop and poultry production for a more secure future."],
    ["New jobs", "obj-new-jobs.jpeg", "Create opportunities across growing, processing, packing, maintenance and distribution as the farm develops."],
    ["Ending poverty", "obj-ending-poverty.jpeg", "Help families build the skills and opportunities to earn a living and become more self-reliant."],
    ["Education & training", "obj-education.jpeg", "Bring sustainable farming education and hands-on training into every part of the project."],
    ["Rural farming", "obj-rural-farming.jpeg", "Support practical, resource-conscious agriculture rooted in community knowledge and local needs."],
  ];
  return <section className="section classic-objectives" id="objectives"><div className="container">
    <div className="section-head"><p className="eyebrow">Our goals</p><h2>Strategic Objectives</h2><p>Six connected ambitions guiding the rebuilding of Virgin Mary Farm and our work with communities.</p></div>
    <div className="classic-objectives-grid">{objectives.map(([title, image, description]) => <article key={title}><img src={`/${image}`} alt="" loading="lazy" /><div><h3>{title}</h3><p>{description}</p></div></article>)}</div>
    <p className="classic-section-slogan">Committed to grow rural communities.</p>
  </div></section>;
}

export function ClassicFounder() {
  return <section id="founder" className="section classic-founder"><div className="container classic-founder-grid">
    <figure className="classic-image-wrap"><img src="/founder-iman-tadros.jpg" alt="Iman Tadros, founder of Risemeup" width="2016" height="3024" loading="lazy" /><figcaption className="classic-image-badge"><span>Our founder</span><strong>Iman Tadros</strong></figcaption></figure>
    <div><p className="eyebrow">The person behind the purpose</p><h2>A commitment that starts with people.</h2><p className="lead">Iman Tadros founded Risemeup with a personal commitment to communities whose needs are too often overlooked.</p>
      <p>Her work began with responding to need: supporting a food bank and homeless shelter in London during the pandemic, and coordinating food assistance for families in Sudan.</p>
      <p>As a member of Sudan’s Coptic Orthodox community, she brings a personal understanding of the loss caused by war. Risemeup carries that commitment forward through support for both the Coptic Orthodox and Nuba Mountains communities.</p>
      <p>Virgin Mary Farm was destroyed during the war. The land remains, and so does the ambition to rebuild a place of productive farming, learning and opportunity.</p>
      <div className="classic-founder-values"><div><strong>Humanitarian leadership</strong><span>Practical support for people</span></div><div><strong>Community relationships</strong><span>A personal, lasting commitment</span></div></div>
      <a className="text-link" href="#contact">Connect with Iman →</a>
    </div>
  </div></section>;
}

export function ClassicCommunityHistory() {
  const archive = [
    ["displaced-region", "Leaving home", "Displacement has forced families to leave homes, farmland and familiar sources of support."],
    ["children-outside-cave", "Seeking shelter", "Historical photographs document the use of rocky shelters during conflict in the region."],
    ["families-cave-shelter", "Families together", "Safe shelter, food and the chance to rebuild remain central to the community’s needs."],
  ];
  return <section id="nuba-story" className="section classic-history"><div className="container">
    <div className="section-head"><p className="classic-badge">Community history</p><h2>The Nuba Mountains.<br /><em>Together we can make it happen.</em></h2><p>Supporting the people of the Nuba Mountains who have suffered genocide and been displaced from their homeland.</p></div>
    <div className="classic-history-map"><img src="/nuba-story/map-nuba-mountains.jpeg" alt="Archive map showing the Nuba Mountains region in Sudan" loading="lazy" /><div><p className="eyebrow">A place, a people, a future</p><h3>Understanding the place behind the story.</h3><p>Our commitment to the Nuba Mountains is a commitment to people: to the homes, land, livelihoods and community relationships they depend on.</p><p>The map and photographs below are part of our Nuba Mountains archive. They offer historical context for the community’s experience of displacement.</p><a className="text-link" href="#communities">Meet both communities →</a></div></div>
    <div className="classic-archive-grid">{archive.map(([file, title, description], index) => <figure key={file}><div className="classic-archive-image"><img src={`/nuba-story/${file}.jpeg`} alt={`${title}: historical image from the Nuba Mountains archive`} loading="lazy" /><span aria-hidden="true">0{index + 1}</span></div><figcaption><p className="eyebrow">Historical context</p><h3>{title}</h3><p>{description}</p></figcaption></figure>)}</div>
    <div className="classic-history-response"><p className="eyebrow">Our response</p><h3>Help with food today.<br />Build the foundations for tomorrow.</h3><p>Support immediate food assistance or explore a partnership in the rebuilding of Virgin Mary Farm.</p><div className="actions"><a className="button" href="#donate">Support families →</a><a className="text-link" href="#virgin-mary-farm">Explore Virgin Mary Farm →</a></div></div>
  </div></section>;
}
