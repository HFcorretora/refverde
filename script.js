// Número do WhatsApp centralizado
const whatsappNumber = "551151073269";
const whatsappLink = `https://wa.me/${whatsappNumber}?text=Ol%C3%A1,%20gostaria%20de%20iniciar%20o%20atendimento.`;

// Toggle mobile menu
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Fecha menu ao clicar fora
document.addEventListener("click", (e) => {
  if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.add("hidden");
  }
});

// Fecha menu com tecla Esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    mobileMenu.classList.add("hidden");
  }
});

// Scroll ativo no menu — destaca link da seção visível
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".scroll-link");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY + 100;
  sections.forEach((section) => {
    const id = section.getAttribute("id");
    const top = section.offsetTop;
    const height = section.offsetHeight;

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach((link) => {
        link.classList.remove("text-green-600");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("text-green-600");
        }
      });
    }
  });
});

// Smooth scroll com bloqueio para múltiplos cliques rápidos
let scrolling = false;
document.querySelectorAll(".scroll-link").forEach((link) => {
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
    }
    setTimeout(() => {
      scrolling = false;
    }, 800);
  });
});

// Fade-in animado com IntersectionObserver (mais performático)
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

fadeInElems.forEach((el) => {
  observer.observe(el);
});

// Loader animado ao carregar o site
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.display = "none";
  }
});

// Atualiza botões do WhatsApp com o número centralizado
document.addEventListener("DOMContentLoaded", () => {
  const whatsappBtn = document.querySelector(".whatsapp-floating-btn");
  if (whatsappBtn) {
    whatsappBtn.setAttribute("href", whatsappLink);
  }

  // Atualiza todos os botões com a classe .btn-whatsapp
  document.querySelectorAll(".btn-whatsapp").forEach((btn) => {
    btn.setAttribute("href", whatsappLink);
  });

  // Atualiza o link do WhatsApp no rodapé, se existir
  const footerWhatsappLink = document.querySelector(".footer-whatsapp-link");
  if (footerWhatsappLink) {
    footerWhatsappLink.setAttribute("href", whatsappLink);
  }
});
