const goals = [
  {
    number: 7,
    title: "Affordable and Clean Energy",
    description:
      "The planned biogas plant and solar energy systems would supply renewable energy for farm operations, supporting more reliable energy access and reducing dependence on purchased fuel.",
  },
  {
    number: 9,
    title: "Industry, Innovation and Infrastructure",
    description:
      "Modern greenhouses, irrigation, renewable energy and sorting and packaging facilities would build the infrastructure for productive farming and local agricultural enterprise.",
  },
  {
    number: 10,
    title: "Reduced Inequalities",
    description:
      "Education, practical training and opportunities to earn a living would help the Coptic Orthodox and Nuba Mountains communities rebuild after exclusion, conflict and displacement.",
  },
  {
    number: 12,
    title: "Responsible Consumption and Production",
    description:
      "Efficient use of water and farm resources, turning organic by-products into energy and fertiliser, and better produce handling would support responsible production and reduce waste.",
  },
];

export default function SDGs() {
  return (
    <section id="sdgs" className="section farm-sdgs" aria-labelledby="sdgs-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Virgin Mary Farm &amp; the UN Sustainable Development Goals</p>
            <h2 id="sdgs-title">Local action.<br /><em>Global goals.</em></h2>
          </div>
          <p>
            Virgin Mary Farm’s development plans are aligned with four United
            Nations Sustainable Development Goals identified in our original
            proposal. Together, they connect renewable energy, agricultural
            infrastructure, community opportunity and responsible farming.
          </p>
        </div>
        <div className="farm-sdg-grid">
          {goals.map((goal) => (
            <article className={`farm-sdg-card goal-${goal.number}`} key={goal.number}>
              <p className="farm-sdg-number"><span>Goal</span> {goal.number}</p>
              <h3>{goal.title}</h3>
              <p>{goal.description}</p>
              <a href={`https://sdgs.un.org/goals/goal${goal.number}`}>
                Explore UN Goal {goal.number} <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
        <p className="farm-sdg-closing">Think globally, act locally.</p>
      </div>
    </section>
  );
}
