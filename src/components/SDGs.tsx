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
    description: "Sustainable farming education, practical training and livelihood opportunities would support communities affected by exclusion and displacement.",
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
    <section id="sdgs" className="section sdg-feature" aria-labelledby="sdgs-title">
      <div className="container">
        <div className="sdg-feature-heading">
          <p className="eyebrow">United Nations Sustainable Development Goals</p>
          <h2 id="sdgs-title">One farm.<br /><em>Four global goals.</em></h2>
          <p className="sdg-feature-intro">Risemeup is committed to using the UN Sustainable Development Goals as a framework for rebuilding Virgin Mary Farm. These four goals connect our original proposal with practical action for communities in Sudan.</p>
          <p className="sdg-plan-label"><span aria-hidden="true" />Our planned contribution · Virgin Mary Farm</p>
        </div>
        <div className="sdg-goals-grid">
          {goals.map((goal) => (
            <article className={`sdg-goal sdg-goal-${goal.number}`} key={goal.number} aria-labelledby={`sdg-goal-${goal.number}-title`}>
              <div className="sdg-goal-banner">
                <div className="sdg-goal-mark"><p><span>Goal</span><strong>{goal.number}</strong></p><GoalIllustration number={goal.number} /></div>
                <h3 id={`sdg-goal-${goal.number}-title`}>{goal.title}</h3>
              </div>
              <div className="sdg-goal-content">
                <h4>{goal.action}</h4>
                <p>{goal.description}</p>
                <a className="sdg-target-link" href={`https://sdgs.un.org/goals/goal${goal.number}`}><span>UN target {goal.target}</span>{goal.targetLabel} <span aria-hidden="true">↗</span></a>
                <details className="sdg-measure">
                  <summary>How progress could be measured</summary>
                  <p>{goal.measure}</p>
                </details>
              </div>
            </article>
          ))}
        </div>
        <div className="sdg-partner-invitation">
          <div><p className="eyebrow">For charities &amp; development partners</p><h3>Help turn shared goals into local progress.</h3><p>We welcome partners to refine the plan, agree realistic milestones and develop a transparent approach to measuring progress. The farm is awaiting rebuilding; the activities above are planned.</p></div>
          <a className="button light" href="/development-partners/#planned-outcomes">View planned outcomes <span aria-hidden="true">→</span></a>
        </div>
        <p className="sdg-alignment-note">This is Risemeup’s own assessment of its planned contribution to the SDGs. It does not imply United Nations endorsement. Suggested measures are for project planning, not reported results or official UN indicators.</p>
        <p className="sdg-feature-slogan">Think globally, act locally.</p>
      </div>
    </section>
  );
}
