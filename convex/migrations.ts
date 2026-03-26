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

export const updateProjectImages = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db
      .query("siteConfig")
      .withIndex("by_key", (q) => q.eq("key", "migration_project_images"))
      .first();
    if (existing) return "Already applied";

    const projects = await ctx.db.query("projects").collect();

    const packaging = projects.find((p) => p.imageSrc === "packaging");
    if (packaging) {
      await ctx.db.patch(packaging._id, {
        imageType: "img",
        imageSrc: "/packaging.jpg",
      });
    }

    const poultry = projects.find((p) => p.imageSrc === "poultry");
    if (poultry) {
      await ctx.db.patch(poultry._id, {
        imageType: "img",
        imageSrc: "/poultry.jpg",
      });
    }

    await ctx.db.insert("siteConfig", {
      key: "migration_project_images",
      value: "true",
    });

    return "Migration applied";
  },
});

export const addObjectiveImages = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db
      .query("siteConfig")
      .withIndex("by_key", (q) => q.eq("key", "migration_objective_images_v2"))
      .first();
    if (existing) return "Already applied";

    const imageMap: Record<string, string> = {
      "Implementing Green Energy": "/obj-green-energy.jpeg",
      "Develop Rural Farming": "/obj-rural-farming.jpeg",
      "Creating New Jobs": "/obj-new-jobs.jpeg",
      "Ending Poverty": "/obj-ending-poverty.jpeg",
      "Education & Training": "/obj-education.jpeg",
      "Food Security": "/obj-food-security.jpeg",
    };

    const objectives = await ctx.db.query("objectives").collect();
    for (const obj of objectives) {
      const image = imageMap[obj.title];
      if (image) {
        await ctx.db.patch(obj._id, { image });
      }
    }

    await ctx.db.insert("siteConfig", {
      key: "migration_objective_images_v2",
      value: "true",
    });

    return "Migration applied";
  },
});

export const reorderTeamMembers = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if already applied
    const existing = await ctx.db
      .query("siteConfig")
      .withIndex("by_key", (q) => q.eq("key", "migration_reorder_team"))
      .first();
    if (existing) return "Already applied";

    // Desired order: Elamin=1, Khalid=2, Munir=3, Mohammed=4
    const orderMap: Record<string, number> = {
      "Prof. Dr. Elamin A. Ahmed": 1,
      "Dr. Engr. Khalid Salih": 2,
      "Dr. Munir G. Botrus": 3,
      "Dr. Mohammed A.F. Khames": 4,
    };

    const members = await ctx.db.query("teamMembers").collect();
    for (const member of members) {
      const newOrder = orderMap[member.name];
      if (newOrder !== undefined && member.order !== newOrder) {
        await ctx.db.patch(member._id, { order: newOrder });
      }
    }

    await ctx.db.insert("siteConfig", {
      key: "migration_reorder_team",
      value: "true",
    });

    return "Migration applied";
  },
});
