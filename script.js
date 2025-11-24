// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme or system preference
const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Apply theme
const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Update icon
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }

    // Update particles color
    updateParticles(theme);
};

// Toggle theme
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

// Initialize theme
const initialTheme = getPreferredTheme();
setTheme(initialTheme);

// Typewriter Effect
const texts = [
    "Full Stack Developer",
    "Open Source Enthusiast",
    "Tech Explorer"
];

function typeWriter(element, texts, wait = 3000) {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;

    function typing() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            element.innerHTML = currentText.substring(0, charIndex - 1) + "|";
            charIndex--;
        } else {
            element.innerHTML = currentText.substring(0, charIndex + 1) + "|";
            charIndex++;
        }

        let typingSpeed = 100;

        if (isDeleting) {
            typingSpeed = 50;
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
            typingSpeed = 500;
        }

        if (!isWaiting) {
            setTimeout(typing, typingSpeed);
        }
    }

    typing();
}

// Particles Configuration
function updateParticles(theme) {
    const color = theme === 'dark' ? '#facc15' : '#3b82f6'; // Yellow for dark, Blue for light

    if (window.pJSDom && window.pJSDom[0]) {
        const pJS = window.pJSDom[0].pJS;
        pJS.particles.color.value = color;
        pJS.particles.line_linked.color = color;
        pJS.fn.particlesRefresh();
    }
}

const particleConfig = {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#facc15"
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#facc15",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    particlesJS('particles-js', particleConfig);

    const profileBox = document.querySelector('.profile_box');
    if (profileBox) {
        typeWriter(profileBox, texts, 2000);
    }
});
