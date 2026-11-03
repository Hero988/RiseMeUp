export const investorProjects = [
  { value: "water", label: "Virgin Mary Farm · first-stage water supply", summary: "Your enquiry would focus on the proposed first-stage water supply." },
  { value: "biogas", label: "Biogas & organic fertiliser", summary: "Your enquiry would focus on proposed biogas and organic fertiliser facilities." },
  { value: "mango", label: "Mango packing & treatment centre", summary: "Your enquiry would focus on the proposed mango packing and treatment centre." },
  { value: "farm", label: "The wider farm development", summary: "Your enquiry would explore the wider proposed farm development." },
  { value: "guidance", label: "I would like some guidance", summary: "Your enquiry would ask Iman to help identify a suitable starting point." },
];

export const investorInvolvement = [
  { value: "investment", label: "Investment discussion" },
  { value: "grant", label: "Grant or philanthropic support" },
  { value: "technical", label: "Equipment or technical partnership" },
  { value: "other", label: "Other collaboration" },
];

type InvestorEnquiryDetails = {
  name: string;
  email: string;
  organisation: string;
  project: string;
  involvement: string;
  message: string;
  projectLabel: string;
  involvementLabel: string;
  language: string;
};

export function buildInvestorMailto(details: InvestorEnquiryDetails): string {
  if (!investorProjects.some(project => project.value === details.project)
    || !investorInvolvement.some(involvement => involvement.value === details.involvement)
    || !details.name.trim() || !details.email.trim() || !details.message.trim()) {
    throw new Error("Incomplete investor enquiry");
  }
  const labels = details.language === "fr"
    ? ["Demande de renseignements sur un projet ou un investissement", "Bonjour Iman,", "Nom", "Adresse de réponse", "Organisation", "Projet", "Participation"]
    : details.language === "de"
      ? ["Projekt- und Investorenanfrage", "Hallo Iman,", "Name", "Antwortadresse", "Organisation", "Projekt", "Beteiligung"]
      : ["Project & investor enquiry", "Hello Iman,", "Name", "Reply email", "Organisation", "Project", "Involvement"];
  const body = [labels[1], "", details.message.trim(), "",
    `${labels[2]}: ${details.name.trim()}`, `${labels[3]}: ${details.email.trim()}`,
    ...(details.organisation.trim() ? [`${labels[4]}: ${details.organisation.trim()}`] : []),
    `${labels[5]}: ${details.projectLabel}`, `${labels[6]}: ${details.involvementLabel}`,
  ].join("\r\n");
  return `mailto:i.tadros@risemeup.org?subject=${encodeURIComponent(`Risemeup · ${labels[0]}`)}&body=${encodeURIComponent(body)}`;
}
