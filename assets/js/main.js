/* ===================================================================
   Filip Materak — portfolio interactions
   Theme toggle · sticky nav · mobile menu · scroll reveal
   =================================================================== */
(function () {
  "use strict";

  var root = document.documentElement;
  var THEME_KEY = "fm-theme";

  /* ---- Theme: init from storage or system preference ---- */
  function initTheme() {
    var stored = null;
    try { stored = localStorage.getItem(THEME_KEY); } catch (e) {}
    if (stored === "light" || stored === "dark") {
      root.setAttribute("data-theme", stored);
    } else {
      var prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
      root.setAttribute("data-theme", prefersLight ? "light" : "dark");
    }
  }

  function toggleTheme() {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
  }

  initTheme();

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.getElementById("themeToggle");
    if (toggle) toggle.addEventListener("click", toggleTheme);

    /* ---- Sticky nav background on scroll ---- */
    var nav = document.getElementById("nav");
    function onScroll() {
      if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ---- Mobile menu ---- */
    var burger = document.getElementById("navBurger");
    var links = document.getElementById("navLinks");
    function closeMenu() {
      if (!links || !burger) return;
      links.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    }
    if (burger && links) {
      burger.addEventListener("click", function () {
        var open = links.classList.toggle("is-open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
      });
      links.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", closeMenu);
      });
    }

    /* ---- Current year in footer ---- */
    var year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());

    /* ---- Scroll reveal ---- */
    var revealEls = document.querySelectorAll(".reveal");
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i % 6, 5) * 60) + "ms";
      observer.observe(el);
    });
  });
})();
