document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const navItems = document.querySelectorAll(".nav-link");
  const currentYear = document.getElementById("current-year");
  const typingText = document.getElementById("typing-text");
  const themeToggle = document.getElementById("theme-toggle");
  const htmlEl = document.documentElement;
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  const applyTheme = (theme) => {
    htmlEl.setAttribute('data-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    }
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'light' ? '#F8FAFC' : '#050510');
    }
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {}
  };

  // Ensure initial label is correct based on current theme
  const currentTheme = htmlEl.getAttribute('data-theme') || 'dark';
  if (themeToggle) {
    themeToggle.setAttribute('aria-label', currentTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
  }
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', currentTheme === 'light' ? '#F8FAFC' : '#050510');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  if (menuToggle && navLinks) {
    const toggleMenu = () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    };

    menuToggle.addEventListener("click", toggleMenu);

    menuToggle.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleMenu();
      }
    });

    navItems.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      }
    });

    document.addEventListener("click", (event) => {
      if (
        navLinks.classList.contains("open") &&
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      }
    });
  }

  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navItems.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        });
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  if (typingText && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const phrases = [
      "Python Applications",
      "Django Web Apps",
      "AI-Powered Solutions",
      "LLM Chatbots"
    ];

    let phraseIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeEffect() {
      const phrase = phrases[phraseIndex];

      if (deleting) {
        characterIndex--;
        typingText.textContent = phrase.slice(0, characterIndex);
        let delay = 40;

        if (characterIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          delay = 300;
        }

        window.setTimeout(typeEffect, delay);
      } else {
        typingText.textContent = phrase.slice(0, characterIndex + 1);
        characterIndex++;
        let delay = 70;

        if (characterIndex === phrase.length) {
          deleting = true;
          delay = 1400;
        }

        window.setTimeout(typeEffect, delay);
      }
    }

    typingText.textContent = "";
    window.setTimeout(typeEffect, 600);
  }
});
