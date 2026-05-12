/* ═══════════════════════════════════════════════════════
   COVENT CLINIC DUBAI — script.js
   ═══════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", function () {
  /* ── 1. NAVBAR SCROLL SHADOW ── */
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", function () {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
  });

  /* ── 2. MOBILE DRAWER ── */
  const drawer = document.getElementById("mobile-drawer");
  const hamburger = document.getElementById("hamburger");
  const drawerClose = document.getElementById("drawer-close");

  hamburger.addEventListener("click", function () {
    drawer.classList.add("open");
  });
  drawerClose.addEventListener("click", function () {
    drawer.classList.remove("open");
  });

  drawer.querySelectorAll(".drawer-link, .btn-gold").forEach(function (el) {
    el.addEventListener("click", function () {
      drawer.classList.remove("open");
    });
  });

  /* ── 3. SMOOTH SCROLL FOR ANCHOR LINKS ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* ── 4. SCROLL FADE-UP ANIMATIONS ── */
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = parseFloat(entry.target.dataset.delay || 0) * 1000;
          setTimeout(function () {
            entry.target.classList.add("visible");
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "-40px" },
  );

  document.querySelectorAll(".fade-up").forEach(function (el) {
    observer.observe(el);
  });

  /* ── 5. BEFORE & AFTER CARDS ──
     Cards are now displayed in a static grid layout on desktop.
     No tab switching logic needed.
  ── */

  /* ── 6. TESTIMONIALS PAGINATOR ── */
  var testimonials = [
    {
      name: "Maria F",
      role: "Patient",
      text: "Amazing, great Doctor Issa. Very professional. Had again endolift session of another area",
      rating: 5,
      treatment: "Endo Lift",
    },
    {
      name: "Reena K",
      role: "Patient",
      text: "She is phenomenal. Very gentle with her procedures.",
      rating: 5,
      treatment: "General",
    },
    {
      name: "Maria F",
      role: "Patient",
      text: "Did endolift today for my arms. Need to say the doctor is great. Did it very professionally and painless. Can't wait to make more areas",
      rating: 5,
      treatment: "Endo Lift",
    },
    {
      name: "Shazia Meraj",
      role: "Patient",
      text: "Really Great experience. Dr Saliha is quite professional and knowledgeable.",
      rating: 5,
      treatment: "General",
    },
    {
      name: "Reena K",
      role: "Patient",
      text: "She is phenomenal. Listens to what you want and provides the best advice. Absolutely love what she has done with my nose filler. Highly recommend her",
      rating: 5,
      treatment: "Dermal Fillers",
    },
    {
      name: "Veronicah Kimani",
      role: "Patient",
      text: "Dr.Bhavana and Her Assistant Nurses were Just the best, took care of my Hip dips and I look Amazing, 2months down the Line and The Fillers are very well Settled. I'm Impressed and loving my new look.",
      rating: 5,
      treatment: "Body Contouring",
    },
  ];

  var testiPage = 0;
  var perPage = 3;
  var maxPage = Math.ceil(testimonials.length / perPage) - 1;
  var testiGrid = document.getElementById("testi-grid");
  var prevBtn = document.getElementById("testi-prev");
  var nextBtn = document.getElementById("testi-next");

  function renderTesti() {
    var slice = testimonials.slice(
      testiPage * perPage,
      testiPage * perPage + perPage,
    );
    testiGrid.innerHTML = slice
      .map(function (t) {
        var stars = "";
        for (var i = 0; i < t.rating; i++) {
          stars += '<div class="star-sm"></div>';
        }
        return [
          '<div class="testi-card">',
          '<div class="stars-row-sm">' + stars + "</div>",
          '<span class="testi-treatment">' + t.treatment + "</span>",
          '<div class="testi-quote">\u201C</div>',
          '<p class="testi-text">' + t.text + "</p>",
          '<div class="testi-author">',
          '<div class="author-avatar">' + t.name[0] + "</div>",
          "<div>",
          '<div class="author-name serif">' + t.name + "</div>",
          '<div class="author-role">' + t.role + "</div>",
          "</div>",
          "</div>",
          "</div>",
        ].join("");
      })
      .join("");

    prevBtn.disabled = testiPage === 0;
    nextBtn.disabled = testiPage === maxPage;
  }

  prevBtn.addEventListener("click", function () {
    if (testiPage > 0) {
      testiPage--;
      renderTesti();
    }
  });
  nextBtn.addEventListener("click", function () {
    if (testiPage < maxPage) {
      testiPage++;
      renderTesti();
    }
  });

  renderTesti();

  /* ── 7. FAQ ACCORDION ── */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    item.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach(function (i) {
        i.classList.remove("open");
        i.querySelector(".faq-toggle").textContent = "+";
      });
      if (!isOpen) {
        item.classList.add("open");
        item.querySelector(".faq-toggle").textContent = "\u2212";
      }
    });
  });
});
