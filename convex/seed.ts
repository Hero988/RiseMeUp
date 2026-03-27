import { mutation } from "./_generated/server";

export const seedAll = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if already seeded
    const existing = await ctx.db
      .query("siteConfig")
      .withIndex("by_key", (q) => q.eq("key", "seeded"))
      .first();
    if (existing) return "Already seeded";

    // Site config
    await ctx.db.insert("siteConfig", { key: "seeded", value: "true" });
    await ctx.db.insert("siteConfig", {
      key: "heroHeading",
      value: JSON.stringify([
        { text: "Investing in", className: "" },
        { text: "Rural People", className: "line-terracotta" },
        { text: "is Investing in", className: "line-gold" },
        { text: "a Brighter Future.", className: "" },
      ]),
    });
    await ctx.db.insert("siteConfig", {
      key: "heroSub",
      value:
        "Supporting the Nuba Mountain community in Sudan through sustainable horticulture, farming, and green energy infrastructure across 130 acres.",
    });
    await ctx.db.insert("siteConfig", {
      key: "heroBadge",
      value: "Non-Profit Charity \u00B7 London, UK",
    });

    // Team members
    await ctx.db.insert("teamMembers", {
      name: "Prof. Dr. Elamin A. Ahmed",
      role: "Fruit & Veg Production",
      image: "/team-1-elamin.png",
      bio: "Specialist in Fruit & Vegetable Production with extensive academic and field experience.",
      education: [
        { icon: "graduation", text: "PhD INRA, France" },
        { icon: "graduation", text: "MSc U of Gezira" },
        { icon: "graduation", text: "BSc U of Khartoum" },
      ],
      order: 1,
    });
    await ctx.db.insert("teamMembers", {
      name: "Dr. Engr. Khalid Salih",
      role: "Renewable Energy & Infrastructure",
      image: "/team-4-khalid.jpeg",
      bio: "Renewable energy and infrastructure expert and founder of Xplines International. Focuses on integrated, sustainable solutions across energy, agriculture, and healthcare.",
      education: [
        { icon: "graduation", text: "PhD Control Engineering" },
        { icon: "clock", text: "Founder, Xplines International" },
        { icon: "graduation", text: "Decentralized Development" },
      ],
      order: 2,
    });
    await ctx.db.insert("teamMembers", {
      name: "Dr. Munir G. Botrus",
      role: "Pesticide Application",
      image: "/team-2-munir.png",
      bio: "15 years of experience with FAO/UN in pesticide application and agricultural safety.",
      education: [
        { icon: "graduation", text: "PhD U of London" },
        { icon: "graduation", text: "BSc Agricultural Science" },
        { icon: "clock", text: "15 Years FAO/UN" },
      ],
      order: 3,
    });
    await ctx.db.insert("teamMembers", {
      name: "Dr. Mohammed A.F. Khames",
      role: "Seed Pathology",
      image: "/team-3-mohammed.png",
      bio: "Expert in seed pathology with international research experience across Europe and Africa.",
      education: [
        { icon: "graduation", text: "PhD Giessen U, Germany" },
        { icon: "graduation", text: "MSc Aberdeen, UK" },
        { icon: "graduation", text: "BSc Cairo" },
      ],
      order: 4,
    });

    // Projects
    await ctx.db.insert("projects", {
      phase: 1,
      title: "Biogas Plant",
      description:
        "Generating electricity, gas, and fertilizer from agricultural waste. Reducing dependency on external energy sources.",
      benefits: ["Electricity", "Gas", "Fertilizer"],
      imageType: "img",
      imageSrc: "/biogas-plant.jpeg",
      order: 1,
    });
    await ctx.db.insert("projects", {
      phase: 2,
      title: "10 Commercial Greenhouses",
      description:
        "Modern greenhouses with drip irrigation systems. Growing off-season crops with climate and pest control capabilities.",
      benefits: ["Irrigation", "Climate Control", "Off-Season"],
      imageType: "svg",
      imageSrc: "greenhouse",
      order: 2,
    });
    await ctx.db.insert("projects", {
      phase: 3,
      title: "Sorting & Packaging",
      description:
        "Automatic packaging lines for fabrication, cleaning, filling, sealing, labeling, and palletizing of agricultural products.",
      benefits: ["Automation", "Quality", "Export Ready"],
      imageType: "img",
      imageSrc: "/packaging.jpg",
      order: 3,
    });
    await ctx.db.insert("projects", {
      phase: 4,
      title: "Poultry Farm",
      description:
        "Egg hens (2x40,000) and broilers (2x25,000). Providing protein, nutrition, and food security to the community.",
      benefits: ["130K Birds", "Protein", "Food Security"],
      imageType: "img",
      imageSrc: "/poultry.jpg",
      order: 4,
    });

    // Objectives
    const objectives = [
      {
        title: "Implementing Green Energy",
        description:
          "Building biogas plants and solar infrastructure for sustainable, clean energy powering all farm operations.",
        iconName: "zap",
        image: "/obj-green-energy.jpeg",
        order: 1,
      },
      {
        title: "Develop Rural Farming",
        description:
          "Transforming 130 acres of poor-land into productive farmland through modern agricultural practices.",
        iconName: "shield",
        image: "/obj-rural-farming.jpeg",
        order: 2,
      },
      {
        title: "Creating New Jobs",
        description:
          "Generating agricultural employment opportunities for the Nuba Mountain community to build self-sufficiency.",
        iconName: "briefcase",
        image: "/obj-new-jobs.jpeg",
        order: 3,
      },
      {
        title: "Ending Poverty",
        description:
          "Supporting the neediest and most excluded within the rural community through sustainable economic empowerment.",
        iconName: "heart",
        image: "/obj-ending-poverty.jpeg",
        order: 4,
      },
      {
        title: "Education & Training",
        description:
          "Building capacity through agricultural training programs and educational initiatives for local communities.",
        iconName: "book",
        image: "/obj-education.jpeg",
        order: 5,
      },
      {
        title: "Food Security",
        description:
          "Ensuring reliable access to sufficient, safe, and nutritious food for all community members year-round.",
        iconName: "layers",
        image: "/obj-food-security.jpeg",
        order: 6,
      },
    ];
    for (const obj of objectives) {
      await ctx.db.insert("objectives", obj);
    }

    // SDGs
    const sdgs = [
      {
        number: 7,
        title: "Affordable & Clean Energy",
        description:
          "Our biogas plant provides clean, renewable energy to power farm operations sustainably.",
        colorClass: "sdg-7",
        order: 1,
      },
      {
        number: 9,
        title: "Industry, Innovation & Infrastructure",
        description:
          "Building modern agricultural infrastructure with innovative technology and processes.",
        colorClass: "sdg-9",
        order: 2,
      },
      {
        number: 10,
        title: "Reduced Inequalities",
        description:
          "Empowering marginalized communities with equal access to economic opportunity.",
        colorClass: "sdg-10",
        order: 3,
      },
      {
        number: 12,
        title: "Responsible Consumption",
        description:
          "Sustainable farming practices that respect natural resources and minimize waste.",
        colorClass: "sdg-12",
        order: 4,
      },
    ];
    for (const sdg of sdgs) {
      await ctx.db.insert("sdgs", sdg);
    }

    // Services
    const services = [
      {
        title: "Fundraising & Investment",
        description:
          "We connect passionate donors and investors with impactful agricultural projects that create lasting change in rural communities.",
        iconName: "dollar",
        order: 1,
      },
      {
        title: "Development & Supervision",
        description:
          "Expert oversight ensures every phase of our projects meets international standards for quality, sustainability, and impact.",
        iconName: "book",
        order: 2,
      },
      {
        title: "Project Operation Management",
        description:
          "Day-to-day management of all farming operations, ensuring efficiency, productivity, and community benefit.",
        iconName: "settings",
        order: 3,
      },
    ];
    for (const svc of services) {
      await ctx.db.insert("services", svc);
    }

    // Stats
    const stats = [
      {
        target: 130,
        suffix: " acres",
        label: "Farmland Under Development",
        isDecimal: false,
        order: 1,
      },
      {
        target: 3,
        suffix: "B+",
        label: "Rural People Globally (40% of world)",
        isDecimal: false,
        order: 2,
      },
      {
        target: 11,
        suffix: "x",
        label: "More Effective at Reducing Poverty",
        isDecimal: false,
        order: 3,
      },
      {
        target: 1.8,
        suffix: "B",
        label: "Young People — Largest Generation Ever",
        isDecimal: true,
        order: 4,
      },
    ];
    for (const stat of stats) {
      await ctx.db.insert("stats", stat);
    }

    return "Seeded successfully";
  },
});
