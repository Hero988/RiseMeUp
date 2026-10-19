import { useEffect, useRef, useState } from "react";
import ContactForm from "./components/ContactForm";

const email = "i.tradros@risemeup.org";
const team = [
  {
    name: "Prof. Dr. Elamin Ali Ahmed",
    role: "Fruit & vegetable production",
    image: "/team-1-elamin.png",
    bio: "Agricultural expertise guiding horticulture and the Mango Project.",
    qualifications:
      "PhD, INRA, France · MSc, University of Gezira · BSc, University of Khartoum",
  },
  {
    name: "Dr. Engr. Khalid Salih",
    role: "Renewable energy & infrastructure",
    image: "/team-4-khalid.jpeg",
    bio: "Founder of Xplines International, bringing expertise in energy and integrated infrastructure.",
    qualifications: "PhD in Control Engineering",
    website: "https://www.xplines.org/",
  },
  {
    name: "Dr. Munir G. Botrus",
    role: "Agricultural safety & crop protection",
    image: "/team-2-munir.png",
    bio: "15 years of experience with FAO/UN in pesticide application and agricultural safety.",
    qualifications: "PhD, University of London · BSc, Agricultural Science",
  },
  {
    name: "Dr. Mohammed A. F. Khames",
    role: "Seed pathology",
    image: "/team-3-mohammed.png",
    bio: "Seed pathology expertise and international research experience across Europe and Africa.",
    qualifications: "PhD, Giessen University · MSc, Aberdeen · BSc, Cairo",
  },
];
const pillars = [
  [
    "01",
    "Grow food",
    "Greenhouses, open-field crops, nurseries and demonstration plots to rebuild food production.",
  ],
  [
    "02",
    "Power recovery",
    "Solar energy, irrigation and water infrastructure to support reliable farm operations.",
  ],
  [
    "03",
    "Keep more value locally",
    "Storage, washing, grading, packing and processing to reduce losses and support livelihoods.",
  ],
  [
    "04",
    "Build skills",
    "Practical agricultural training, with opportunities for young people and women.",
  ],
  [
    "05",
    "Use resources wisely",
    "Composting and biogas proposals to turn agricultural waste into useful inputs.",
  ],
  [
    "06",
    "Create livelihoods",
    "A staged route towards employment, local enterprise and a farm that can sustain its work.",
  ],
];
function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
function Brand() {
  return (
    <a className="brand" href="/#hero" aria-label="Risemeup home">
      <svg viewBox="0 0 40 44" fill="none" aria-hidden="true">
        <path
          d="M20 39V16M20 27C8 28 4 18 5 12c10 0 15 5 15 15ZM20 20C19 9 26 3 35 3c0 11-6 17-15 17Z"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          d="M4 39c10-6 22-6 32 0"
          stroke="currentColor"
          strokeWidth="2.5"
        />
      </svg>
      <span>
        Risemeup<small>People. Land. Food. Opportunity.</small>
      </span>
    </a>
  );
}
export default function App({
  hasContactBackend = false,
}: {
  hasContactBackend?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (menuOpen && event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="announcement">
        Standing with Sudan’s Coptic Orthodox and Nuba Mountains communities{" "}
        <a href="#sudan-crisis">
          Why our work matters <Arrow />
        </a>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <button
            ref={menuButton}
            className="menu-button"
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Close" : "Menu"}{" "}
            <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
          </button>
          <nav
            id="main-nav"
            aria-label="Main navigation"
            className={menuOpen ? "is-open" : ""}
            onClick={() => setMenuOpen(false)}
          >
            <a href="#about">About</a>
            <a href="#communities">Our communities</a>
            <a href="#virgin-mary-farm">Virgin Mary Farm</a>
            <a href="#team">Our team</a>
            <a href="#contact">Partner with us</a>
            <a href="#donate" className="button small">
              Support our work <Arrow />
            </a>
          </nav>
        </div>
      </header>
      <main id="main">
        <section className="hero" id="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                Sudan · Relief today. Recovery for tomorrow.
              </p>
              <h1>
                Forgotten by the world.
                <br />
                <em>Not by us.</em>
              </h1>
              <p className="lead">
                Standing with Sudan’s Coptic Orthodox and Nuba Mountains
                communities through war, displacement and the work of
                rebuilding.
              </p>
              <p>
                We help families access food today. Through our main project,
                Virgin Mary Farm, we are working towards a future of productive
                land, practical skills and lasting livelihoods.
              </p>
              <div className="actions">
                <a className="button" href="#virgin-mary-farm">
                  Explore Virgin Mary Farm <Arrow />
                </a>
                <a className="text-link" href="#donate">
                  Support families today →
                </a>
              </div>
            </div>
            <figure className="hero-photo">
              <img
                src="/sudan-crisis-8.jpeg"
                alt="Bowls of prepared food arranged for community food assistance"
                width="960"
                height="1280"
                fetchPriority="high"
              />
              <figcaption>
                <span>From our food assistance archive</span>
                <strong>Care begins with a meal.</strong>
              </figcaption>
            </figure>
          </div>
          <div className="container hero-bottom">
            <span>Community rooted. London based. Sudan focused.</span>
            <a href="#sudan-crisis">Understand the need ↓</a>
          </div>
        </section>
        <section id="sudan-crisis" className="section crisis">
          <div className="container two-col">
            <div>
              <p className="eyebrow">The war in Sudan</p>
              <h2>
                Homes lost.
                <br />
                Churches burned.
                <br />
                <em>Communities uprooted.</em>
              </h2>
            </div>
            <div className="prose">
              <p className="lead">
                Since April 2023, war has torn apart families, livelihoods and
                places of refuge across Sudan.
              </p>
              <p>
                For the communities we support, the loss is deeply personal.
                Families have been displaced, food and income have become
                uncertain, and churches have been damaged, burned, destroyed or
                occupied. These are places of worship, belonging and mutual
                support; their loss reaches far beyond the buildings.
              </p>
              <p>
                The Coptic Orthodox community and the people of the Nuba
                Mountains have endured immense suffering, often with little
                international attention. Their stories, dignity and future must
                not be forgotten.
              </p>
              <div className="source-note">
                Background:{" "}
                <a href="https://www.unocha.org/sudan">
                  UN OCHA’s Sudan response
                </a>{" "}
                ·{" "}
                <a href="https://www.csw.org.uk/2024/01/15/press/6147/article.htm">
                  CSW reporting on attacks on churches
                </a>
              </div>
            </div>
          </div>
        </section>
        <section id="communities" className="section cream">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow">Our communities</p>
                <h2>
                  Two communities.
                  <br />
                  <em>One shared commitment.</em>
                </h2>
              </div>
              <p>
                We listen to people whose lives have been shaped by exclusion
                and conflict, and stand alongside their determination to
                rebuild.
              </p>
            </div>
            <div className="community-grid">
              <article className="community-card">
                <span className="card-number">01 / Belonging</span>
                <h3>The Coptic Orthodox community</h3>
                <p>
                  Sudan’s Coptic Orthodox families are part of the country’s
                  social and spiritual life. War has separated families,
                  disrupted livelihoods and threatened churches and community
                  spaces.
                </p>
                <p>
                  This is our founder’s own community. Risemeup brings that
                  personal connection to practical support for families facing
                  displacement and uncertainty.
                </p>
                <a className="text-link" href="#relief">
                  Supporting families now →
                </a>
              </article>
              <article className="community-card">
                <span className="card-number">02 / Resilience</span>
                <h3>The Nuba Mountains communities</h3>
                <p>
                  The Nuba Mountains in South Kordofan are home to diverse
                  communities with deep ties to land and farming. Decades of
                  conflict and displacement have interrupted education, food
                  production and everyday life.
                </p>
                <p>
                  Our original vision grew from a commitment to these
                  communities: helping people rebuild through food security,
                  training and opportunities to earn a living.
                </p>
                <a className="text-link" href="#virgin-mary-farm">
                  A pathway towards recovery →
                </a>
              </article>
            </div>
          </div>
        </section>
        <section id="relief" className="section">
          <div className="container relief-grid">
            <figure className="photo">
              <img
                src="/sudan-crisis-7.jpeg"
                alt="Food portions packed in bags for community support"
                width="960"
                height="1280"
                loading="lazy"
              />
              <figcaption>Food assistance archive · Risemeup</figcaption>
            </figure>
            <div>
              <p className="eyebrow">What we are doing now</p>
              <h2>
                Food today.
                <br />
                <em>Dignity, always.</em>
              </h2>
              <p className="lead">
                With support from friends, families and our wider community, we
                help families affected by the war access food and essential
                supplies.
              </p>
              <p>
                Our work includes preparing meals and organising food assistance
                through trusted community connections. We support as many
                families as available resources and access allow.
              </p>
              <p>
                This immediate response continues alongside our longer-term
                ambition to rebuild Virgin Mary Farm.
              </p>
              <a className="button" href="#donate">
                Ask how to support food assistance <Arrow />
              </a>
            </div>
          </div>
        </section>
        <section id="virgin-mary-farm" className="section farm">
          <span className="anchor" id="projects" />
          <div className="container">
            <div className="farm-intro">
              <div>
                <p className="eyebrow">
                  Our main project · Omdurman, Khartoum, Sudan
                </p>
                <h2>Virgin Mary Farm</h2>
                <p className="farm-subtitle">From recovery to resilience.</p>
              </div>
              <div className="status">
                <span className="status-dot" /> Rebuilding proposal
                <br />
                <small>The farm is not currently operational.</small>
              </div>
            </div>
            <div className="two-col farm-story">
              <p className="lead">
                War destroyed the farm.
                <br />
                It did not destroy the vision.
              </p>
              <div>
                <p>
                  Virgin Mary Farm is the heart of Risemeup’s long-term work.
                  The land remains, and our aim is to rebuild an integrated farm
                  that brings together food production, clean energy, processing
                  and practical training.
                </p>
                <p>
                  The latest concept proposes a{" "}
                  <strong>50-hectare development in three phases</strong>. It is
                  a plan for recovery, requiring partners, site assessment,
                  resources and conditions that allow work to proceed safely.
                </p>
                <a className="button light" href="#partnership">
                  Help rebuild Virgin Mary Farm <Arrow />
                </a>
              </div>
            </div>
            <div className="pillar-grid">
              {pillars.map(([number, title, text]) => (
                <article key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
            <div className="roadmap" id="objectives">
              <div className="section-head">
                <div>
                  <p className="eyebrow">The development pathway</p>
                  <h3>One farm. Three stages.</h3>
                </div>
                <p>
                  Indicative sequencing from the latest project concept. Timing
                  depends on feasibility, security and funding.
                </p>
              </div>
              <div className="phase-grid">
                <article>
                  <span className="phase-number">01</span>
                  <h4>Foundation</h4>
                  <p className="phase-meta">15 hectares · Proposed years 1–2</p>
                  <p>
                    Prepare land and infrastructure; establish greenhouses,
                    open-field crops, a nursery, solar power, irrigation and
                    basic storage.
                  </p>
                </article>
                <article>
                  <span className="phase-number">02</span>
                  <h4>Expansion</h4>
                  <p className="phase-meta">
                    20 additional hectares · Proposed years 3–4
                  </p>
                  <p>
                    Expand production and water systems; add energy storage,
                    washing, grading, packing and cold storage.
                  </p>
                </article>
                <article>
                  <span className="phase-number">03</span>
                  <h4>Consolidation</h4>
                  <p className="phase-meta">
                    15 additional hectares · Proposed years 5–6
                  </p>
                  <p>
                    Diversify crops, improve processing, develop compost and
                    biogas capacity, and establish a training and innovation
                    centre.
                  </p>
                </article>
              </div>
              <p className="fine-print">
                These are proposed activities, not completed infrastructure or a
                promise of future returns. Costs, outputs and operating
                assumptions need review with technical and development partners.
              </p>
            </div>
            <a className="mango-callout" href="/mango-project/">
              <img
                src="/mango-hero.jpg"
                alt="Mangoes illustrating the proposed Mango Project"
                width="160"
                height="120"
                loading="lazy"
              />
              <div>
                <p className="eyebrow">
                  A supporting project within Virgin Mary Farm
                </p>
                <h3>
                  The Mango Project <Arrow />
                </h3>
                <p>
                  A proposed route to better handling, packing and value for
                  Sudanese mangoes.
                </p>
              </div>
            </a>
            <details className="archive-detail">
              <summary>How the original farm vision informs this plan</summary>
              <p>
                The original proposal brought together greenhouses, biogas,
                sorting and packaging, poultry, agricultural jobs and training.
                The updated three-phase concept keeps food production, energy
                and skills at its centre. Poultry remains an option for future
                technical review; earlier capacity figures are not current
                operations or confirmed targets.
              </p>
            </details>
          </div>
        </section>
        <section id="about" className="section cream">
          <div className="container">
            <div className="two-col">
              <div>
                <p className="eyebrow">About Risemeup</p>
                <h2>
                  Rooted in community.
                  <br />
                  <em>Built around people.</em>
                </h2>
              </div>
              <div className="prose">
                <p className="lead">
                  Risemeup is a London-based community initiative connecting
                  immediate food assistance with a longer-term vision for
                  recovery in Sudan.
                </p>
                <p>
                  Our focus is the Coptic Orthodox and Nuba Mountains
                  communities. We bring together personal commitment and
                  agricultural expertise to help families meet urgent needs and
                  rebuild the foundations of a more secure future.
                </p>
              </div>
            </div>
            <div className="vision-grid" id="vision-mission">
              <article id="vision">
                <p className="eyebrow">Our vision</p>
                <h3>A future people can grow.</h3>
                <p>
                  Communities affected by war able to live with dignity, access
                  nutritious food and build secure livelihoods on productive
                  land.
                </p>
              </article>
              <article id="mission">
                <p className="eyebrow">Our mission</p>
                <h3>Support today. Rebuild for tomorrow.</h3>
                <p>
                  Provide practical food assistance and work with partners to
                  rebuild Virgin Mary Farm through sustainable agriculture,
                  clean energy, skills and community opportunity.
                </p>
              </article>
            </div>
            <div className="sdg-line" id="sdgs">
              <strong>Our development priorities</strong>
              <span>Food security</span>
              <span>Clean energy</span>
              <span>Decent work</span>
              <span>Responsible production</span>
              <span>Reduced inequalities</span>
            </div>
          </div>
        </section>
        <section id="partnership" className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow">For charities & development partners</p>
                <h2>
                  Bring your expertise.
                  <br />
                  <em>Build with us.</em>
                </h2>
              </div>
              <p>
                We welcome conversations with humanitarian organisations,
                foundations, agricultural institutions and technical partners
                who share our commitment to community recovery.
              </p>
            </div>
            <div className="partner-grid">
              <article>
                <h3>Immediate relief</h3>
                <p>
                  Support food assistance and strengthen the practical response
                  to families’ needs.
                </p>
              </article>
              <article>
                <h3>Equipment & infrastructure</h3>
                <p>
                  Explore support for solar pumps, irrigation, machinery, tools,
                  storage and farm infrastructure.
                </p>
              </article>
              <article>
                <h3>Technical partnership</h3>
                <p>
                  Help assess the site, refine the farm plan, develop training
                  and establish realistic delivery milestones.
                </p>
              </article>
            </div>
            <div className="partner-note">
              <p>
                <strong>Start with a conversation.</strong> Discuss a specific
                component, its requirements and how progress would be documented
                before committing support.
              </p>
              <a className="button" href="#contact">
                Discuss a partnership <Arrow />
              </a>
            </div>
          </div>
        </section>
        <section id="team" className="section cream">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow">Our team & advisers</p>
                <h2>
                  Experience to guide
                  <br />
                  <em>the next chapter.</em>
                </h2>
              </div>
              <p>
                Expertise in horticulture, crop protection, seed science and
                renewable energy informs the farm’s development vision.
              </p>
            </div>
            <div className="team-grid">
              {team.map((person) => (
                <article className="team-card" key={person.name}>
                  <div className="team-photo">
                    <img
                      src={person.image}
                      alt={person.name}
                      width="400"
                      height="460"
                      loading="lazy"
                    />
                  </div>
                  <p className="eyebrow">{person.role}</p>
                  <h3>{person.name}</h3>
                  <p>{person.bio}</p>
                  <p className="qualifications">{person.qualifications}</p>
                  {person.website && (
                    <a className="text-link" href={person.website}>
                      Xplines International <Arrow />
                    </a>
                  )}
                </article>
              ))}
            </div>
            <div id="founder" className="founder">
              <img
                src="/founder-iman-tadros.jpg"
                alt="Iman Tadros, founder of Risemeup"
                width="400"
                height="480"
                loading="lazy"
              />
              <div>
                <p className="eyebrow">Our founder · Iman Tadros</p>
                <h3>
                  A personal commitment
                  <br />
                  to people and place.
                </h3>
                <p>
                  Iman’s work began with responding to need: supporting a food
                  bank and homeless shelter in London during the pandemic, and
                  coordinating food assistance for families in Sudan.
                </p>
                <p>
                  As a member of Sudan’s Coptic Orthodox community, she brings a
                  personal understanding of the loss caused by war. Risemeup
                  carries that commitment forward through support for both
                  communities and the ambition to rebuild Virgin Mary Farm.
                </p>
                <a className="text-link" href="#contact">
                  Connect with Iman →
                </a>
              </div>
            </div>
          </div>
        </section>
        <section id="donate" className="section support">
          <div className="container">
            <p className="eyebrow">Support Risemeup</p>
            <h2>
              Help a family today.
              <br />
              <em>Help rebuild tomorrow.</em>
            </h2>
            <p className="lead">Choose the work you would like to support.</p>
            <div className="support-grid">
              <article>
                <span>01 / Food assistance</span>
                <h3>Stand with families.</h3>
                <p>
                  Ask about contributing towards food and essential supplies for
                  families affected by Sudan’s war.
                </p>
                <a
                  className="button"
                  href={`mailto:${email}?subject=Food%20assistance%20support`}
                >
                  Enquire about a donation <Arrow />
                </a>
              </article>
              <article>
                <span>02 / Virgin Mary Farm</span>
                <h3>Be part of recovery.</h3>
                <p>
                  Discuss equipment, technical expertise or funding for a
                  defined part of the main farm project.
                </p>
                <a
                  className="button outline"
                  href={`mailto:${email}?subject=Virgin%20Mary%20Farm%20partnership`}
                >
                  Support the farm’s rebuilding <Arrow />
                </a>
              </article>
            </div>
            <p className="support-disclosure">
              Donation enquiries are handled directly by the team. This website
              does not take payments. Please contact us to discuss the purpose
              of your support and the available arrangements.
            </p>
          </div>
        </section>
        <section id="contact" className="section">
          <div className="container contact-grid">
            <div>
              <p className="eyebrow">Let’s talk</p>
              <h2>
                A conversation can
                <br />
                <em>start something lasting.</em>
              </h2>
              <p>
                Tell us about your organisation, your interests, or how you
                would like to help.
              </p>
              <address>
                <a href={`mailto:${email}`}>{email}</a>
                <a href="tel:+447867977844">+44 786 797 7844</a>
                <span>
                  2 Rosecroft Gardens
                  <br />
                  London, NW2 6HX, United Kingdom
                </span>
              </address>
            </div>
            <div className="contact-panel">
              {hasContactBackend ? (
                <ContactForm />
              ) : (
                <>
                  <h3>Contact the team</h3>
                  <p>
                    Email Iman to discuss food assistance, Virgin Mary Farm or a
                    partnership. Please include your name, organisation and area
                    of interest.
                  </p>
                  <a
                    className="button"
                    href={`mailto:${email}?subject=Risemeup%20enquiry`}
                  >
                    Open your email app <Arrow />
                  </a>
                  <p className="fine-print">
                    You can also copy the email address or call us using the
                    details alongside.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="container footer-grid">
          <div>
            <Brand />
            <p>
              Standing with forgotten communities.
              <br />
              Growing the possibility of a better tomorrow.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <a href="#vision-mission">Vision & mission</a>
            <a href="#communities">Our communities</a>
            <a href="#virgin-mary-farm">Virgin Mary Farm</a>
            <a href="/mango-project/">Mango subproject</a>
          </nav>
          <nav aria-label="Get involved">
            <a href="#team">Our team</a>
            <a href="#partnership">Partnerships</a>
            <a href="#donate">Donation enquiries</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Risemeup</span>
          <span>London · Sudan</span>
          <a href="#hero">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
