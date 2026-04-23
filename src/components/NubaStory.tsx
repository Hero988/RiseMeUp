import { useScrollReveal } from "../hooks/useScrollReveal";

interface NubaStoryProps {
  onDonate: () => void;
}

interface Frame {
  src: string;
  alt: string;
  title: string;
  caption: string;
  tag: string;
  span?: "wide" | "tall" | "regular";
}

const frames: Frame[] = [
  {
    src: "/nuba-story/displaced-region.jpeg",
    alt: "Families of the Nuba Mountain region walking with belongings on their heads after displacement.",
    title: "Nuba Mountain Region",
    caption:
      "The conflict caused at least 2 million deaths and displaced another 4 million people. Today, that number has tripled.",
    tag: "The Guardian Sun · 3rd July 2011",
    span: "wide",
  },
  {
    src: "/nuba-story/children-in-caves.jpeg",
    alt: "A child taking cover in a cave in the hills above Kauda.",
    title: "Children Take Cover in the Caves",
    caption:
      "Children hide in caves in the hills above Kauda, in the Nuba Mountains, following repeated aerial bombardment of their towns by Sudanese armed forces.",
    tag: "Testimony · Kauda",
    span: "tall",
  },
  {
    src: "/nuba-story/children-outside-cave.jpeg",
    alt: "A child holding a younger sibling outside a cave shelter in the rocks.",
    title: "Children Standing Outside the Cave Shelter",
    caption:
      "A sibling carries the next generation through the rocks — water collected, the cave their only roof.",
    tag: "Shelter · Morning",
    span: "regular",
  },
  {
    src: "/nuba-story/children-kauda-cave.jpeg",
    alt: "A group of Nuba children sheltering together under a massive rock in the Nuba Mountains.",
    title: "Hidden from the Sky",
    caption:
      "Children take cover in caves in the hills above Kauda. An entire generation grows up learning the sound of planes before the sound of peace.",
    tag: "Witness · Ongoing",
    span: "wide",
  },
  {
    src: "/nuba-story/bombed-home.jpeg",
    alt: "A mother and child returning from the cave to find their home destroyed by bombing.",
    title: "Returning to Ash",
    caption:
      "A mother and her child return from the cave to find their home bombed — a chair, some pots, and an empty horizon left behind.",
    tag: "Home · After the Bombardment",
    span: "regular",
  },
  {
    src: "/nuba-story/families-cave-shelter.jpeg",
    alt: "Many adults and children clustered together outside a cave shelter in the hills.",
    title: "When the Rocks Become Home",
    caption:
      "Whole families live under the boulders. A tarpaulin, a reed wall, and the faith that the stone above them will hold.",
    tag: "Community · Displacement",
    span: "wide",
  },
  {
    src: "/nuba-story/children-watching-sky.jpeg",
    alt: "A group of Nuba children looking upward toward the sky.",
    title: "Eyes That Learned to Watch the Sky",
    caption:
      "“Children are being traumatised. They are always looking up to the skies, asking — will the plane bomb us today?”",
    tag: "Bishop Macram Max Gassis",
    span: "tall",
  },
];

const facts = [
  {
    value: "2M+",
    label: "Deaths",
    note: "From the forgotten war; another 4M displaced — now tripled.",
  },
  {
    value: "70%",
    label: "Children",
    note: "Of this community — 10% suffer malnutrition, with no education or livelihood.",
  },
  {
    value: "67%",
    label: "In rural areas",
    note: "Of Sudan's 35.5M people live rurally; 58% of them below the poverty line.",
  },
  {
    value: "19.8%",
    label: "Rural unemployment",
    note: "24.7% for women — where work should be a root, not a rumour.",
  },
];

export default function NubaStory({ onDonate }: NubaStoryProps) {
  const introRef = useScrollReveal<HTMLDivElement>();
  const mapRef = useScrollReveal<HTMLDivElement>();
  const factsRef = useScrollReveal<HTMLDivElement>();
  const closingRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="nuba-story" className="dark-section" aria-labelledby="nuba-story-title">
      <div className="nuba-grain" aria-hidden="true" />
      <div className="nuba-vignette" aria-hidden="true" />

      <div className="container">
        <div className="nuba-intro reveal" ref={introRef}>
          <div className="nuba-slate">
            <span className="nuba-slate-mark" aria-hidden="true" />
            <span className="nuba-slate-text">Introduction — Nuba Mountain War</span>
            <span className="nuba-slate-timecode" aria-hidden="true">04:23 · Sudan</span>
          </div>

          <h2 id="nuba-story-title" className="nuba-title">
            A forgotten war,<br />
            <em>witnessed here.</em>
          </h2>

          <p className="nuba-lede">
            The Nuba Mountains rise out of South Kordofan, north of the South Sudanese border.
            For decades its people have endured bombardment, displacement, famine, and a silence
            from the rest of the world that feels almost as heavy as the violence itself.
          </p>

          <p className="nuba-lede nuba-lede-soft">
            This is why RiseMeUp exists. Before we speak about farmland or green energy, we ask you
            to sit for a moment with the community we serve — with their dignity, their grief, and
            the everyday courage that keeps them alive.
          </p>
        </div>

        <div className="nuba-map-block reveal-scale" ref={mapRef}>
          <div className="nuba-map-frame">
            <img
              src="/nuba-story/map-nuba-mountains.jpeg"
              alt="Map of South Kordofan showing the Nuba Mountains between Sudan and South Sudan, with refugee camps along the border."
              loading="lazy"
            />
            <div className="nuba-map-pin" aria-hidden="true">
              <span className="nuba-pin-dot" />
              <span className="nuba-pin-ring" />
              <span className="nuba-pin-label">Nuba Mtns</span>
            </div>
          </div>

          <div className="nuba-map-caption">
            <span className="nuba-chapter">Chapter I</span>
            <h3>Where the Nuba live</h3>
            <p>
              South Kordofan, between the Darfur line and Ethiopia, above the border with South
              Sudan. A region of black granite mountains, dry riverbeds, and villages that still
              remember their names in Tira, Moro, and Otoro.
            </p>
            <ul className="nuba-place-list">
              <li><span>Country</span><strong>Sudan</strong></li>
              <li><span>State</span><strong>South Kordofan</strong></li>
              <li><span>Region</span><strong>Nuba Mountains</strong></li>
              <li><span>Nearest camp</span><strong>Yida &middot; Unity (SS)</strong></li>
            </ul>
          </div>
        </div>

        <div className="nuba-frames" role="list">
          {frames.map((frame, idx) => (
            <figure
              key={frame.src}
              className={`nuba-frame nuba-frame--${frame.span ?? "regular"} reveal`}
              style={{ transitionDelay: `${(idx % 3) * 0.08}s` }}
              role="listitem"
            >
              <div className="nuba-frame-media">
                <img src={frame.src} alt={frame.alt} loading="lazy" />
                <span className="nuba-frame-number" aria-hidden="true">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <figcaption className="nuba-frame-caption">
                <span className="nuba-frame-tag">{frame.tag}</span>
                <h4>{frame.title}</h4>
                <p>{frame.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="nuba-quote reveal">
          <svg className="nuba-quote-mark" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M14 10c-5 3-9 9-9 17 0 7 4 11 9 11s8-3 8-8c0-4-3-7-7-7-1 0-2 0-3 1 0-5 2-9 7-12l-5-2zm20 0c-5 3-9 9-9 17 0 7 4 11 9 11s8-3 8-8c0-4-3-7-7-7-1 0-2 0-3 1 0-5 2-9 7-12l-5-2z" />
          </svg>
          <blockquote>
            Children are being traumatised. They are always looking up to the skies,
            asking — <em>"Will the plane bomb us today?"</em>
          </blockquote>
          <cite>
            <strong>Bishop Macram Max Gassis</strong>
            <span>Emeritus Bishop of El Obeid, on the Nuba Mountains</span>
          </cite>
        </div>

        <div className="nuba-facts" ref={factsRef}>
          <h3 className="nuba-facts-title reveal">The weight, in numbers.</h3>
          <p className="nuba-facts-sub reveal">
            From IFAD (International Fund for Agriculture Development), UNHCR reports, and reporting
            on the Nuba Mountains. Dates may age — the suffering, unfortunately, has not.
          </p>
          <div className="nuba-facts-grid">
            {facts.map((f, i) => (
              <article
                key={f.label}
                className="nuba-fact-card reveal"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <span className="nuba-fact-value">{f.value}</span>
                <span className="nuba-fact-label">{f.label}</span>
                <p className="nuba-fact-note">{f.note}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="nuba-closing reveal" ref={closingRef}>
          <div className="nuba-closing-inner">
            <span className="nuba-chapter nuba-chapter--warm">Chapter II · Why we rise</span>
            <h3>
              Bombs took their homes. Drought took their harvest.<br />
              <em>We refuse to let silence take the rest.</em>
            </h3>
            <p>
              RiseMeUp is not a photograph, and it is not a headline. It is 130 acres of dry land in
              the Nuba Mountains being turned — slowly, deliberately, by the community itself — into
              farms, orchards, and greenhouses. Food instead of fear. Work instead of waiting.
              Dignity in place of disappearance.
            </p>
            <div className="nuba-closing-actions">
              <button className="btn-primary nuba-donate-cta" onClick={onDonate}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
                Stand with the Nuba
              </button>
              <a className="nuba-learn-link" href="#projects">
                See the projects <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <p className="nuba-signoff">Committed to grow communities.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
