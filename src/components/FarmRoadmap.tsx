const phases = [
  {
    title: "Start & produce",
    area: "20–30 hectares",
    label: "Indicative first-phase area",
    text: "Assess the land and seven damaged wells, restore a viable water source and build new storage. Establish irrigation, suitable machinery, farmer groups and practical training before starting marketable crops.",
    outcome: "A first harvest, practical skills and the beginnings of farm income.",
  },
  {
    title: "Expand production",
    area: "50–60 hectares",
    label: "Proposed cumulative area",
    text: "Extend irrigation and cultivation, introduce suitable additional crops, expand training and improve transport, basic storage and post-harvest handling. Add machinery as the assessed workload grows.",
    outcome: "More growing capacity, with any available surplus contributing to expansion.",
  },
  {
    title: "Build commercial capacity",
    area: "80–90 hectares",
    label: "Proposed cumulative area",
    text: "Improve crop planning and rotation, mechanisation and organised harvesting. Develop cleaning, grading, storage and logistics, supported by direct relationships with buyers.",
    outcome: "Stronger routes to market and better value from each harvest.",
  },
  {
    title: "Add value & enterprise",
    area: "110 hectares",
    label: "Proposed cumulative area",
    text: "Develop packing facilities, a machinery workshop and spare-parts storage. Improve transport and buyer agreements, expand training, and assess circular farming enterprises, including biogas and organic fertiliser.",
    outcome: "A broader range of agricultural work and potential sources of income.",
  },
  {
    title: "Connect the whole farm",
    area: "130 hectares",
    label: "Total farm site · long-term framework",
    text: "Bring water, renewable energy, greenhouses, poultry, produce handling, machinery services and farming education into one coordinated farm. Agree long-term provision for production, maintenance, farmer income, reinvestment and community benefit.",
    outcome: "A resilient farm supporting livelihoods and community recovery.",
  },
];

export default function FarmRoadmap() {
  return (
    <section className="farm-growth" id="land-framework" aria-labelledby="farm-growth-title">
      <div className="growth-heading">
        <div>
          <p className="eyebrow">Our proposed five-phase recovery roadmap</p>
          <h3 id="farm-growth-title">Start growing.<br /><em>Build a lasting future.</em></h3>
        </div>
        <div className="growth-intro">
          <p>Across a 130-hectare farm, our ambition is to help families rebuild through food, farming skills and opportunities to earn a living. Women affected by war are at the heart of this plan, with both communities helping to shape its development.</p>
          <p className="growth-family-target"><strong>300+ families</strong><span>Proposed long-term reach · participant numbers and selection to be agreed with communities.</span></p>
        </div>
      </div>
      <p className="growth-start-note"><strong>Water comes first.</strong> The technically assessed first growing area may be smaller than the indicative Phase 1 target. Safe access, water availability, secure storage, an agreed budget and trained operators must be established before production starts.</p>
      <ol className="growth-phases">
        {phases.map((phase, i) => (
          <li key={phase.title}>
            <div className="growth-phase-title"><span className="growth-number">0{i + 1}</span><div><p className="eyebrow">Phase {i + 1}</p><h4>{phase.title}</h4></div></div>
            <div className="growth-phase-area"><strong>{phase.area}</strong><span>{phase.label}</span></div>
            <div className="growth-phase-detail"><p>{phase.text}</p><p className="growth-outcome"><strong>Planned benefit:</strong> {phase.outcome}</p></div>
          </li>
        ))}
      </ol>
      <div className="growth-income">
        <div><p className="eyebrow">The proposed reinvestment approach</p><h4>Grow. Earn. Reinvest.</h4><p>We aim to begin generating income in the first productive phase and use available surplus to help fund the next. Future income and self-financing are ambitions, dependent on harvests, markets, costs and local conditions. Additional partner funding may be needed at every stage.</p></div>
        <ol aria-label="Proposed farm income sequence"><li>Record harvest sales</li><li>Cover actual operating costs</li><li>Agree farmer income and maintenance reserves</li><li>Reinvest available surplus in the farm and community</li></ol>
      </div>
      <p className="growth-note">Based on the supplied five-phase planning illustration. All phase areas are indicative cumulative targets, not additional areas or current cultivation. The 130 hectares is the total site; a survey must establish cultivable land and space for buildings, access and water infrastructure. No delivery dates, returns or fixed income-allocation percentages are agreed. This recovery roadmap complements the four facility components of the original 2018 proposal.</p>
      <a className="button" href="/development-partners/#first-stage">Help develop the first fundable stage →</a>
    </section>
  );
}
