import { useId, useRef, useState } from "react";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  bio: string;
  qualifications: string;
  website?: string;
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
    <article
      className={`team-flip-card${flipped ? " is-flipped" : ""}`}
      aria-label={person.name}
      onKeyDown={(event) => {
        if (event.key === "Escape" && flipped) {
          event.preventDefault();
          turnCard(false);
        }
      }}
    >
      <div className="team-flip-inner">
        <div className="team-flip-front" aria-hidden={flipped} inert={flipped}>
          <button
            type="button"
            className="team-flip-open"
            ref={frontButton}
            onClick={() => turnCard(true)}
            aria-label={`View profile of ${person.name}`}
            aria-expanded={flipped}
            aria-controls={profileId}
          >
            <img src={person.image} alt="" width="400" height="460" loading="lazy" />
            <span className="team-flip-caption">
              <span className="team-flip-role">{person.role}</span>
              <span className="team-flip-name">{person.name}</span>
              <span className="team-flip-hint">View profile <span aria-hidden="true">↻</span></span>
            </span>
          </button>
        </div>
        <div className="team-flip-back" id={profileId} aria-hidden={!flipped} inert={!flipped}>
          <p className="team-flip-role">{person.role}</p>
          <h3>{person.name}</h3>
          <p>{person.bio}</p>
          <p className="team-flip-qualifications">{person.qualifications}</p>
          {person.website && (
            <a className="text-link" href={person.website}>
              Xplines International <span aria-hidden="true">↗</span>
            </a>
          )}
          <button
            type="button"
            className="team-flip-close"
            ref={backButton}
            onClick={() => turnCard(false)}
            aria-label={`Back to portrait of ${person.name}`}
          >
            <span aria-hidden="true">↶</span> Back to portrait
          </button>
        </div>
      </div>
    </article>
  );
}
