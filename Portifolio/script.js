const revealItems = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".main-nav a");
const tiltCards = document.querySelectorAll("[data-tilt]");
const sections = [...navLinks].map((link) =>
  document.querySelector(link.getAttribute("href"))
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  },
  { rootMargin: "-35% 0px -50% 0px", threshold: 0.1 }
);

sections.filter(Boolean).forEach((section) => navObserver.observe(section));

tiltCards.forEach((card) => {
  const updateTilt = (event) => {
    const rect = card.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / rect.width;
    const offsetY = (event.clientY - rect.top) / rect.height;
    const rotateY = (offsetX - 0.5) * 16;
    const rotateX = (0.5 - offsetY) * 14;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    card.style.setProperty("--glow-x", `${offsetX * 100}%`);
    card.style.setProperty("--glow-y", `${offsetY * 100}%`);
  };

  const resetTilt = () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0)";
    card.style.setProperty("--glow-x", "50%");
    card.style.setProperty("--glow-y", "50%");
  };

  card.addEventListener("mousemove", updateTilt);
  card.addEventListener("mouseleave", resetTilt);
});
