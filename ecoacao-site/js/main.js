/* ============================================================
   EcoAção-12 — JavaScript Principal
   ============================================================ */

// ─── Navbar Mobile ───────────────────────────────────────────
const toggle = document.querySelector(".navbar-toggle");
const links  = document.querySelector(".navbar-links");
if (toggle && links) {
  toggle.addEventListener("click", () => links.classList.toggle("open"));
  document.addEventListener("click", e => {
    if (!toggle.contains(e.target) && !links.contains(e.target))
      links.classList.remove("open");
  });
}

// ─── Active Link ─────────────────────────────────────────────
document.querySelectorAll(".navbar-links a").forEach(a => {
  if (a.href === window.location.href) a.classList.add("active");
});

// ─── Intersection Observer — fade in ─────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("animate-in"); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".card, .team-card, .bloco-card, .stat-item").forEach(el => {
  el.style.opacity = "0"; observer.observe(el);
});

// ─── Animação contadores (stats) ─────────────────────────────
function animateCount(el, target, suffix = "") {
  let current = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current.toLocaleString("pt-BR") + suffix;
    if (current >= target) clearInterval(timer);
  }, 25);
}
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const raw = el.dataset.count || el.textContent;
    const suffix = el.dataset.suffix || "";
    const num = parseInt(raw.replace(/\D/g, ""), 10);
    if (!isNaN(num)) animateCount(el, num, suffix);
    statsObserver.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll(".stat-number").forEach(el => statsObserver.observe(el));
