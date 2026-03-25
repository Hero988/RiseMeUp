import { useState } from "react";
import type { FormEvent } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

interface FooterProps {
  onDonate: () => void;
}

export default function Footer({ onDonate }: FooterProps) {
  const subscribeNewsletter = useMutation(api.mutations.subscribeNewsletter);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await subscribeNewsletter({ email: newsletterEmail });
      alert(
        "Thank you for subscribing! You will receive updates about our projects and impact."
      );
      setNewsletterEmail("");
    } catch {
      alert("Something went wrong. Please try again.");
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const navbar = document.getElementById("navbar");
      const offset = navbar ? navbar.offsetHeight + 10 : 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleDonateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onDonate();
  };

  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a
              href="#hero"
              className="nav-logo"
              onClick={(e) => handleNavClick(e, "#hero")}
            >
              <img src="/logo.png" alt="RiseMeUp Sustainability" />
            </a>
            <p>
              Sustainable Farming for the Nuba Mountain community. A London-based non-profit dedicated to transforming lives through agriculture and green energy.
            </p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a href="#about" onClick={(e) => handleNavClick(e, "#about")}>About Us</a>
              </li>
              <li>
                <a href="#vision-mission" onClick={(e) => handleNavClick(e, "#vision-mission")}>
                  Vision &amp; Mission
                </a>
              </li>
              <li>
                <a href="#projects" onClick={(e) => handleNavClick(e, "#projects")}>Our Projects</a>
              </li>
              <li>
                <a href="#team" onClick={(e) => handleNavClick(e, "#team")}>Our Team</a>
              </li>
              <li>
                <a href="#objectives" onClick={(e) => handleNavClick(e, "#objectives")}>Our Goals</a>
              </li>
            </ul>
          </div>

          <div>
            <h4>Get Involved</h4>
            <ul className="footer-links">
              <li>
                <a href="#" onClick={handleDonateClick}>Donate Now</a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>Volunteer</a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>Partner With Us</a>
              </li>
              <li>
                <a href="#sdgs" onClick={(e) => handleNavClick(e, "#sdgs")}>UN SDGs</a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>Contact Us</a>
              </li>
            </ul>
          </div>

          <div>
            <h4>Stay Connected</h4>
            <p style={{ fontSize: "0.86rem", opacity: 0.6, marginBottom: 16 }}>
              Subscribe to our newsletter for updates on our projects and impact.
            </p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Your email"
                required
                aria-label="Email for newsletter"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
              />
              <button type="submit">Join</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; 2026 RiseMeUp Sustainable Farming. All rights reserved.</span>
          <span>Registered Charity &middot; London, UK</span>
        </div>
      </div>
    </footer>
  );
}
