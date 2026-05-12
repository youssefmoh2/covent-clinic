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

  /* ── 5. BEFORE & AFTER TABS ──
     Each case is a full composite image (before+after already combined).
     Tabs simply swap which image is displayed.
  ── */
  var baCases = [
    {
      label: "Jaw Contouring",
      cat: "Dermal Fillers",
      src: "ba-1.jpg",
      desc: "Jawline definition and chin projection using dermal fillers. Covent Clinic Dubai.",
    },
    {
      label: "Endo Lift",
      cat: "Endo Lift",
      src: "ba-2.jpg",
      desc: "Non-surgical Endo Lift treatment for jawline tightening and contouring. Covent Clinic Dubai.",
    },
    {
      label: "Skin Tightening",
      cat: "Skin Tightening",
      src: "ba-3.jpg",
      desc: "Advanced skin tightening treatment for accumulated fat and sagging skin. Covent Clinic Dubai.",
    },
  ];

  var baTabs = document.querySelectorAll(".ba-tab");
  var baImg = document.getElementById("ba-main-img");
  var baImgAlt = document.getElementById("ba-main-alt");
  var baActive = 0;

  function setBACase(idx) {
    if (idx === baActive) return;
    baActive = idx;

    /* Fade out */
    baImg.style.opacity = "0";

    setTimeout(function () {
      baImg.src = baCases[idx].src;
      baImg.alt = baCases[idx].desc;
      if (baImgAlt) baImgAlt.textContent = baCases[idx].desc;
      /* Fade in */
      baImg.style.opacity = "1";
    }, 300);

    baTabs.forEach(function (t, i) {
      t.classList.toggle("active", i === idx);
    });
  }

  baTabs.forEach(function (tab, idx) {
    tab.addEventListener("click", function () {
      setBACase(idx);
    });
  });

  /* ── 6. TESTIMONIALS PAGINATOR ── */
  var testimonials = [
    {
      name: "Nour Al-Hassan",
      role: "Marketing Executive, DIFC",
      text: "The results were so natural people simply said I looked refreshed. The team's attention to detail is unmatched in Dubai.",
      rating: 5,
      treatment: "Botox & Fillers",
    },
    {
      name: "Sophia Lindqvist",
      role: "Fashion Designer, Downtown",
      text: "I left absolutely amazed. The HydraFacial and skin boosters transformed my skin in a single session. Truly world-class.",
      rating: 5,
      treatment: "HydraFacial",
    },
    {
      name: "Omar Khalid",
      role: "CEO, Business Bay",
      text: "The team made the entire experience discreet, professional, and genuinely effective. My skin has never looked better.",
      rating: 5,
      treatment: "Skin Boosters",
    },
    {
      name: "Amina Yusuf",
      role: "TV Presenter, Media City",
      text: "I trust very few clinics with my face. Covent Clinic has earned that trust completely — expert hands, beautiful results.",
      rating: 5,
      treatment: "Facial Rejuvenation",
    },
    {
      name: "Layla Torres",
      role: "Architect, Jumeirah",
      text: "From consultation to aftercare, every interaction felt personal. Dermal fillers done perfectly — no one can tell.",
      rating: 5,
      treatment: "Dermal Fillers",
    },
    {
      name: "Rania Bakr",
      role: "Entrepreneur, Dubai Hills",
      text: "The most refined aesthetic clinic across London, New York and Dubai. Covent sets a new standard in the region.",
      rating: 5,
      treatment: "Anti-Aging Protocol",
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
