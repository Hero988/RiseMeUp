import './VisionField.css';

export function ClassicAbout() {
  const values = [
    ["↗", "Recovery", "Long-term livelihoods"],
    ["♡", "Community", "People at the centre"],
    ["◎", "Partnership", "Shared expertise"],
    ["✧", "Food assistance", "Practical help today"],
  ];
  return <section id="about" className="section classic-about">
    <div className="container"><p className="classic-about-slogan">Think globally, act locally.</p></div>
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
        <p className="classic-map-note" id="map-survey-note">The farm’s reported total area is 130 hectares. This image shows a marked section of the land.</p>
      </div>
      <div>
        <p className="eyebrow">Who we are</p>
        <h2><span className="classic-about-first-line">No community should be</span><span className="classic-about-emphasis">forgotten.</span></h2>
        <p className="lead">Risemeup is a London-based initiative supporting Sudan’s Coptic Orthodox, Nuba Mountains and Blue Nile communities.</p>
        <p>We support families with food assistance today while working towards lasting recovery. At the heart of this vision is the planned rebuilding of Virgin Mary Farm. Through sustainable agriculture, clean energy, education and practical training, we aim to help people earn a living and rebuild their lives.</p>
        <div className="classic-values">{values.map(([icon, title, description]) => <div key={title}><span className="classic-value-icon" aria-hidden="true">{icon}</span><div><strong>{title}</strong><span>{description}</span></div></div>)}</div>
      </div>
    </div>
  </section>;
}

export function ClassicVision() {
  return <section id="vision-mission" className="section classic-vision rm-field-vision" aria-labelledby="vision-mission-title">
    <div className="container">
      <div className="section-head">
        <h2 id="vision-mission-title">Vision <span>&amp;</span> <em>Mission.</em></h2>
        <p>Three communities. One shared vision. A future of hope.</p>
      </div>
      <div className="vision-grid">
        <article id="vision">
          <p className="chapter">The future we envision</p>
          <h3>Our Vision</h3>
          <p>A future where communities affected by war can live with dignity, grow nutritious food and build lasting livelihoods.</p>
          <p>Where land flourishes, opportunity is shared and families have the freedom to rebuild their lives.</p>
          
        </article>
        <article id="mission">
          <p className="chapter">The work that guides us</p>
          <h3>Our Mission</h3>
          <p>To support Sudan’s Coptic Orthodox, Nuba Mountains and Blue Nile communities with food assistance and a practical path towards recovery.</p>
          <p>With our partners, we aim to rebuild Virgin Mary Farm as a place for sustainable farming, clean energy, learning and practical training.</p>
          
        </article>
      </div>
    </div>
  </section>;
}

export function ClassicObjectives() {
  const objectives = [
    ["Green energy", "obj-green-energy.jpeg", "Develop solar power and biogas to support farming and make productive use of organic by-products."],
    ["Food security", "food-security-selected.svg", "Combine immediate food assistance with planned crop and poultry production for a more secure future."],
    ["New jobs", "obj-new-jobs.jpeg", "Create opportunities across growing, processing, packing, maintenance and distribution as the farm develops."],
    ["Stronger livelihoods", "obj-ending-poverty.jpeg", "Help families build the skills and opportunities to earn a living and become more self-reliant."],
    ["Education & training", "obj-education.jpeg", "Bring sustainable farming education and hands-on training into every part of the project."],
    ["Rural farming", "obj-rural-farming.jpeg", "Support practical, resource-conscious agriculture rooted in community knowledge and local needs."],
  ];
  return <section className="section classic-objectives" id="objectives"><div className="container">
    <div className="section-head"><p className="eyebrow">Our goals</p><h2>Strategic Objectives</h2><p>Six connected ambitions guiding the rebuilding of Virgin Mary Farm and our work with communities.</p></div>
    <div className="classic-objectives-grid">{objectives.map(([title, image, description]) => <article key={title}><img src={`/${image}`} alt="" loading="lazy" /><div><h3>{title}</h3><p>{description}</p></div></article>)}</div>
    <p className="classic-section-slogan">Committed to helping rural communities thrive.</p>
  </div></section>;
}

export function ClassicFounder() {
  return <section id="founder" className="section classic-founder"><div className="container classic-founder-grid">
    <figure className="classic-image-wrap"><img src="/founder-iman-tadros.jpg" alt="Iman Tadros, founder of Risemeup" width="2016" height="3024" loading="lazy" /><figcaption className="classic-image-badge"><span>Our founder</span><strong>Iman Tadros</strong></figcaption></figure>
    <div><p className="eyebrow">The person behind the purpose</p><h2>A commitment that starts with people.</h2><p className="lead">Iman Tadros founded Risemeup with a personal commitment to communities whose needs are too often overlooked.</p>
      <p>The farm’s original development proposal dates from 2018. During the coronavirus pandemic, Iman supported a food bank and homeless shelter in London and coordinated food assistance for families in Sudan.</p>
      <p>As a member of Sudan’s Coptic Orthodox community, she brings a personal understanding of the loss caused by war. Risemeup carries that commitment forward through support for the Coptic Orthodox, Nuba Mountains and Blue Nile communities.</p>
      <p>Today, her work connects immediate food assistance with the ambition to rebuild Virgin Mary Farm as a place of farming, learning and opportunity.</p>
      <div className="classic-founder-values"><div><strong>Humanitarian leadership</strong><span>Practical support for people</span></div><div><strong>Community relationships</strong><span>A personal, lasting commitment</span></div></div>
      <a className="text-link" href="#contact">Connect with Iman →</a>
    </div>
  </div></section>;
}

export function ClassicCommunityHistory() {
  const archive = [
    ["displaced-region-no-overlays", "Leaving home", "Displacement has forced families to leave their homes, farmland and the community networks they rely on."],
    ["children-outside-cave", "Seeking shelter", "Families have sought shelter among the rocks and caves, searching for safety during conflict."],
    ["families-cave-shelter", "Families together", "Families need safety, food and support to rebuild their lives and care for one another."],
  ];
  return <section id="nuba-story" className="section classic-history"><div className="container">
    <div className="section-head"><p className="classic-badge">Community history</p><h2>The Nuba Mountains.<br /><em>Standing with communities. Supporting their future.</em></h2><p>Our commitment reaches beyond immediate relief to the land, livelihoods and community ties people need to rebuild.</p></div>
    <div className="classic-history-map"><img src="/nuba-story/map-nuba-mountains.jpeg" alt="Archive map showing the Nuba Mountains region in Sudan" loading="lazy" /><div><p className="eyebrow">A place, a people, a future</p><h3>Understanding the place behind the story.</h3><p>Our commitment to the Nuba Mountains begins with its people—their families, their connection to the land and their hopes for a secure future.</p><p>This archive map and these photographs help tell the story of communities affected by conflict and displacement.</p><a className="text-link" href="#communities">Meet all three communities →</a></div></div>
    <div className="classic-archive-grid">{archive.map(([file, title, description], index) => <figure key={file}><div className="classic-archive-image"><img src={`/nuba-story/${file}.jpeg`} alt={`${title}: historical image from the Nuba Mountains archive`} loading="lazy" /><span aria-hidden="true">0{index + 1}</span></div><figcaption><p className="eyebrow">Historical context</p><h3>{title}</h3><p>{description}</p></figcaption></figure>)}</div>
    <div className="classic-history-response"><p className="eyebrow">Our response</p><h3>Help with food today.<br />Build the foundations for tomorrow.</h3><p>Support immediate food assistance or explore a partnership in the rebuilding of Virgin Mary Farm.</p><div className="actions"><a className="button" href="#donate">Support families →</a><a className="text-link" href="#virgin-mary-farm">Explore Virgin Mary Farm →</a></div></div>
  </div></section>;
}
