import { useState, useEffect } from "react";

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const amounts = [25, 50, 100, 250, 500, 1000];

export default function DonateModal({ isOpen, onClose }: DonateModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomInput = (val: string) => {
    setCustomAmount(val);
    setSelectedAmount(null);
  };

  const handleDonate = () => {
    const amount = customAmount || selectedAmount;
    if (!amount) {
      alert("Please select or enter a donation amount.");
      return;
    }
    alert(
      `Thank you for your generous donation of \u00A3${amount}! In a production environment, you would be redirected to a secure payment page. Your kindness helps transform lives in the Nuba Mountains.`
    );
    onClose();
  };

  return (
    <div
      className={`modal-overlay${isOpen ? " open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Donate"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-box">
        <button className="modal-close" onClick={onClose} aria-label="Close donate modal">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <h2>
          <span className="modal-heart" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--terracotta)" stroke="none">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </span>
          Make a Donation
        </h2>
        <p>Every contribution helps us build a brighter future for the Nuba Mountain community.</p>
        <div className="donate-amounts">
          {amounts.map((a) => (
            <div
              key={a}
              className={`donate-amount${selectedAmount === a ? " selected" : ""}`}
              onClick={() => handleAmountClick(a)}
            >
              &pound;{a === 1000 ? "1,000" : a}
            </div>
          ))}
        </div>
        <input
          type="text"
          className="donate-custom"
          placeholder="Or enter a custom amount (GBP)"
          value={customAmount}
          onChange={(e) => handleCustomInput(e.target.value)}
        />
        <button className="btn-primary" onClick={handleDonate}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
          Donate with Love
        </button>
        <p className="donate-note">Your donation is secure and goes directly to supporting our farming projects.</p>
      </div>
    </div>
  );
}
