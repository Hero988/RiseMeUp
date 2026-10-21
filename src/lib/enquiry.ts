type Enquiry = {
  firstName: string;
  lastName: string;
  email: string;
  organisation?: string;
  interest: string;
  message: string;
};

const interests: Record<string, string> = {
  "food-assistance": "Food assistance",
  "virgin-mary-farm": "Virgin Mary Farm partnership",
  equipment: "Equipment or technical support",
  mango: "Mango subproject",
  other: "Other enquiry",
};

export function buildEnquiryMailto(enquiry: Enquiry): string {
  const interest = interests[enquiry.interest] ?? "General enquiry";
  const body = [
    "Hello Iman,",
    "",
    enquiry.message.trim(),
    "",
    `Name: ${enquiry.firstName.trim()} ${enquiry.lastName.trim()}`,
    `Reply email: ${enquiry.email.trim()}`,
    ...(enquiry.organisation?.trim() ? [`Organisation: ${enquiry.organisation.trim()}`] : []),
    `Area of interest: ${interest}`,
  ].join("\r\n");
  return `mailto:i.tradros@risemeup.org?subject=${encodeURIComponent(`Risemeup enquiry: ${interest}`)}&body=${encodeURIComponent(body)}`;
}
