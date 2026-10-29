/**
 * Developer Portfolio (multi-page) — vanilla JS, no dependencies.
 * Ibrahim Bin Hassan
 */

document.addEventListener("DOMContentLoaded", () => {
  /* 1. Navbar elevation on scroll */
  const navbar = document.querySelector(".top-navbar");
  if (navbar) {
    const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* 2. Active nav link based on the current page */
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = (link.getAttribute("href") || "").split("/").pop();
    const isActive = href === current || (current === "index.html" && href === "index.html");
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
  });

  /* 3. Mobile menu toggle (with aria-expanded) */
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const mobileDropdown = document.getElementById("mobile-dropdown");

  if (mobileBtn && mobileDropdown) {
    const icon = mobileBtn.querySelector(".material-symbols-outlined");

    const setMenu = (open) => {
      mobileDropdown.classList.toggle("open", open);
      mobileBtn.setAttribute("aria-expanded", String(open));
      mobileBtn.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
      if (icon) icon.textContent = open ? "close" : "menu";
    };

    mobileBtn.addEventListener("click", () =>
      setMenu(mobileBtn.getAttribute("aria-expanded") !== "true")
    );

    mobileDropdown.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => setMenu(false))
    );

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileDropdown.classList.contains("open")) {
        setMenu(false);
        mobileBtn.focus();
      }
    });
  }

  /* 4. Contact form — honest mailto handoff (contact page only) */
  const contactForm = document.getElementById("portfolio-contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!contactForm.reportValidity()) return;

      const value = (id) => (document.getElementById(id)?.value || "").trim();
      const name = value("sender-name");
      const email = value("sender-email");
      const topic = value("sender-topic");
      const message = value("sender-message");

      const subject = encodeURIComponent(`[Portfolio] ${topic} — ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

      showToast("Opening your email app…");
      window.location.href = `mailto:Ibrahim..bin.hsn@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});

/* Toast helper */
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove("show"), 4000);
}
