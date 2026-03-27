import { useState, useEffect, useCallback } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import BokehBackground from "./components/BokehBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import VisionMission from "./components/VisionMission";
import Projects from "./components/Projects";
import Team from "./components/Team";
import Impact from "./components/Impact";
import Objectives from "./components/Objectives";
import SDGs from "./components/SDGs";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import DonateModal from "./components/DonateModal";
import SudanCrisis from "./components/SudanCrisis";

export default function App() {
  const [donateOpen, setDonateOpen] = useState(false);
  const [sudanCrisisOpen, setSudanCrisisOpen] = useState(false);
  const seed = useMutation(api.seed.seedAll);
  const migrate = useMutation(api.migrations.addKhalidAndGreenhouseImage);
  const reorder = useMutation(api.migrations.reorderTeamMembers);
  const projectImages = useMutation(api.migrations.updateProjectImages);
  const objImages = useMutation(api.migrations.addObjectiveImages);

  useEffect(() => {
    seed().then(() => migrate()).then(() => reorder()).then(() => projectImages()).then(() => objImages()).catch(() => {});
  }, [seed, migrate, reorder, projectImages, objImages]);

  const openDonate = useCallback(() => setDonateOpen(true), []);
  const closeDonate = useCallback(() => setDonateOpen(false), []);
  const openSudanCrisis = useCallback(() => setSudanCrisisOpen(true), []);
  const closeSudanCrisis = useCallback(() => setSudanCrisisOpen(false), []);

  // Close on escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { closeDonate(); closeSudanCrisis(); }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [closeDonate, closeSudanCrisis]);

  // Global scroll-reveal observer — watches ALL .reveal elements in the DOM
  // (including dynamically rendered ones from Convex queries).
  // Uses MutationObserver to pick up elements added after initial render.
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    function observeAll() {
      document
        .querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale")
        .forEach((el) => {
          if (!el.classList.contains("visible")) {
            revealObserver.observe(el);
          }
        });
    }

    // Observe existing elements
    observeAll();

    // Watch for new elements added by Convex query renders
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      revealObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <>
      <BokehBackground />
      <Navbar onDonate={openDonate} onSudanCrisis={openSudanCrisis} />
      <Hero onDonate={openDonate} />
      <About />
      <VisionMission />
      <Projects />
      <Team />
      <Impact />
      <Objectives />
      <SDGs />
      <Services onDonate={openDonate} />
      <Contact />
      <Footer onDonate={openDonate} />
      <BackToTop />
      <DonateModal isOpen={donateOpen} onClose={closeDonate} />
      <SudanCrisis isOpen={sudanCrisisOpen} onClose={closeSudanCrisis} onDonate={openDonate} />
    </>
  );
}
