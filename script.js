// Add at start of file
let currentTheme =
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");

// Add function to update particle colors
function updateParticleColors() {
  if (window.pJSDom && window.pJSDom[0]) {
    const root = document.documentElement;
    const particles = window.pJSDom[0].pJS.particles;
    const newColor = getComputedStyle(root)
      .getPropertyValue("--color-primary")
      .trim();

    // Update colors
    particles.color.value = newColor;
    particles.line_linked.color = newColor;

    // Force particle refresh
    window.pJSDom[0].pJS.particles.array = [];
    window.pJSDom[0].pJS.fn.particlesRefresh();
  }
}

function setTheme() {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const newTheme = isDark ? "dark" : "light";
  const root = document.documentElement;

  // Check if theme actually changed
  if (currentTheme !== newTheme) {
    currentTheme = newTheme;
    localStorage.setItem("theme", currentTheme);
    window.location.reload();
    return;
  }

  if (isDark) {
    root.style.setProperty("--color-bg", "#111");
    root.style.setProperty("--color-text", "#fff");
    root.style.setProperty("--color-primary", "#03bef2");
    root.style.setProperty("--color-primary-light", "#26d0ee");
    root.style.setProperty("--color-secondary", "#02417f");
    root.style.setProperty("--color-secondary-dark", "#004266");
  } else {
    root.style.setProperty("--color-bg", "#eee");
    root.style.setProperty("--color-text", "000");
    root.style.setProperty("--color-primary", "#3bc51f");
    root.style.setProperty("--color-primary-light", "#26ee6c");
    root.style.setProperty("--color-secondary", "#217f02");
    root.style.setProperty("--color-secondary-dark", "#0f6600");
  }

  // Update particles colors
  updateParticleColors();
}

// Get CSS variables
const getColor = (varName) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
};

const texts = [
  "Full Stack Developer",
  "Open Source Enthusiast",
  "Tech Explorer",
];

function typeWriter(element, texts, wait = 3000) {
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isWaiting = false;

  function typing() {
    const currentText = texts[textIndex];

    // Add blinking cursor
    if (isDeleting) {
      element.innerHTML = currentText.substring(0, charIndex - 1) + "|";
      charIndex--;
    } else {
      element.innerHTML = currentText.substring(0, charIndex + 1) + "|";
      charIndex++;
    }

    // Normalize typing speeds
    let typingSpeed = 100;

    if (isDeleting) {
      typingSpeed = 50; // Faster deletion
    }

    if (!isDeleting && charIndex === currentText.length) {
      isWaiting = true;
      setTimeout(() => {
        isDeleting = true;
        isWaiting = false;
        typing();
      }, wait);
      return;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      // Add small pause before typing next word
      typingSpeed = 500;
    }

    if (!isWaiting) {
      setTimeout(typing, typingSpeed);
    }
  }

  typing();
}

// Update particle configuration for mobile
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

const particleConfig = {
  particles: {
    number: {
      value: isMobile ? 30 : 80,
      density: {
        enable: true,
        value_area: isMobile ? 400 : 800,
      },
    },
    color: { value: getColor("--color-primary") },
    shape: { type: "circle" },
    opacity: {
      value: 0.5,
      random: false,
      anim: { enable: false },
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: false },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: getColor("--color-primary"),
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: isMobile ? "window" : "canvas",
    events: {
      onhover: {
        enable: !isMobile,
        mode: "bubble",
      },
      onclick: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 4,
        duration: 2,
        opacity: 0.8,
        speed: 3,
        color: getColor("--color-primary-light"),
      },
      repulse: {
        distance: 200,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
};

// Initialize particles with mobile-optimized config
particlesJS("particles-js", particleConfig);

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    setTheme();
    updateParticleColors(); // Add explicit update call
  });

// Initialize effects when page loads
document.addEventListener("DOMContentLoaded", () => {
  setTheme();
  const profileName = document.querySelector(".profile_box");
  if (profileName) {
    typeWriter(profileName, texts, 2000);
  }
  document.body.classList.add("loaded");
});
