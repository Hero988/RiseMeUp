import './SDGsEditorial.css';

const goals = [
  {
    number: 7,
    title: "Affordable and Clean Energy",
    action: "Power the farm sustainably.",
    description: "Planned solar systems and a biogas plant would provide renewable energy for farming, using organic by-products as a resource.",
    target: "7.2",
    targetLabel: "More renewable energy",
    measure: "Renewable electricity generated and the share of farm energy supplied by solar and biogas.",
  },
  {
    number: 9,
    title: "Industry, Innovation and Infrastructure",
    action: "Rebuild the foundations.",
    description: "Ten greenhouses, irrigation, and sorting and packing facilities are planned to support productive farming and local enterprise.",
    target: "9.1",
    targetLabel: "Sustainable infrastructure",
    measure: "Facilities completed and operational, irrigation installed, and produce-handling capacity available to the project.",
  },
  {
    number: 10,
    title: "Reduced Inequalities",
    action: "Create opportunity together.",
    description: "Sustainable farming education and livelihood opportunities would prioritise women affected by war, including widows and mothers raising children alone, across all three communities.",
    target: "10.2",
    targetLabel: "Social and economic inclusion",
    measure: "Participation in training, completion of courses, and access to livelihood opportunities for the communities we support.",
  },
  {
    number: 12,
    title: "Responsible Consumption and Production",
    action: "Make more of every resource.",
    description: "The plan connects efficient water use, better produce handling, and the conversion of organic by-products into biogas and fertiliser.",
    target: "12.5",
    targetLabel: "Waste prevention and reuse",
    measure: "Organic material reused, fertiliser recovered, and changes in produce losses as facilities become operational.",
  },
];

// Original project pictograms, not UN emblems or certification marks.
function GoalIllustration({ number }: { number: number }) {
  return <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {number === 7 && <>
      <circle cx="40" cy="27" r="12" />
      <path d="M40 5v5m0 34v5M18 27h5m34 0h5M24 11l4 4m24 24 4 4m0-32-4 4M28 39l-4 4M17 54h46l7 20H10l7-20Zm7 0-3 20m35-20 3 20M40 54v20M14 64h52" />
    </>}
    {number === 9 && <>
      <path d="M9 68V35L40 12l31 23v33H9Zm0-33h62M40 12v56M24 24v44m32-44v44M9 51h62" />
      <path d="M32 68V53h16v15M64 12v-5m-4 5h8" />
    </>}
    {number === 10 && <>
      <circle cx="40" cy="24" r="8" /><circle cx="16" cy="31" r="6" /><circle cx="64" cy="31" r="6" />
      <path d="M27 56v-8a13 13 0 0 1 26 0v8H27Zm-5-13a11 11 0 0 0-17 9v5h15m38-14a11 11 0 0 1 17 9v5H60M16 67h48M27 74h26" />
    </>}
    {number === 12 && <>
      <path d="M16 30a26 26 0 0 1 47-5m0-12v13H50M64 50a26 26 0 0 1-47 5m0 12V54h13" />
      <path d="M29 49c-5-18 6-22 24-23 0 16-4 29-21 27m-9 7 24-27" />
    </>}
  </svg>;
}

export default function SDGs() {
  return (
    <section id="sdgs" className="section rm-sdg-editorial" aria-labelledby="sdgs-title">
      <div className="rm-sdg-hero">
        <img className="rm-sdg-hero-photo" src="/barley-opening.webp" alt="Green barley beneath a blue sky, illustrating the farm’s future possibilities" loading="lazy" width="1600" height="1059" />
        <div className="container">
        <div className="rm-sdg-overline"><span>Risemeup · Virgin Mary Farm</span><span>Our planned contribution</span></div>
        <div className="rm-sdg-heading">
          <div><p className="rm-sdg-kicker">Our planned contribution to the UN Sustainable Development Goals</p><h2 id="sdgs-title">One farm.<br /><em>Four UN Sustainable Development Goals.</em></h2></div>
          <div className="rm-sdg-intro"><p>Four UN Sustainable Development Goals help guide our plans for energy, infrastructure, opportunity and responsible use of resources.</p><span>United Nations Sustainable Development Goals</span></div>
        </div>
        </div>
      </div>
      <div className="container rm-sdg-content">
        <div className="rm-sdg-grid">
          {goals.map(goal => (
            <article className="rm-sdg-goal" key={goal.number} aria-labelledby={`sdg-goal-${goal.number}-title`}>
              <div className="rm-sdg-mark"><span aria-label={`Goal ${goal.number}`}>{String(goal.number).padStart(2, '0')}</span><GoalIllustration number={goal.number} /></div>
              <h3 id={`sdg-goal-${goal.number}-title`}>{goal.title}</h3>
              <h4>{goal.action}</h4>
              <p>{goal.description}</p>
              <a className="rm-sdg-target" href={`https://sdgs.un.org/goals/goal${goal.number}`}><span>UN target {goal.target}</span>{goal.targetLabel} <span aria-hidden="true">↗</span></a>
              <details className="rm-sdg-measure"><summary>How progress could be measured</summary><p>{goal.measure}</p></details>
            </article>
          ))}
        </div>
        <div className="rm-sdg-bottom"><p>Think globally, <em>act locally.</em></p><span>Our planned contribution · Virgin Mary Farm</span></div>
        <div className="rm-sdg-partners">
          <div><p className="rm-sdg-kicker">For charities &amp; development partners</p><h3>Help turn shared goals<br />into <em>local progress.</em></h3><p>As the rebuilding plan develops, we will agree practical measures with partners to track delivery and community benefit.</p></div>
          <a href="/development-partners/#planned-outcomes">View planned outcomes <span aria-hidden="true">↗</span></a>
        </div>
        <p className="rm-sdg-note">This is Risemeup’s own assessment of its planned contribution to the SDGs. It does not imply United Nations endorsement. Suggested measures are for project planning, not reported results or official UN indicators.</p>
      </div>
    </section>
  );
}
