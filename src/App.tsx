import './components/FarmEstate.css';
import { useEffect, useRef, useState } from "react";
import FarmPlan from "./components/FarmPlan";
import FarmReadiness from "./components/FarmReadiness";
import FarmRoadmap from "./components/FarmRoadmap";
import ClassicHero from "./components/ClassicHero";
import SDGs from "./components/SDGs";
import TeamFlipCard from "./components/TeamFlipCard";
import ContactForm from "./components/ContactForm";
import { ClassicAbout, ClassicVision, ClassicObjectives, ClassicFounder, ClassicCommunityHistory } from "./components/ClassicSections";

const email = "i.tadros@risemeup.org";
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
    name: "Dr. Eng. Khalid Salih",
    role: "Renewable energy & training",
    image: "/team-khalid-new-portrait.jpg",
    bio: "Renewable energy and workforce-training expertise. Former university lecturer in Berlin, Xplines International founder and DIESALIHS chairman.",
    qualifications: "PhD in Control Engineering",
    website: "https://www.xplines.org/",
    trainingWebsite: "https://www.diesalihs.com/#academy",
  },
  {
    name: "Dr. Munir G. Botrus",
    role: "Agricultural safety & crop protection",
    image: "/team-2-munir.png",
    bio: "Crop protection and agricultural safety expertise, drawing on 15 years of experience with FAO/UN.",
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
export default function App() {
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
        Standing with Sudan’s Coptic Orthodox, Nuba Mountains and Blue Nile communities{" "}
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
                Since April 2023, war has uprooted lives and devastated
                communities across Sudan.
              </p>
              <p>
                For the people we support, the losses reach beyond homes and
                income. Families have been displaced, food has become harder to
                access, and churches have been damaged, burned, destroyed or
                occupied. These places hold faith, memories and community
                life—their loss is felt far beyond their walls.
              </p>
              <p>
                Sudan’s Coptic Orthodox, Nuba Mountains and Blue Nile communities have
                endured immense suffering, often with little international
                attention. Risemeup stands alongside them, providing food
                assistance today while working towards lasting recovery,
                dignity and hope.
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
            <div className="section-head"><div><h2>Three communities. Equal commitment.</h2></div><p>Standing with Sudan’s Coptic Orthodox, Nuba Mountains and Blue Nile communities through food assistance and a shared commitment to recovery.</p></div>
            <div className="community-stories">
              <article className="community-story"><span className="community-location">Belonging · Sudan</span><h3>Coptic Orthodox<span>community</span></h3><p>Sudan’s Coptic Orthodox families are part of the country’s social and spiritual life. War has separated families, disrupted livelihoods and threatened churches and community spaces.</p><p>This is our founder’s own community. Risemeup brings that personal connection to practical support for families facing displacement and uncertainty.</p><a className="text-link" href="#relief">Supporting families now →</a></article>
              <article className="community-story"><span className="community-location">Resilience · South Kordofan</span><h3>Nuba Mountains<span>communities</span></h3><p>The Nuba Mountains are home to diverse communities with deep ties to land and farming. Decades of conflict and displacement have interrupted education, food production and everyday life.</p><p>Our commitment is to help people rebuild through food security, practical training and opportunities to earn a living.</p><a className="text-link" href="#nuba-story">Read our community history →</a></article>
              <article className="community-story"><span className="community-location">Dignity · Blue Nile</span><h3>Blue Nile<span>communities</span></h3><p>Blue Nile’s communities have endured attacks on civilians, destroyed villages and forced displacement. Conflict has uprooted families from their homes and farmland, disrupting food supplies, education and community life.</p><p>Risemeup stands alongside them, recognising their suffering and their right to safety, dignity and a voice in shaping their future.</p><a className="text-link" href="#relief">Supporting families now →</a></article>
            </div>
            <section className="three-community-purpose" aria-labelledby="shared-community-purpose"><p className="eyebrow">Our shared purpose</p><h3 id="shared-community-purpose">Food, skills and the opportunity to rebuild.</h3><p>Our commitment embraces all three communities. Alongside food assistance, our vision for Virgin Mary Farm brings together sustainable farming, clean energy, education and practical training, with women affected by war at the heart of the planned rebuilding.</p></section>
            <details className="three-community-sources"><summary>Historical background for the Blue Nile introduction</summary><p>Amnesty International’s <a href="https://www.amnesty.org/en/documents/AFR54/011/2013/en/" target="_blank" rel="noopener noreferrer">2013 Blue Nile report</a> documents war crimes, attacks on civilians and denial of humanitarian access. Its <a href="https://www.amnesty.org.uk/knowledge-hub/all-resources/sudan-new-evidence-scorched-earth-tactics-blue-nile/" target="_blank" rel="noopener noreferrer">accompanying account</a> describes destroyed villages and forced displacement. This background concerns documented events from the conflict beginning in 2011.</p></details>
          </div>
        </section>
        <ClassicVision />
        <section id="relief" className="section">
          <div className="container relief-grid">
            <figure className="photo">
              <img
                src="/crisis-response/photos/sudan-food-staples.jpg"
                alt="Bags of dry food staples beside a bottle of cooking oil"
                width="967"
                height="1536"
                loading="lazy"
              />
              <figcaption>Sudan food assistance archive · Risemeup · Photograph date unconfirmed. <a href="/crisis-response/#photo-records">About our records</a></figcaption>
            </figure>
            <div>
              
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
            <div><p className="eyebrow">Our story of practical support</p><h3 id="crisis-history-title">Practical help, when it matters.</h3><p>From pandemic food support in London to assistance for families in Sudan, discover the work behind Risemeup.</p></div>
            <a className="text-link" href="/crisis-response/">Read our support story <Arrow /></a>
          </aside>
        </section>
        <section id="virgin-mary-farm" className="section farm farm-estate-intro">
          <span className="anchor" id="projects" />
          <div className="rm-estate-band">
            <div className="container">
              <div className="rm-estate-top"><span>Omdurman · Sudan</span></div>
              <div className="rm-estate-title">
                <p className="rm-estate-kicker">The heart of Risemeup’s vision</p>
                <h2>Virgin Mary <em>Farm.</em></h2>
                <p className="rm-estate-subtitle">Rebuilding through agriculture, clean energy and education.</p>
                <div className="rm-estate-flourish" aria-hidden="true"><span /><svg viewBox="0 0 40 48" fill="none" stroke="currentColor" strokeWidth="1"><path d="M20 46V18M20 33C6 33 3 24 4 15c12 0 16 8 16 18Zm0-10C34 22 36 12 34 4c-10 1-14 7-14 19Z" /><path d="m20 33-10-12m10 1 10-12" /></svg><span /></div>
              </div>
              <div className="rm-estate-status"><strong>Rebuilding planned</strong></div>
              <article className="rm-farm-introduction" aria-labelledby="farm-intro-title"><h3 id="farm-intro-title">Rooted in community. Rebuilding with hope.</h3><p>For generations, Sudan’s Coptic Orthodox community has been part of the country’s life and history. Since the introduction of Sharia-based laws in September 1983, the community has faced periods of discrimination and restrictions on religious freedom. The war that began in April 2023 has brought renewed attacks on churches and clergy.</p><p>Virgin Mary Farm in Omdurman belongs to the Coptic Orthodox Church in Sudan. Destroyed during the war, it is at the heart of Risemeup’s vision for recovery. We aim to rebuild it as a place where women and families from the Coptic Orthodox, Nuba Mountains and Blue Nile communities can grow food, learn practical skills and rebuild their livelihoods.</p><details><summary>Background sources</summary><p>Historical context: <a href="https://www.uscirf.gov/sites/default/files/resources/Sudan%20Policy%20Brief%2011%207%2013%20FINAL.pdf" target="_blank" rel="noopener">USCIRF, 2013</a>. Community background: <a href="https://www.uscirf.gov/sites/default/files/Sudan%20Policy%20Update.pdf" target="_blank" rel="noopener">USCIRF, 2017</a> and <a href="https://www.uscirf.gov/news-room/releases-statements/uscirf-sounds-alarm-attacks-against-religious-communities-sudan" target="_blank" rel="noopener">USCIRF, April 2024</a>. Farm ownership and wartime damage are based on information provided by Risemeup’s founder. The farm is not currently operational; rebuilding is planned.</p></details></article>
              <div className="rm-estate-pillars">
                <article><h3>Sustainable agriculture.</h3><p>Rebuild productive farming, improve food security and create opportunities for communities to earn a living.</p></article>
                <article><h3>Clean energy for farming.</h3><p>Plan solar-powered systems and biogas to support operations, make use of organic materials and care for the land.</p></article>
                <article><h3>Education &amp; training.</h3><p>Connect sustainable farming education with hands-on skills in growing, water management, processing and maintenance.</p></article>
              </div>
              <div className="rm-estate-actions"><a className="rm-estate-primary" href="/development-partners/">Partner in rebuilding <span aria-hidden="true">↗</span></a></div>
              <a className="rm-mango-mini" id="mango-project-link" href="/mango-project/"><img src="/mango-selected-photo-six.svg" alt="" width="40" height="40" /><span>Mango Project ↗</span></a>
              <div className="rm-estate-foot"><p>Women and girls at the heart of the vision.</p><a href="#farm-women-title" aria-label="Read about women and girls at the heart of Virgin Mary Farm">↓</a></div>
            </div>
          </div>
          <div className="farm-women-surround">
            <div className="container">
            <section className="farm-women" aria-labelledby="farm-women-title">
              <p className="eyebrow">Women and girls at the heart of Virgin Mary Farm</p>
              <h3 id="farm-women-title">A place to rebuild lives.<br /><em>A future to grow together.</em></h3>
              <p className="women-slogan">Rooted in dignity. Growing in strength. Rebuilding futures.</p>
              <p>Our main purpose is to help women affected by Sudan’s war rebuild their lives — including survivors of sexual violence, women whose husbands have been killed, and mothers raising children alone.</p>
              <p>We envision a farm where women can learn practical skills, earn an income and support their families. Sustainable farming education and shared community life would help them build independence and shape their own futures.</p>
              <p>For girls and young women, we plan education and skills opportunities that build confidence and widen future choices. Girls’ learning will be age-appropriate, supervised and designed to support their safety and continued schooling.</p>
              <p className="women-plan-note">This is our planned purpose as we work towards rebuilding. Women from all three communities would help shape the programme. Participation should never require sharing a personal experience of violence. Farming and community support do not replace specialist care; we welcome women’s organisations and qualified support partners to help develop an appropriate approach.</p>
              <a className="text-link" href="/development-partners/#women">Help develop this vision →</a>
            </section>
            </div>
          </div>
          <div className="farm-readiness-surround">
            <div className="container">
              <FarmReadiness />
            </div>
          </div>
          <FarmPlan />
          <div className="farm-roadmap-surround">
            <div className="container">
              <FarmRoadmap />
            </div>
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
                  Help assess the site, design the first water system and develop
                  practical training for the people who will operate it.
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
                Expertise in agriculture, renewable energy and training, alongside
                partnerships and outreach, supports Risemeup’s development vision.
              </p>
            </div>
            <p className="team-flip-instructions">Select a portrait to turn the card and read the profile.</p>
            <div className="team-grid">
              {team.map((person) => (
                <TeamFlipCard person={person} key={person.name} />
              ))}
            </div>
            <article className="team-outreach-card" aria-labelledby="sally-team-name">
              <img className="team-outreach-portrait" src="/team-sally-zaki-gabrah.png" alt="Sally Zaki Gabrah" width="140" height="170" loading="lazy" />
              <div>
                <p className="eyebrow">Partnerships &amp; outreach</p>
                <h3 id="sally-team-name">Sally Zaki Gabrah</h3>
                <p className="team-outreach-role">Partnerships &amp; Outreach Representative</p>
                <p className="team-outreach-bio">Helping introduce Risemeup to potential partners and supporters, and building connections for its work with communities in Sudan.</p>
                <a href="mailto:s.gabrah@risemeup.org">s.gabrah@risemeup.org <span aria-hidden="true">↗</span></a>
              </div>
            </article>
          </div>
        </section>
        <ClassicFounder />
        <ClassicCommunityHistory />
        <section id="donate" className="section support">
          <div className="container">
            <p className="eyebrow">Support Risemeup</p>
            <h2>
              Stand with families.
              <br />
              <em>Be part of their recovery.</em>
            </h2>
            <p className="lead">Choose the work you would like to support.</p>
            <div className="support-grid">
              <article>
                <span>Food assistance</span>
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
                <span>Virgin Mary Farm</span>
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
            <div className="section-head"><p className="eyebrow">Get in touch</p><h2>Let’s put your support to work.</h2><p>Help provide food, share your expertise or support the farm’s rebuilding. We’d love to hear from you.</p></div>
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
              <ContactForm />
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
              Standing with communities.
              <br />
              Working towards lasting recovery.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <a href="#vision-mission">Vision & mission</a>
            <a href="#communities">Our communities</a>
            <a href="#virgin-mary-farm">Virgin Mary Farm</a>
            <a href="#sdgs">UN Sustainable Development Goals</a>
            <a href="/crisis-response/">Our support story</a>
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
        <p>Your support can help families in Sudan’s Coptic Orthodox, Nuba Mountains and Blue Nile communities access food and essential supplies.</p>
        <hr /><h3>Arrange a donation with the team.</h3><p>Please contact us to discuss the purpose of your support and the available arrangements. This website does not take payments.</p>
        <a className="button" href={`mailto:${email}?subject=Food%20assistance%20support`}>Email about a donation →</a>
        <div className="dialog-contact"><a href={`mailto:${email}`}>{email}</a><a href="tel:+447867977844">+44 786 797 7844</a><a href="#contact" onClick={() => donationDialog.current?.close()}>Prepare an email enquiry →</a></div>
        <p className="dialog-farm-link">Interested in longer-term recovery? <a href="#partnership" onClick={() => donationDialog.current?.close()}>Explore farm partnerships →</a></p>
      </dialog>
    </>
  );
}
