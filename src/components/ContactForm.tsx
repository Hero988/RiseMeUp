import { useState } from "react";
import type { FormEvent } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function ContactForm() {
  const submitMessage = useMutation(api.mutations.submitContactMessage);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    if (!value("firstName") || !value("lastName") || !value("message")) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      await submitMessage({
        firstName: value("firstName"),
        lastName: value("lastName"),
        email: value("email"),
        interest: value("interest"),
        message: value("message"),
      });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }
  return (
    <>
      <h3>Send an enquiry</h3>
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
          <textarea name="message" rows={5} required maxLength={5000} />
        </label>
        <p className="fine-print">
          We use the information you provide to respond to your enquiry. Please
          do not include sensitive personal details about families or
          beneficiaries.
        </p>
        <button
          className="button"
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Send enquiry ↗"}
        </button>
        <div role="status" aria-live="polite">
          {status === "success" && (
            <p className="form-success">
              Thank you. Your enquiry has been received.
            </p>
          )}
          {status === "error" && (
            <p className="form-error">
              Your enquiry could not be sent. Check the fields and try again, or
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
