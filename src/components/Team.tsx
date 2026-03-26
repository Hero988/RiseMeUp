import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useScrollReveal } from "../hooks/useScrollReveal";

const GraduationIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 8v4l3 3" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);

export default function Team() {
  const members = useQuery(api.queries.getTeamMembers);
  const labelRef = useScrollReveal<HTMLSpanElement>();
  const titleRef = useScrollReveal<HTMLHeadingElement>();
  const subRef = useScrollReveal<HTMLParagraphElement>();

  if (!members) return null;

  return (
    <section id="team">
      <div className="container text-center">
        <span className="section-label reveal" ref={labelRef}>Expert Team</span>
        <h2 className="section-title reveal" ref={titleRef}>Meet Our Advisors</h2>
        <p className="section-subtitle reveal" ref={subRef}>
          Our team brings decades of international experience in agriculture, sustainability, and rural development.
        </p>
        <div className="team-grid">
          {members.map((member, i) => (
            <div className={`team-card reveal reveal-delay-${i + 1}`} key={member._id}>
              <div className="team-card-inner">
                <div className="team-card-front">
                  <div className={`team-avatar avatar-${i + 1}`}>
                    <img src={member.image} alt={member.name} />
                  </div>
                  <h3>{member.name}</h3>
                  <div className="team-role">{member.role}</div>
                  <div className="team-hint">Hover to see qualifications</div>
                </div>
                <div className="team-card-back">
                  <h4>{member.name}</h4>
                  <p>{member.bio}</p>
                  <div className="team-edu">
                    {member.education.map((edu, j) => (
                      <span key={j}>
                        {edu.icon === "clock" ? <ClockIcon /> : <GraduationIcon />}
                        {" "}{edu.text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <blockquote className="team-slogan reveal">
          Together we can make it happen to support the Nuba-Mountain people who have been genocide and from their homeland displaced.
        </blockquote>
      </div>
    </section>
  );
}
