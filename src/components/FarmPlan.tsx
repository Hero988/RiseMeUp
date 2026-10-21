export default function FarmPlan() {
  return (
    <div className="farm-plan" id="farm-plan">
      <div className="section-head">
        <div>
          <p className="eyebrow">Our full vision · Original 2018 proposal</p>
          <h3>What we plan to build.</h3>
        </div>
        <p>
          Four connected parts of one farm: renewable energy, food production,
          produce handling and poultry, supported by sustainable farming
          education and practical training across the whole project.
        </p>
      </div>
      <p className="plan-status">
        Historical proposal · The farm is not currently operational. These
        facilities describe our long-term vision, not the immediate rebuilding
        sequence. Our <a href="/development-partners/#first-stage">current proposed first stage</a> focuses on assessment and restoring water access.
      </p>
      <div className="farm-plan-grid">
        <article className="farm-plan-card" id="biogas-plant">
          <figure>
            <img
              src="/biogas-plant.jpeg"
              alt="Concept illustration of the proposed Virgin Mary Farm biogas plant"
              width="1024"
              height="658"
              loading="lazy"
            />
            <figcaption>
              Biogas plant concept from the project materials
            </figcaption>
          </figure>
          <div className="farm-plan-body">
            <p className="eyebrow">
              Phase 1 in the original proposal · Renewable energy
            </p>
            <h4>Biogas plant</h4>
            <p className="plan-output">Electricity · Gas · Fertiliser</p>
            <p>
              We plan to build a biogas plant that turns agricultural residues,
              manure and other organic farm materials into useful energy and
              fertiliser.
            </p>
            <ul>
              <li>Generate electricity and gas to support farm operations.</li>
              <li>
                Return the nutrient-rich material left after digestion to the
                land as fertiliser.
              </li>
              <li>
                Make productive use of farm by-products and reduce dependence on
                purchased energy and fertiliser.
              </li>
            </ul>
            <p className="plan-purpose">
              <strong>Why it matters:</strong> energy and soil inputs would be
              produced within the farm, supporting a more self-sufficient
              agricultural system.
            </p>
          </div>
        </article>
        <article className="farm-plan-card" id="commercial-greenhouses">
          <figure>
            <img
              src="/greenhouse-tomatoes.jpg"
              alt="Rows of young tomato plants inside a commercial greenhouse"
              style={{ objectPosition: "center top" }}
              width="1280"
              height="960"
              loading="lazy"
            />
            <figcaption>
              Example greenhouse · planned facilities, not the current farm.
              {" "}Photo: <a href="https://commons.wikimedia.org/wiki/File:TomateJungpflanzenAnzuchtNiederlande.jpg">Goldlocki</a>
              {" · "}<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>
            </figcaption>
          </figure>
          <div className="farm-plan-body">
            <p className="eyebrow">
              Phase 2 in the original proposal · Horticulture
            </p>
            <h4>10 greenhouses to be built</h4>
            <p className="plan-output">
              Protected growing · Irrigation · Practical skills
            </p>
            <p>
              We plan to design, build and equip ten modern commercial
              greenhouses, with irrigation systems for intensive fruit and
              vegetable production.
            </p>
            <ul>
              <li>
                Create growing conditions suited to each crop and its stage of
                development.
              </li>
              <li>
                Support off-season production and better protection from extreme
                weather, pests, weeds and disease.
              </li>
              <li>
                Use water and other production resources efficiently while
                training community members in greenhouse farming.
              </li>
            </ul>
            <p className="plan-purpose">
              <strong>Why it matters:</strong> more reliable crop production,
              agricultural jobs and skills that families can use to build
              livelihoods.
            </p>
          </div>
        </article>
        <article className="farm-plan-card" id="sorting-packaging">
          <figure>
            <img
              src="/packaging.jpg"
              alt="Red, yellow and green peppers sorted into produce crates"
              width="1920"
              height="1280"
              loading="lazy"
            />
            <figcaption>Illustrative produce photograph</figcaption>
          </figure>
          <div className="farm-plan-body">
            <p className="eyebrow">
              Phase 3 in the original proposal · Produce handling
            </p>
            <h4>Sorting &amp; packaging facilities</h4>
            <p className="plan-output">
              Protect quality · Prepare produce · Reach markets
            </p>
            <p>
              We plan to install sorting and packaging systems for fruit and
              vegetables, with automated processes that prepare produce for
              storage, distribution and sale.
            </p>
            <ul>
              <li>Clean, sort and grade harvested produce.</li>
              <li>
                Pack, fill, seal and label products, with handling and
                palletising for distribution.
              </li>
              <li>
                Protect produce quality and develop sales in local markets, with
                longer-term international opportunities subject to buyer and
                market requirements.
              </li>
            </ul>
            <p className="plan-purpose">
              <strong>Why it matters:</strong> keeping more value from the
              harvest and creating work beyond growing, in packing, handling and
              distribution.
            </p>
          </div>
        </article>
        <article className="farm-plan-card" id="poultry-farm">
          <figure>
            <img
              src="/poultry.jpg"
              alt="Hens illustrating the proposed poultry farming component"
              width="1280"
              height="1920"
              loading="lazy"
            />
            <figcaption>Illustrative poultry photograph</figcaption>
          </figure>
          <div className="farm-plan-body">
            <p className="eyebrow">
              Phase 4 in the original proposal · Food &amp; nutrition
            </p>
            <h4>Poultry farm</h4>
            <p className="plan-output">Egg production · Broiler production</p>
            <p>
              We plan two types of poultry production: laying hens for eggs and
              broilers for meat, providing food and additional agricultural
              employment.
            </p>
            <dl className="poultry-capacity">
              <div>
                <dt>Laying hens</dt>
                <dd>
                  <strong>2 × 40,000</strong>
                  <span>Two enclosed halls · 80,000 birds in total</span>
                </dd>
              </div>
              <div>
                <dt>Broilers</dt>
                <dd>
                  <strong>2 × 25,000</strong>
                  <span>Two halls · 50,000 birds in total</span>
                </dd>
              </div>
            </dl>
            <p className="capacity-note">
              Proposed housing capacities from the original proposal, not
              current stock or annual production figures.
            </p>
            <p className="plan-purpose">
              <strong>Why it matters:</strong> eggs and poultry meat would
              contribute to food security and nutrition, alongside opportunities
              for work and training.
            </p>
          </div>
        </article>
      </div>
      <section
        className="farm-education"
        id="farming-education"
        aria-labelledby="farming-education-title"
      >
        <div className="education-intro">
          <div>
            <p className="eyebrow">Learning across the whole farm</p>
            <h4 id="farming-education-title">
              Sustainable farming education &amp; training
            </h4>
          </div>
          <p>
            We plan to make Virgin Mary Farm a place to learn as well as produce
            food. Sustainable farming education and hands-on training will help
            members of the Coptic Orthodox and Nuba Mountains communities build
            skills for employment, food security and lasting livelihoods.
          </p>
        </div>
        <div className="education-partnership" id="training-for-everyone">
          <h5>Training for everyone who works at the farm</h5>
          <p>Our commitment is that everyone working at Virgin Mary Farm will receive training appropriate to their role. The planned programme will cover sustainable farming, water management, safe equipment use, maintenance and practical skills for earning a living, with induction and continued learning as the farm develops.</p>
          <p>Dr. Eng. Khalid Salih brings university teaching experience from Berlin and expertise in renewable energy and workforce development. Our training plan will draw on his experience and the practical learning approach of the <a href="https://www.diesalihs.com/#academy">DIESALIHS Grand Renaissance Academy</a>, alongside agricultural specialists and equipment suppliers. Course content, instructors and delivery arrangements will be developed as the farm is rebuilt.</p>
        </div>
        <p className="education-label">Planned learning areas</p>
        <div className="education-topics">
          <div>
            <h5>Growing sustainably</h5>
            <p>
              Soil care, crop rotation, greenhouse growing and water-efficient
              irrigation, connecting sustainable farming principles with
              practical work on the land.
            </p>
          </div>
          <div>
            <h5>Using resources responsibly</h5>
            <p>
              Renewable energy, biogas and the productive use of organic farm
              by-products, helping learners understand how food production,
              energy and soil fertility work together.
            </p>
          </div>
          <div>
            <h5>Building farm livelihoods</h5>
            <p>
              Poultry care, harvesting, sorting and packaging, alongside basic
              farm management skills that support work and income opportunities.
            </p>
          </div>
        </div>
        <div className="education-partnership">
          <p>
            We welcome agricultural educators, training institutions and
            development partners to help shape and deliver practical
            demonstrations, workshops and supervised learning. The programme
            will be developed with the communities as the farm is rebuilt.
          </p>
          <a className="button" href="#contact">
            Partner on education &amp; training <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
      <div className="farm-connections">
        <div>
          <p className="eyebrow">One integrated farming project</p>
          <h4>Energy. Food. Skills. Livelihoods.</h4>
          <p>
            The original proposal connects these facilities with agricultural
            training, employment, food security and responsible use of natural
            resources. Solar energy, water and irrigation infrastructure also
            form part of the wider rebuilding vision.
          </p>
        </div>
        <a className="button light" href="#partnership">
          Help deliver part of the plan <span aria-hidden="true">↗</span>
        </a>
      </div>
      <p className="fine-print">
        Based on the Risemeup Sustainable Farming proposal issued on 19 November
        2018, pages 7–8. The four phases describe its original project sequence.
        Delivery dates, final specifications and costs will be updated for the
        rebuilding programme with technical and development partners.
      </p>
    </div>
  );
}
