import { useEffect, useRef, useState } from "react";
import FarmPlan from "./components/FarmPlan";
import FarmReadiness from "./components/FarmReadiness";
import ClassicHero from "./components/ClassicHero";
import SDGs from "./components/SDGs";
import TeamFlipCard from "./components/TeamFlipCard";
import ContactForm from "./components/ContactForm";
import { ClassicAbout, ClassicVision, ClassicObjectives, ClassicFounder, ClassicCommunityHistory } from "./components/ClassicSections";

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
function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
function Brand() {
  return (
    <a className="brand" href="/#hero" aria-label="Risemeup home">
      <img
        src="/logo.png"
        alt="Risemeup Sustainability"
        width="300"
        height="106"
      />
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
  const donationDialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    // Deep links may arrive before React has rendered their target section.
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, []);
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
            <a href="#hero">Home</a>
            <a href="#about">About us</a>
            <a href="#communities">Our communities</a>
            <a href="#virgin-mary-farm">Our projects</a>
            <a href="#team">Our team</a>
            <a href="/development-partners/">Partner with us</a>
            <a href="#contact">Contact</a>
            <button className="button small" onClick={() => donationDialog.current?.showModal()}>Donate</button>
          </nav>
        </div>
      </header>
      <main id="main">
        <ClassicHero />
        <ClassicAbout />
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
                  Two communities. Equal commitment.
                </h2>
              </div>
              <p>
                We listen to people whose lives have been shaped by exclusion
                and conflict, and stand alongside their determination to
                rebuild.
              </p>
            </div>
            <div className="community-stories">
              <article className="community-story">
                <span className="community-location">Belonging · Sudan</span>
                <h3>Coptic Orthodox<span>community</span></h3>
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
              <div className="community-connection" aria-hidden="true"><span>&amp;</span></div>
              <article className="community-story">
                <span className="community-location">Resilience · Sudan</span>
                <h3>Nuba Mountains<span>communities</span></h3>
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
                <a className="text-link" href="#nuba-story">
                  Read our community history →
                </a>
              </article>
            </div>
          </div>
        </section>
        <ClassicVision />
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
              <figcaption>Sudan food assistance archive · Risemeup · Photograph date unconfirmed. <a href="/crisis-response/#photo-records">About our records</a></figcaption>
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
          <aside className="container crisis-history-link" aria-labelledby="crisis-history-title">
            <div><p className="eyebrow">Our coronavirus response</p><h3 id="crisis-history-title">When there is a crisis, Risemeup steps up to help.</h3><p>Discover Iman’s pandemic work supporting a food bank and homeless shelter in London, alongside food aid for families in Sudan.</p></div>
            <a className="text-link" href="/crisis-response/">Read our coronavirus story <Arrow /></a>
          </aside>
        </section>
        <section id="virgin-mary-farm" className="section farm">
          <span className="anchor" id="projects" />
          <div className="container">
            <div className="farm-intro">
              <p className="eyebrow">Our long-term project · Our main project</p>
              <h2>Virgin Mary Farm</h2>
              <p className="farm-subtitle">Rebuilding through agriculture, clean energy and education.</p>
            </div>
            <div className="classic-farm-status"><strong><span className="status-dot" /> Rebuilding planned</strong><span>The farm is not operational due to the war. The land remains.</span></div>
            <div className="classic-farm-pillars">
              <article><span>01</span><h3>Sustainable agriculture</h3><p>Rebuild productive farming, improve food security and create opportunities for communities to earn a living.</p></article>
              <article><span>02</span><h3>Clean energy for farming</h3><p>Plan solar-powered systems and biogas to support operations, make use of organic materials and care for the land.</p></article>
              <article><span>03</span><h3>Education &amp; training</h3><p>Connect sustainable farming education with hands-on skills in growing, water management, processing and maintenance.</p></article>
            </div>
            <div className="actions"><a className="button" href="/development-partners/">Partner in rebuilding →</a><a className="button outline" href="/mango-project/">Read the Mango proposal</a></div>
            <FarmReadiness />
            <p className="classic-farm-context">Virgin Mary Farm is the heart of Risemeup’s long-term work in Omdurman, Khartoum. The latest land-development concept proposes a 50-hectare site. The original proposal sets out the four connected facilities below.</p>
            <FarmPlan />
            <details className="roadmap land-framework" id="land-framework">
              <summary>
                How the newer land-development concept supports the farm plan
              </summary>
              <div className="section-head">
                <div>
                  <p className="eyebrow">The development pathway</p>
                  <h3>The land-development framework.</h3>
                </div>
                <p>
                  The newer 50-hectare concept proposes three stages of land
                  development. This is a separate planning framework from the
                  four facility phases in the original proposal.
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
            </details>
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
          </div>
        </section>
        <ClassicObjectives />
        <SDGs />
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
                <h3>Education & technical partnership</h3>
                <p>
                  Help shape sustainable farming education and practical
                  training, assess the site and refine the farm plan with
                  realistic delivery milestones.
                </p>
                <a className="text-link" href="#farming-education">
                  Explore education & training <Arrow />
                </a>
              </article>
            </div>
            <div className="partner-note">
              <p>
                <strong>A clear starting point for partners.</strong> Read the
                current farm status, proposed first stage, equipment needs and
                budget status, or download our dated two-page rebuilding brief.
              </p>
              <a className="button" href="/development-partners/">
                View partner information <Arrow />
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
            <p className="team-flip-instructions">Select a portrait to turn the card and read the profile.</p>
            <div className="team-grid">
              {team.map((person) => (
                <TeamFlipCard person={person} key={person.name} />
              ))}
            </div>
          </div>
        </section>
        <ClassicFounder />
        <ClassicCommunityHistory />
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
                <button className="button" onClick={() => donationDialog.current?.showModal()}>
                  Enquire about a donation <Arrow />
                </button>
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
              of your support and the available arrangements. Risemeup is not
              currently registered in the UK. <a href="/development-partners/#accountability">Read our organisation and accountability status.</a>
            </p>
          </div>
        </section>
        <section id="contact" className="section">
          <div className="container">
            <div className="section-head"><p className="eyebrow">Get in touch</p><h2>Let’s put your support to work.</h2><p>Whether you can help with food assistance, equipment, expertise or a development partnership, we would like to hear from you.</p></div>
            <div className="contact-grid">
              <div className="classic-contact-copy">
                <h3>A conversation is a good place to start.</h3>
                <p>Tell us about your organisation, your interests, or how you would like to help.</p>
                <address className="classic-contact-details">
                  <div><span aria-hidden="true">⌖</span><div><strong>Our address</strong><span>2 Rosecroft Gardens<br />London, NW2 6HX, United Kingdom</span></div></div>
                  <div><span aria-hidden="true">✉</span><div><strong>Email us</strong><a href={`mailto:${email}`}>{email}</a></div></div>
                  <div><span aria-hidden="true">☎</span><div><strong>Call us</strong><a href="tel:+447867977844">+44 786 797 7844</a></div></div>
                </address>
                <div className="classic-contact-note"><p className="eyebrow">Two ways to help</p><p>Support food assistance now, or work with us on the long-term rebuilding of Virgin Mary Farm.</p></div>
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
          </div>
        </section>
      </main>
      <footer>
        <div className="container footer-grid">
          <div>
            <Brand />
            <p className="brand-slogan">Think globally, act locally.</p>
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
            <a href="#sdgs">UN Sustainable Development Goals</a>
            <a href="/crisis-response/">Our coronavirus response</a>
            <a href="/mango-project/">Mango subproject</a>
          </nav>
          <nav aria-label="Get involved">
            <a href="#team">Our team</a>
            <a href="/development-partners/">For development partners</a>
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
      <a className="classic-back-top" href="#hero" aria-label="Back to top">↑</a>
      <dialog ref={donationDialog} className="classic-donation-dialog" aria-labelledby="donation-title" onClick={event => { if (event.target === event.currentTarget) donationDialog.current?.close(); }}>
        <button className="dialog-close" aria-label="Close donation information" onClick={() => donationDialog.current?.close()}>×</button>
        <p className="eyebrow">Food assistance</p><h2 id="donation-title">Support families today.</h2>
        <p>Your support can help families in Sudan’s Coptic Orthodox and Nuba Mountains communities access food and essential supplies.</p>
        <hr /><h3>Arrange a donation with the team.</h3><p>Please contact us to discuss the purpose of your support and the available arrangements. This website does not take payments.</p>
        <a className="button" href={`mailto:${email}?subject=Food%20assistance%20support`}>Email about a donation →</a>
        <div className="dialog-contact"><a href={`mailto:${email}`}>{email}</a><a href="tel:+447867977844">+44 786 797 7844</a><a href="#contact" onClick={() => donationDialog.current?.close()}>Use our contact form →</a></div>
        <p className="dialog-farm-link">Interested in longer-term recovery? <a href="#partnership" onClick={() => donationDialog.current?.close()}>Explore farm partnerships →</a></p>
      </dialog>
    </>
  );
}
