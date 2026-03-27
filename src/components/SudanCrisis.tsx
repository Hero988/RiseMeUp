import { useEffect } from "react";

interface SudanCrisisProps {
  isOpen: boolean;
  onClose: () => void;
  onDonate: () => void;
}

export default function SudanCrisis({ isOpen, onClose, onDonate }: SudanCrisisProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.scrollTo({ top: 0 });
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="sudan-crisis-page">
      <button className="sudan-back-btn" onClick={onClose} aria-label="Back to main site">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to Home
      </button>

      <div className="sudan-crisis-content">
        <header className="sudan-hero">
          <h1 className="sudan-title">Sudan Crisis Response</h1>
          <div className="sudan-title-bar" aria-hidden="true" />
        </header>

        <section className="sudan-section">
          <p className="sudan-intro">
            Risemeup is a non-profit charity organisation committed to supporting communities who have suffered violence, displacement, and the long-term effects of persecution and conflict.
          </p>
        </section>

        <section className="sudan-section">
          <h2 className="sudan-heading">What Risemeup Is Doing Now</h2>
          <p>
            Sudan is facing a devastating war, and many families have lost their homes, income, and security. People have been forced to flee to neighbouring countries or to safer areas within Sudan. Many families who once lived in the capital have moved to rural areas, where they are now staying in schools and other temporary shelters. In many cases, each family is living in a single classroom because they have nowhere else to go.
          </p>
          <p>
            These families are facing severe hardship. Many have no money, no stable source of food, and no work because of the ongoing war.
          </p>
          <p>
            Risemeup is currently collecting donations from our communities in London to support displaced families in Sudan. The support we provide helps families access basic food and essential daily needs during this extremely difficult time.
          </p>
          <p>
            Our aim is to stand with vulnerable families, bring practical relief, and help restore dignity and hope to those affected by war.
          </p>
        </section>

        <section className="sudan-section">
          <h2 className="sudan-heading">How You Can Help</h2>
          <p>
            Your donation can help us provide food and support to families who have been displaced by the conflict in Sudan. Every contribution makes a difference and helps us reach those most in need.
          </p>
          <p>
            Together, we can support families in crisis and bring hope to communities affected by war.
          </p>
          <button className="btn-primary sudan-donate-btn" onClick={onDonate}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
            Donate Now
          </button>
        </section>
      </div>
    </div>
  );
}
