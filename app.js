/* =========================================================
   Elite Auto Detailing — custom interactions & animations
   No libraries. Vanilla JS.
   ========================================================= */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", function () {
    stickyHeader();
    scrollProgress();
    revealOnScroll();
    heroIntro();
    mobileMenu();
    faqAccordion();
    countUp();
    parallax();
    magneticButtons();
    activeNav();
    quoteForm();
    year();
  });

  /* Sticky header shrink + background on scroll */
  function stickyHeader() {
    var h = document.querySelector(".site-header");
    if (!h) return;
    var onScroll = function () {
      if (window.scrollY > 30) h.classList.add("scrolled");
      else h.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Thin top scroll-progress bar */
  function scrollProgress() {
    var bar = document.querySelector(".progress");
    if (!bar) return;
    window.addEventListener("scroll", function () {
      var st = document.documentElement.scrollTop || document.body.scrollTop;
      var h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      bar.style.width = (h > 0 ? (st / h) * 100 : 0) + "%";
    }, { passive: true });
  }

  /* IntersectionObserver reveal-on-scroll */
  function revealOnScroll() {
    var items = document.querySelectorAll("[data-reveal]");
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* Hero headline lines slide up + image settle */
  function heroIntro() {
    var hero = document.querySelector(".hero");
    if (!hero) return;
    requestAnimationFrame(function () {
      setTimeout(function () { hero.classList.add("ready"); }, 80);
    });
  }

  /* Mobile drawer */
  function mobileMenu() {
    var burger = document.querySelector(".hamburger");
    var menu = document.querySelector(".mobile-menu");
    if (!burger || !menu) return;
    var toggle = function (force) {
      var open = force !== undefined ? force : !menu.classList.contains("open");
      menu.classList.toggle("open", open);
      burger.classList.toggle("open", open);
      document.body.style.overflow = open ? "hidden" : "";
    };
    burger.addEventListener("click", function () { toggle(); });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { toggle(false); });
    });
  }

  /* FAQ accordion — height-animated, mobile friendly */
  function faqAccordion() {
    var faqs = document.querySelectorAll(".faq");
    faqs.forEach(function (f) {
      var q = f.querySelector(".faq-q");
      var a = f.querySelector(".faq-a");
      if (!q || !a) return;
      q.setAttribute("aria-expanded", "false");
      q.addEventListener("click", function () {
        var isOpen = f.classList.contains("open");
        // close siblings in same wrap for a clean accordion
        var wrap = f.closest(".faq-wrap") || document;
        wrap.querySelectorAll(".faq.open").forEach(function (o) {
          if (o !== f) {
            o.classList.remove("open");
            o.querySelector(".faq-a").style.height = "0px";
            o.querySelector(".faq-q").setAttribute("aria-expanded", "false");
          }
        });
        if (isOpen) {
          a.style.height = a.scrollHeight + "px";
          requestAnimationFrame(function () { a.style.height = "0px"; });
          f.classList.remove("open");
          q.setAttribute("aria-expanded", "false");
        } else {
          f.classList.add("open");
          q.setAttribute("aria-expanded", "true");
          a.style.height = a.scrollHeight + "px";
          window.setTimeout(function () {
            if (f.classList.contains("open")) a.style.height = "auto";
          }, 460);
        }
      });
    });
    window.addEventListener("resize", function () {
      document.querySelectorAll(".faq.open .faq-a").forEach(function (a) { a.style.height = "auto"; });
    });
  }

  /* Animated counters */
  function countUp() {
    var nums = document.querySelectorAll("[data-count]");
    if (!nums.length) return;
    if (reduce || !("IntersectionObserver" in window)) {
      nums.forEach(function (n) { n.textContent = n.getAttribute("data-count"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        io.unobserve(el);
        var target = parseFloat(el.getAttribute("data-count"));
        var dur = 1500, start = null;
        var step = function (ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          var val = target * eased;
          el.textContent = target % 1 === 0 ? Math.round(val) : val.toFixed(1);
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = el.getAttribute("data-count");
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { io.observe(n); });
  }

  /* Subtle parallax on elements with data-parallax */
  function parallax() {
    if (reduce) return;
    var els = document.querySelectorAll("[data-parallax]");
    if (!els.length) return;
    var ticking = false;
    var update = function () {
      var vh = window.innerHeight;
      els.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        var speed = parseFloat(el.getAttribute("data-parallax")) || 0.12;
        var offset = (rect.top + rect.height / 2 - vh / 2) * -speed;
        el.style.transform = "transl3d" in el.style ? "" : "";
        el.style.transform = "translateY(" + offset.toFixed(1) + "px)";
      });
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* Magnetic hover on buttons with data-magnetic */
  function magneticButtons() {
    if (reduce || window.matchMedia("(pointer:coarse)").matches) return;
    document.querySelectorAll("[data-magnetic]").forEach(function (btn) {
      var strength = 0.28;
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        btn.style.transform = "translate(" + x * strength + "px," + y * strength + "px)";
      });
      btn.addEventListener("mouseleave", function () { btn.style.transform = ""; });
    });
  }

  /* Highlight current nav link */
  function activeNav() {
    var path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach(function (a) {
      var href = a.getAttribute("href");
      if (!href) return;
      if (href === path || (path === "index.html" && href === "index.html")) a.classList.add("active");
    });
  }

  /* Quote form -> pre-filled email (mailto) */
  function quoteForm() {
    document.querySelectorAll("form[data-quote]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var d = new FormData(form);
        var name = (d.get("name") || "").toString().trim();
        var phone = (d.get("phone") || "").toString().trim();
        var email = (d.get("email") || "").toString().trim();
        var vehicle = (d.get("vehicle") || "").toString().trim();
        var service = (d.get("service") || "").toString().trim();
        var msg = (d.get("message") || "").toString().trim();
        var subject = "Quote Request — " + (service || "Detailing") + (name ? " — " + name : "");
        var body =
          "New quote request from the website:\n\n" +
          "Name: " + name + "\n" +
          "Phone: " + phone + "\n" +
          "Email: " + email + "\n" +
          "Vehicle: " + vehicle + "\n" +
          "Service: " + service + "\n\n" +
          "Details:\n" + msg + "\n";
        var href = "mailto:sean.eliteauto@gmail.com?subject=" +
          encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
        var note = form.querySelector(".form-note");
        if (note) { note.textContent = "Opening your email app…"; note.style.color = "var(--accent)"; }
        window.location.href = href;
      });
    });
  }

  function year() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }
})();
