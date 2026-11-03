import { useState } from "react";
import type { FormEvent } from "react";
import { buildInvestorMailto, investorInvolvement, investorProjects } from "../lib/investorEnquiry";
import "./InvestorEnquiry.css";

export default function InvestorEnquiry() {
  const [project, setProject] = useState("water");
  const [status, setStatus] = useState<"idle" | "prepared" | "error">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    if (!form.reportValidity()) return;
    try {
      const selectedLabel = (name: string) => (form.elements.namedItem(name) as HTMLSelectElement).selectedOptions[0].textContent ?? "";
      window.location.href = buildInvestorMailto({
        name: value("name"), email: value("email"), organisation: value("organisation"),
        project: value("project"), involvement: value("involvement"), message: value("message"),
        projectLabel: selectedLabel("project"), involvementLabel: selectedLabel("involvement"),
        language: document.documentElement.lang,
      });
      setStatus("prepared");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="investor-enquiry" className="section investor-enquiry" aria-labelledby="investor-title">
      <div className="container">
        <header className="investor-header">
          <p className="eyebrow">Risemeup · Virgin Mary Farm</p>
          <h2 id="investor-title">A conversation today.<br /><em>A stronger future together.</em></h2>
          <p>We welcome early conversations with potential investors and development partners about the proposed rebuilding of Virgin Mary Farm in Sudan.</p>
        </header>
        <div className="investor-grid">
          <div className="investor-copy">
            <h3>Explore a project<br /><em>with purpose.</em></h3>
            <p>From restoring water supplies to developing sustainable farming, tell us where your interests and expertise could help.</p>
            <ol className="investor-steps">
              <li><strong>Share your interest</strong><p>Choose a project and tell Iman how you would like to be involved.</p></li>
              <li><strong>Understand the proposal</strong><p>Discuss the scope, technical assessments, costs and information still needed.</p></li>
              <li><strong>Explore the next step</strong><p>Consider whether a suitable arrangement could be developed together.</p></li>
            </ol>
            <aside className="investor-caveat"><strong>Early-stage discussions only</strong><p>Projects are proposed, not operational. A quotation-backed funding total has not yet been set. This enquiry is not an investment offer; no financial terms or returns are promised.</p></aside>
          </div>
          <div className="investor-panel">
            <h3>Project &amp; investor enquiry</h3>
            <p>Start a conversation with Iman. There is no commitment at this stage.</p>
            <form onSubmit={handleSubmit}>
              <div className="investor-fields">
                <label>Your name<input name="name" autoComplete="name" placeholder="Full name" required maxLength={200} /></label>
                <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} /></label>
              </div>
              <label>Organisation (optional)<input name="organisation" autoComplete="organization" placeholder="Company or organisation" maxLength={200} /></label>
              <label>Project of interest<select name="project" value={project} onChange={event => { setProject(event.target.value); setStatus("idle"); }} aria-describedby="investor-project-summary">
                {investorProjects.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
              </select></label>
              <p id="investor-project-summary" className="investor-summary" aria-live="polite">{investorProjects.find(item => item.value === project)?.summary}</p>
              <label>How would you like to be involved?<select name="involvement">
                {investorInvolvement.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
              </select></label>
              <label>Tell us a little about your interest<textarea name="message" rows={4} required maxLength={2000} placeholder="What would you like to explore? Please do not include sensitive or financial account details." /></label>
              <button className="button" type="submit">Prepare my enquiry <span aria-hidden="true">→</span></button>
              <p className="investor-email-note">Your email app will open for you to review and send your enquiry. This website does not send or store your form details.</p>
              <p className="investor-email-note"><a href="mailto:i.tadros@risemeup.org">i.tadros@risemeup.org</a></p>
              <div role="status" aria-live="polite">
                {status === "prepared" && <p>Your email app should open with your enquiry. Please press Send there to deliver it. If nothing opens, use the email address above; your details remain in this form.</p>}
                {status === "error" && <p>Your email could not be prepared. Check the fields and try again, or email <a href="mailto:i.tadros@risemeup.org">i.tadros@risemeup.org</a>.</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
