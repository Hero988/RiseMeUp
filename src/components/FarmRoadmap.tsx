const phases = [
  {
    title: "Start & produce",
    area: "20–30 hectares",
    label: "Indicative first-phase area",
    text: "Assess the land and seven destroyed wells, restore a viable water source and build new storage. Establish irrigation, suitable machinery, farmer groups and practical training before starting marketable crops.",
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
          <p className="eyebrow">HOW REBUILDING COULD PROGRESS · FIVE PROPOSED PHASES</p>
          <h3 id="farm-growth-title">Start growing.<br /><em>Build a lasting future.</em></h3>
        </div>
        <div className="growth-intro">
          <p>This roadmap sets out a possible sequence for restoring production and gradually developing the farm’s 130-hectare site. Water assessment comes first; women from all three communities would help shape participation and training.</p>
          <p className="growth-family-target"><strong>300+ families</strong><span>Proposed long-term reach · participant numbers and selection to be agreed with communities.</span></p>
        </div>
      </div>
      <figure className="growth-illustration">
        <a href="/virgin-mary-five-phase-roadmap.jpeg" target="_blank" rel="noopener noreferrer" aria-label="Open the illustrated five-phase farm plan at full size in a new tab">
          <img src="/virgin-mary-five-phase-roadmap.jpeg" width="1024" height="1536" loading="lazy" alt="Proposed Virgin Mary Farm recovery roadmap: start production, expand farming, build commercial capacity, add value and develop the full 130-hectare farm, with income intended to support gradual reinvestment." />
        </a>
        <figcaption>Proposed recovery roadmap, not existing facilities. Areas, the ambition to reach 300+ families and income allocations are illustrative; feasibility, costs and financial arrangements remain to be assessed and agreed.</figcaption>
      </figure>
      <a className="button growth-view-image" href="/virgin-mary-five-phase-roadmap.jpeg" target="_blank" rel="noopener noreferrer">Open the picture at full size ↗</a>
      <section className="growth-phase-one" id="phase-one-equipment" aria-labelledby="phase-one-equipment-title">
        <p className="eyebrow">A closer look at Phase 1</p>
        <h4 id="phase-one-equipment-title">The tools to start growing.</h4>
        <p>The illustration explores equipment for a possible 20–30 hectare production block. The assessed first growing area may be smaller; water availability, training needs and funding will determine the equipment required.</p>
        <figure className="growth-illustration">
          <a href="/virgin-mary-phase-one-machinery.jpg?v=2" target="_blank" rel="noopener noreferrer" aria-label="Open the proposed equipment and Phase 1 services illustration at full size in a new tab">
            <img src="/virgin-mary-phase-one-machinery.jpg?v=2" width="1024" height="1536" loading="lazy" alt="Virgin Mary Farm Phase 1 planning illustration with the original Risemeup logo, eight proposed equipment categories and nine planned support activities, including technical design, crop planning, equipment sourcing, irrigation, land preparation, supplier coordination, training, monitoring and expansion planning. No estimated prices are shown." />
          </a>
          <figcaption>Proposed equipment and project-support activities, not existing assets or confirmed purchases. Water restoration comes first. Machinery specifications and quantities will follow technical assessment. A costed first-stage plan will be agreed before fundraising for equipment delivery.</figcaption>
        </figure>
        <div className="actions"><a className="button" href="/virgin-mary-phase-one-machinery.jpg?v=2" target="_blank" rel="noopener noreferrer">Open the equipment picture ↗</a><a className="text-link" href="/development-partners/#phase-one-concept">Explore equipment needs →</a></div>
      </section>
      <details className="growth-details">
      <summary>Read the five phases and funding approach</summary>
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
      <p className="growth-note">Based on the supplied five-phase planning illustration. All phase areas are indicative cumulative targets, not additional areas or current cultivation. The 130 hectares is the total site; a survey must establish cultivable land and space for buildings, access and water infrastructure. No delivery dates, returns or fixed income-allocation percentages are agreed. The four facility components above describe what we hope to build; this roadmap describes the proposed stages of recovery.</p>
      </details>
      <a className="button" href="/development-partners/#first-stage">Help develop the first fundable stage →</a>
    </section>
  );
}
