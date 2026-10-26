export default function FarmReadiness() {
  return (
    <section className="farm-readiness" id="farm-readiness" aria-labelledby="farm-readiness-title">
      <div>
        <p className="eyebrow">Farm status and readiness</p>
        <p className="readiness-date">Updated 26 October 2026 · Project information supplied 21 October</p>
        <h3 id="farm-readiness-title">Rebuilding starts with water.</h3>
        <p>Virgin Mary Farm was destroyed during the war and is not operational. Our founder reports that all seven wells were destroyed and the pumping equipment stolen.</p>
      </div>
      <dl>
        <div><dt>Our first proposed step</dt><dd>Assess the wells, establish a viable water source and build new storage for an initial growing and training area.</dd></div>
        <div><dt>Before work begins</dt><dd>Confirm safe access, written land-use terms, technical requirements, local responsibilities and a costed plan.</dd></div>
        <div><dt>Help needed now</dt><dd>Water, irrigation and agricultural specialists to help assess the site and design the first stage.</dd></div>
      </dl>
      <div className="actions"><a className="button" href="/development-partners/#first-stage">Explore the first stage →</a><a className="text-link" href="/development-partners/#readiness">Read the full farm status →</a></div>
      <p className="readiness-note">Equipment specifications, costs and delivery dates will follow assessment. The partner page includes land, management and equipment-ownership information.</p>
    </section>
  );
}
