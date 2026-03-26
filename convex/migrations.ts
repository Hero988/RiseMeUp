import { mutation } from "./_generated/server";

export const addKhalidAndGreenhouseImage = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if already applied
    const existing = await ctx.db
      .query("siteConfig")
      .withIndex("by_key", (q) => q.eq("key", "migration_khalid_greenhouse"))
      .first();
    if (existing) return "Already applied";

    // Add Dr. Engr. Khalid Salih
    await ctx.db.insert("teamMembers", {
      name: "Dr. Engr. Khalid Salih",
      role: "Renewable Energy & Infrastructure",
      image: "/team-4-khalid.jpeg",
      bio: "Renewable energy and infrastructure expert and founder of Xplines International. Focuses on integrated, sustainable solutions across energy, agriculture, and healthcare.",
      education: [
        { icon: "graduation", text: "PhD Engineering" },
        { icon: "clock", text: "Founder, Xplines International" },
        { icon: "graduation", text: "Decentralized Development" },
      ],
      order: 4,
    });

    // Update greenhouse project to use real image
    const greenhouse = await ctx.db
      .query("projects")
      .collect();
    const ghProject = greenhouse.find((p) => p.imageSrc === "greenhouse");
    if (ghProject) {
      await ctx.db.patch(ghProject._id, {
        imageType: "img",
        imageSrc: "/greenhouse.jpg",
      });
    }

    // Mark migration as applied
    await ctx.db.insert("siteConfig", {
      key: "migration_khalid_greenhouse",
      value: "true",
    });

    return "Migration applied";
  },
});
