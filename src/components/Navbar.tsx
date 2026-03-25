import { useState, useEffect, useCallback } from "react";

interface NavbarProps {
  onDonate: () => void;
}

export default function Navbar({ onDonate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => {
      document.body.style.overflow = !prev ? "hidden" : "";
      return !prev;
    });
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);

      const sections = document.querySelectorAll("section[id]");
      let current = "";
      sections.forEach((section) => {
        const top = (section as HTMLElement).offsetTop - 200;
        if (window.scrollY >= top) {
          current = section.getAttribute("id") || "";
        }
      });
      setActiveSection(current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    closeMenu();
    const target = document.querySelector(href);
    if (target) {
      const navbar = document.getElementById("navbar");
      const offset = navbar ? navbar.offsetHeight + 10 : 80;
      const top =
        target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleDonateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMenu();
    onDonate();
  };

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#vision-mission", label: "Vision" },
    { href: "#projects", label: "Projects" },
    { href: "#team", label: "Team" },
    { href: "#impact", label: "Impact" },
    { href: "#objectives", label: "Goals" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        id="navbar"
        className={scrolled ? "scrolled" : ""}
        aria-label="Main navigation"
      >
        <div className="container nav-inner">
          <a
            href="#hero"
            className="nav-logo"
            aria-label="RiseMeUp Home"
            onClick={(e) => handleNavClick(e, "#hero")}
          >
            <img src="/logo.png" alt="RiseMeUp Sustainability" />
          </a>
          <div className="nav-links">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={
                  activeSection === item.href.slice(1) ? "active" : ""
                }
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#"
              className="nav-donate"
              onClick={handleDonateClick}
            >
              Donate
            </a>
          </div>
          <button
            className={`hamburger${menuOpen ? " active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`mobile-overlay${menuOpen ? " show" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile nav */}
      <nav
        className={`mobile-nav${menuOpen ? " open" : ""}`}
        aria-label="Mobile navigation"
      >
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="mobile-link"
            onClick={(e) => handleNavClick(e, item.href)}
          >
            {item.label}
          </a>
        ))}
        <a
          href="#sdgs"
          className="mobile-link"
          onClick={(e) => handleNavClick(e, "#sdgs")}
        >
          UN SDGs
        </a>
        <a
          href="#"
          className="mobile-link mobile-donate-link"
          onClick={handleDonateClick}
        >
          Donate Now
        </a>
      </nav>
    </>
  );
}
