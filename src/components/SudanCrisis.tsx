import { useEffect } from "react";

interface SudanCrisisProps {
  isOpen: boolean;
  onClose: () => void;
  onDonate: () => void;
}

const images = [
  { src: "/sudan-crisis-1.jpeg", alt: "Food distribution to families in need" },
  { src: "/sudan-crisis-2.jpeg", alt: "Essential supplies being prepared" },
  { src: "/sudan-crisis-3.jpeg", alt: "Community support effort" },
  { src: "/sudan-crisis-4.jpeg", alt: "Families receiving aid packages" },
  { src: "/sudan-crisis-5.jpeg", alt: "Relief supplies for displaced families" },
  { src: "/sudan-crisis-6.jpeg", alt: "Ongoing food support programme" },
  { src: "/sudan-crisis-7.jpeg", alt: "Volunteers distributing essentials" },
  { src: "/sudan-crisis-8.jpeg", alt: "Helping families in crisis" },
  { src: "/sudan-crisis-9.jpeg", alt: "Real support for real families" },
];

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

        <section className="sudan-section sudan-feeding">
          <h2 className="sudan-heading">Feeding Families Today</h2>
          <p>
            Right now, families in our community are struggling to put food on the table — and we are here to help.
          </p>
          <p>
            Every day, we provide essential food and support to those who need it most. Thanks to your support, we are reaching more families and making a real difference where it matters.
          </p>
          <p><strong>No one should go hungry — together, we are feeding families today.</strong></p>
        </section>

        <section className="sudan-section">
          <h2 className="sudan-heading">What We Are Doing</h2>
          <p>
            These images show part of our ongoing effort to provide food and essential supplies to families in need. Every package represents support, care, and hope for someone in our community.
          </p>
          <blockquote className="sudan-quote">
            Real support for real families — happening right now.
          </blockquote>
          <div className="sudan-gallery">
            {images.map((img) => (
              <div key={img.src} className="sudan-gallery-item">
                <img src={img.src} alt={img.alt} loading="lazy" />
              </div>
            ))}
          </div>
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
