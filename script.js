/* Lightweight interactions for Expert Movers Packer landing page */
(() => {
  "use strict";

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");

  if (menuToggle && nav) {
    const closeMenu = () => {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      const label = menuToggle.querySelector(".sr-only");
      if (label) label.textContent = "Open navigation";
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
      const label = menuToggle.querySelector(".sr-only");
      if (label) label.textContent = isOpen ? "Open navigation" : "Close navigation";
    });

    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuToggle.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  // Accessible native FAQ controls: keep only one answer open at a time.
  const faqItems = Array.from(document.querySelectorAll(".faq-item"));
  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (item.open) faqItems.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  const quoteForm = document.querySelector("#quote-form");
  const formNote = document.querySelector("#form-note");

  if (quoteForm && formNote) {
    quoteForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!quoteForm.reportValidity()) return;

      const data = new FormData(quoteForm);
      const name = String(data.get("name") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      const property = String(data.get("property") || "").trim();
      const date = String(data.get("date") || "").trim();
      const details = String(data.get("details") || "").trim();

      if (!name || !phone || !property || !details) {
        formNote.textContent = "Please complete all required fields before preparing your enquiry.";
        return;
      }

      const subject = encodeURIComponent("Moving quote enquiry — Dubai Marina");
      const body = encodeURIComponent(
        `Moving quote enquiry\n\nName: ${name}\nPhone: ${phone}\nProperty type: ${property}\nPreferred moving date: ${date || "Not specified"}\nMove details: ${details}\n\nPlease contact me to discuss the moving requirements.`
      );

      formNote.textContent = "Opening your email app with the enquiry details. Review the message and send it to complete your enquiry.";
      window.location.href = `mailto:expertmoverpackerss@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.style.scrollBehavior = "auto";
  }
})();
