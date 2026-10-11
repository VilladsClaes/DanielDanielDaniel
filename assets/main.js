(function () {
  "use strict";

  /* ---------- Kontaktoplysninger fra config.js ---------- */
  var cfg = window.SITE_CONFIG || {};
  if (cfg.phone) {
    var tel = "tel:" + cfg.phone.replace(/[^\d+]/g, "");
    var shown = cfg.phone.replace(/^\+45\s*/, "");
    document.querySelectorAll("[data-phone]").forEach(function (a) { a.href = tel; });
    document.querySelectorAll("[data-phone-text]").forEach(function (s) { s.textContent = shown; });
  }
  if (cfg.email) {
    document.querySelectorAll("[data-email]").forEach(function (a) { a.href = "mailto:" + cfg.email; });
    document.querySelectorAll("[data-email-text]").forEach(function (s) { s.textContent = cfg.email; });
  }
  if (cfg.cvr) {
    document.querySelectorAll("[data-cvr-text]").forEach(function (s) { s.textContent = cfg.cvr; });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Mobilmenu ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Skjul sticky CTA når kontaktsektionen er synlig ---------- */
  var sticky = document.querySelector(".sticky-cta");
  var contact = document.getElementById("kontakt");
  var hero = document.querySelector(".hero");
  if (sticky && contact && "IntersectionObserver" in window) {
    var heroVisible = true, contactVisible = false;
    var update = function () { sticky.classList.toggle("hidden", heroVisible || contactVisible); };
    new IntersectionObserver(function (en) { contactVisible = en[0].isIntersecting; update(); }).observe(contact);
    if (hero) new IntersectionObserver(function (en) { heroVisible = en[0].isIntersecting; update(); }).observe(hero);
  }

  /* ---------- Fade-in ved scroll ---------- */
  if ("IntersectionObserver" in window) {
    var items = document.querySelectorAll(".card, .craft-list li, .steps li, .section-head, .portrait");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { el.classList.add("reveal"); io.observe(el); });
  }

  /* ---------- Kontaktformular ---------- */
  var form = document.getElementById("contact-form");
  if (!form) return;
  var status = form.querySelector(".form-status");
  if (/[?&]fejl=1/.test(location.search)) {
    status.className = "form-status error";
    status.textContent = "Beskeden kunne ikke sendes. Tjek felterne og prøv igen.";
  }

  function setError(input, msg) {
    var field = input.closest(".field");
    if (!field) return;
    field.classList.add("invalid");
    var err = field.querySelector(".err");
    if (!err) { err = document.createElement("span"); err.className = "err"; field.appendChild(err); }
    err.textContent = msg;
  }
  function clearErrors() {
    form.querySelectorAll(".field.invalid").forEach(function (f) { f.classList.remove("invalid"); });
    form.querySelectorAll(".err").forEach(function (e) { e.remove(); });
  }

  function validate() {
    clearErrors();
    var ok = true;
    var navn = form.navn, email = form.email, besked = form.besked, samtykke = form.samtykke;
    if (!navn.value.trim()) { setError(navn, "Skriv venligst dit navn."); ok = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { setError(email, "Skriv en gyldig e-mailadresse."); ok = false; }
    if (besked.value.trim().length < 10) { setError(besked, "Fortæl lidt mere om opgaven."); ok = false; }
    if (!samtykke.checked) { setError(samtykke, "Du skal acceptere, før vi kan svare dig."); ok = false; }
    if (!ok) {
      var first = form.querySelector(".invalid input, .invalid textarea");
      if (first) first.focus();
    }
    return ok;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.className = "form-status";
    status.textContent = "";
    if (!validate()) return;

    var btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    btn.textContent = "Sender …";

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { "Accept": "application/json", "X-Requested-With": "fetch" }
    })
      .then(function (r) { return r.json().catch(function () { return { ok: false }; }); })
      .then(function (data) {
        if (data && data.ok) {
          form.innerHTML =
            '<div class="form-done">' +
            "<h3>Tak for din henvendelse!</h3>" +
            "<p>Jeg har modtaget din besked og vender tilbage inden for to hverdage.</p>" +
            "<p>Venlig hilsen<br><strong>Daniel</strong></p></div>";
        } else {
          throw new Error((data && data.error) || "Ukendt fejl");
        }
      })
      .catch(function (err) {
        btn.disabled = false;
        btn.textContent = "Send henvendelse";
        status.className = "form-status error";
        var mail = cfg.email || "";
        status.innerHTML = "Beskeden kunne ikke sendes" +
          (err && err.message && err.message !== "Ukendt fejl" && err.message !== "Failed to fetch" ? " (" + escapeHtml(err.message) + ")" : "") +
          ". Prøv igen, eller skriv direkte til " +
          '<a href="mailto:' + escapeHtml(mail) + '">' + escapeHtml(mail) + "</a>.";
      });
  });

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
})();
