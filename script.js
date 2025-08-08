// =========================
// Configuração centralizada
// =========================
const whatsappNumber = "551151073269";
const whatsappLink = `https://wa.me/${whatsappNumber}?text=Ol%C3%A1,%20gostaria%20de%20iniciar%20o%20atendimento.`;

// =========================
// Menu mobile
// =========================
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.toggle("hidden");
    menuBtn.setAttribute("aria-expanded", isOpen);
  });

  // Fecha ao clicar fora
  document.addEventListener("click", (e) => {
    if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.add("hidden");
      menuBtn.setAttribute("aria-expanded", false);
    }
  });

  // Fecha com tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      mobileMenu.classList.add("hidden");
      menuBtn.setAttribute("aria-expanded", false);
    }
  });
}

// =========================
// Scroll ativo no menu (debounced)
// =========================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".scroll-link");

let scrollTimeout;
window.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const scrollY = window.scrollY + 100;
    sections.forEach((section) => {
      const id = section.id;
      const top = section.offsetTop;
      const height = section.offsetHeight;

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            "text-green-600",
            link.getAttribute("href") === `#${id}`
          );
        });
      }
    });
  }, 50);
});

// =========================
// Scroll suave com bloqueio
// =========================
let scrolling = false;
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    if (scrolling) return;

    scrolling = true;
    const id = link.getAttribute("href").substring(1);
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
    }
    if (!mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden");
      menuBtn?.setAttribute("aria-expanded", false);
    }
    setTimeout(() => (scrolling = false), 800);
  });
});

// =========================
// Fade-in animado (IntersectionObserver)
// =========================
const fadeInElems = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("opacity-100");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);
fadeInElems.forEach((el) => observer.observe(el));

// =========================
// Loader ao carregar o site
// =========================
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) preloader.style.display = "none";
});

// =========================
// Atualiza todos os botões do WhatsApp
// =========================
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll(
      ".whatsapp-floating-btn, .btn-whatsapp, .footer-whatsapp-link"
    )
    .forEach((btn) => btn.setAttribute("href", whatsappLink));
});
