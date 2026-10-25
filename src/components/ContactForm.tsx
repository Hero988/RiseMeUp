import { useState } from "react";
import type { FormEvent } from "react";
import { buildEnquiryMailto } from "../lib/enquiry";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "prepared" | "error">("idle");
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    if (!form.reportValidity() || !value("firstName") || !value("lastName") || !value("message")) {
      setStatus("error");
      return;
    }
    try {
      const mailto = buildEnquiryMailto({
        firstName: value("firstName"),
        lastName: value("lastName"),
        email: value("email"),
        interest: value("interest"),
        message: value("message"),
        organisation: value("organisation"),
      });
      window.location.href = mailto;
      setStatus("prepared");
    } catch {
      setStatus("error");
    }
  }
  return (
    <>
      <h3>Get in touch with Iman</h3>
      <p className="enquiry-intro">Fill in your details to prepare an email to Iman. Your email app will open for you to review and send it. This form does not send or store your information.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            First name
            <input
              name="firstName"
              autoComplete="given-name"
              required
              maxLength={100}
            />
          </label>
          <label>
            Last name
            <input
              name="lastName"
              autoComplete="family-name"
              required
              maxLength={100}
            />
          </label>
        </div>
        <label>
          Organisation <span className="optional-label">(optional)</span>
          <input name="organisation" autoComplete="organization" maxLength={150} />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
          />
        </label>
        <label>
          Area of interest
          <select name="interest" required defaultValue="">
            <option value="" disabled>
              Select an option
            </option>
            <option value="food-assistance">Food assistance</option>
            <option value="virgin-mary-farm">
              Virgin Mary Farm partnership
            </option>
            <option value="equipment">Equipment or technical support</option>
            <option value="mango">Mango subproject</option>
            <option value="other">Other enquiry</option>
          </select>
        </label>
        <label>
          Your message
          <textarea name="message" rows={5} required maxLength={1500} />
        </label>
        <p className="fine-print">
          Please do not include sensitive personal details about families or beneficiaries.
        </p>
        <button
          className="button"
          type="submit"
        >
          Open email to send ↗
        </button>
        <p className="fine-print enquiry-fallback">No email app? Write directly to <a href="mailto:i.tradros@risemeup.org">i.tradros@risemeup.org</a> or call <a href="tel:+447867977844">+44 786 797 7844</a>.</p>
        <div role="status" aria-live="polite">
          {status === "prepared" && (
            <p className="form-success">
              Your email app should open with your enquiry. Please press Send there to deliver it. If nothing opens, use the email address above; your details remain in this form.
            </p>
          )}
          {status === "error" && (
            <p className="form-error">
              Your email could not be prepared. Check the fields and try again, or
              email{" "}
              <a href="mailto:i.tradros@risemeup.org">i.tradros@risemeup.org</a>
              .
            </p>
          )}
        </div>
      </form>
    </>
  );
}
