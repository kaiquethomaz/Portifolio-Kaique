// Kaique Thomaz — interações leves e progressivas.

// Marca que o JS está ativo (habilita as animações de reveal via CSS)
document.documentElement.classList.add("js");

// Carrossel: duplica os itens de cada faixa para o loop ser contínuo.
document.querySelectorAll("[data-carousel] .carousel-track").forEach((track) => {
  track.querySelectorAll(".tech").forEach((item) => {
    const clone = item.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  });
});

// Header: estado "grudado" ao rolar
const header = document.querySelector("[data-header]");
const onScroll = () => {
  if (window.scrollY > 24) header.classList.add("is-stuck");
  else header.classList.remove("is-stuck");
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Reveal ao entrar na viewport
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(".reveal");

if (reduce || !("IntersectionObserver" in window)) {
  revealItems.forEach((el) => el.classList.add("in"));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // pequeno stagger para itens irmãos
          entry.target.style.transitionDelay = `${Math.min(i * 60, 180)}ms`;
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
  );
  revealItems.forEach((el) => io.observe(el));

  // Failsafe: se por algum motivo o observer não disparar, revela tudo.
  window.setTimeout(() => {
    revealItems.forEach((el) => el.classList.add("in"));
  }, 2500);
}

// Ano dinâmico no rodapé (mantém copyright sempre atual)
const yearNodes = document.querySelectorAll("[data-year]");
if (yearNodes.length) {
  const y = new Date().getFullYear();
  yearNodes.forEach((n) => (n.textContent = y));
}
