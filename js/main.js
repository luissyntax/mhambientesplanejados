(() => {
  "use strict";

  const WHATSAPP_NUMBER = "5561981530190";

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  const form = document.getElementById("form-orcamento");
  const statusEl = document.getElementById("form-status");
  const yearEl = document.getElementById("ano");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const waUrl = (text) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

  const defaultMsg =
    "Olá! Gostaria de um orçamento de projeto de marcenaria em Brasília.";

  document.querySelectorAll("#whatsapp-btn, #float-wa").forEach((el) => {
    el.setAttribute("href", waUrl(defaultMsg));
  });

  /* Header scroll */
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile nav */
  if (toggle && nav) {
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      nav.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    };

    toggle.addEventListener("click", () => {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* Reveal on scroll */
  const reveals = document.querySelectorAll("[data-reveal]");
  if (reveals.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* Form → WhatsApp */
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      statusEl.textContent = "";
      statusEl.className = "form-note";

      const nome = form.nome.value.trim();
      const telefone = form.telefone.value.trim();
      const regiao = form.regiao.value.trim();
      const ambiente = form.ambiente.value;
      const mensagem = form.mensagem.value.trim();

      if (!nome || !telefone || !ambiente) {
        statusEl.textContent = "Preencha nome, WhatsApp e ambiente.";
        statusEl.classList.add("is-error");
        return;
      }

      const parts = [
        "Olá! Vim pelo site da MH Ambientes Planejados.",
        `Nome: ${nome}`,
        `WhatsApp: ${telefone}`,
        regiao ? `Região: ${regiao}` : null,
        `Ambiente: ${ambiente}`,
        mensagem ? `Mensagem: ${mensagem}` : null,
        "Gostaria de um orçamento de projeto de marcenaria em Brasília / DF.",
      ].filter(Boolean);

      statusEl.textContent = "Abrindo o WhatsApp…";
      statusEl.classList.add("is-ok");
      window.open(waUrl(parts.join("\n")), "_blank", "noopener,noreferrer");
    });
  }

  /* Lightbox do portfólio */
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    const lightboxImg = lightbox.querySelector("img");
    document.querySelectorAll("[data-lightbox]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const src = btn.getAttribute("data-lightbox");
        const caption = btn.getAttribute("data-caption") || "";
        lightboxImg.src = src;
        lightboxImg.alt = caption;
        if (typeof lightbox.showModal === "function") lightbox.showModal();
      });
    });
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) lightbox.close();
    });
  }
})();
