import { useState } from "react";
import type { FormEvent } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Contact() {
  const labelRef = useScrollReveal<HTMLSpanElement>();
  const titleRef = useScrollReveal<HTMLHeadingElement>();
  const subRef = useScrollReveal<HTMLParagraphElement>();
  const infoRef = useScrollReveal<HTMLDivElement>();
  const formRef = useScrollReveal<HTMLDivElement>();

  const submitMessage = useMutation(api.mutations.submitContactMessage);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await submitMessage({ firstName, lastName, email, interest, message });
      alert(
        `Thank you, ${firstName}! Your message has been received. Our team will get back to you soon.`
      );
      setFirstName("");
      setLastName("");
      setEmail("");
      setInterest("");
      setMessage("");
    } catch {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="text-center" style={{ marginBottom: 48 }}>
          <span className="section-label reveal" ref={labelRef}>Get In Touch</span>
          <h2 className="section-title reveal" ref={titleRef}>We Would Love to Hear From You</h2>
          <p className="section-subtitle reveal" ref={subRef}>
            Whether you want to volunteer, donate, or learn more about our work, we are always here for you.
          </p>
        </div>
        <div className="contact-grid">
          <div className="contact-info reveal" ref={infoRef}>
            <h3>Reach Out to Us</h3>
            <p>
              Our team in London is always ready to connect with supporters, partners, and anyone who shares our passion for empowering rural communities.
            </p>

            <div className="contact-detail">
              <div className="contact-detail-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <strong>Our Address</strong>
                <span>2 Rosecroft Gardens, London, NW2 6HX</span>
              </div>
            </div>

            <div className="contact-detail">
              <div className="contact-detail-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <strong>Email Us</strong>
                <a href="mailto:info@risemeup.org">info@risemeup.org</a>
              </div>
            </div>

            <div className="contact-detail">
              <div className="contact-detail-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <div>
                <strong>Call Us</strong>
                <a href="tel:+447867977844">+44 786 797 7844</a>
              </div>
            </div>

            <div className="contact-detail">
              <div className="contact-detail-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
              </div>
              <div>
                <strong>Website</strong>
                <a href="https://www.risemeup.org" target="_blank" rel="noopener noreferrer">
                  www.risemeup.org
                </a>
              </div>
            </div>

            <div className="contact-slogan">
              <p>
                "Think globally, act locally. From fragile land to thriving livelihoods."
              </p>
            </div>
          </div>

          <div className="contact-form-wrap reveal reveal-delay-2" ref={formRef}>
            <h3>Send Us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="Your first name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Your last name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="interest">I am interested in</label>
                <select
                  id="interest"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="donate">Making a Donation</option>
                  <option value="volunteer">Volunteering</option>
                  <option value="partner">Partnership Opportunities</option>
                  <option value="learn">Learning More</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  placeholder="Tell us how you would like to help or what you would like to know..."
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <button type="submit" className="form-submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
