import { useId, useRef, useState } from "react";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  bio: string;
  qualifications: string;
  website?: string;
  trainingWebsite?: string;
};

export default function TeamFlipCard({ person }: { person: TeamMember }) {
  const [flipped, setFlipped] = useState(false);
  const profileId = useId();
  const frontButton = useRef<HTMLButtonElement>(null);
  const backButton = useRef<HTMLButtonElement>(null);

  function turnCard(showProfile: boolean) {
    setFlipped(showProfile);
    requestAnimationFrame(() => {
      (showProfile ? backButton : frontButton).current?.focus({ preventScroll: true });
    });
  }

  return (
    <article className="team-compact-card" aria-label={person.name}
      onKeyDown={(event) => {
        if (event.key === "Escape" && flipped) {
          event.preventDefault();
          turnCard(false);
        }
      }}>
      <div className="team-compact-front" hidden={flipped} inert={flipped}>
        <button type="button" className="team-compact-portrait" ref={frontButton}
          onClick={() => turnCard(true)} aria-label={`View profile of ${person.name}`}
          aria-expanded={flipped} aria-controls={profileId}>
          <img src={person.image} alt="" width="140" height="170" loading="lazy" />
          <span>View profile <span aria-hidden="true">↻</span></span>
        </button>
        <div className="team-compact-caption">
          <h3>{person.name}</h3>
          <p className="team-compact-role">{person.role}</p>
        </div>
      </div>
      <div className="team-compact-back" id={profileId} hidden={!flipped} inert={!flipped}>
        <h3>{person.name}</h3>
        <p>{person.bio}</p>
        <p className="team-compact-qualifications">{person.qualifications}</p>
        {person.website && <a href={person.website}>Xplines International <span aria-hidden="true">↗</span></a>}
        {person.trainingWebsite && <a href={person.trainingWebsite}>DIESALIHS Academy <span aria-hidden="true">↗</span></a>}
        <button type="button" className="team-compact-close" ref={backButton}
          onClick={() => turnCard(false)} aria-label={`Back to portrait of ${person.name}`}>
          <span aria-hidden="true">↶</span> Back to portrait
        </button>
      </div>
    </article>
  );
}
