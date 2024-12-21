// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    // Debug log to verify script is running
    console.log('Script initialized');

    // Launch countdown timer - Set to December 28, 2024 at midnight
    const launchDate = new Date('2024-12-28T00:00:00-06:00');
    
    const countdownElement = document.getElementById('launchCountdown');
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = launchDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (countdownElement) {
            if (distance < 0) {
                countdownElement.innerHTML = "Launch Day Is Here! 🚀";
            } else {
                countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            }
        }
    }
    
    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);

    const priceCard = document.querySelector('.price-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('pop');
                void entry.target.offsetWidth; // Force reflow
                entry.target.classList.add('pop');
            }
        });
    }, {
        threshold: 0.5
    });

    if (priceCard) {
        observer.observe(priceCard);
    }

    // Initialize tilt effect for cards
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 25,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
    });

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    createFloatingElements();
});

// Create floating elements
function createFloatingElements() {
    const floatingContainer = document.querySelector('.floating-elements');
    const numberOfElements = 20;
    
    for (let i = 0; i < numberOfElements; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        
        // Random position
        const xPos = Math.random() * 100;
        const yPos = Math.random() * 100;
        element.style.left = `${xPos}%`;
        element.style.top = `${yPos}%`;
        
        // Random animation delay
        element.style.animationDelay = `${Math.random() * 10}s`;
        
        floatingContainer.appendChild(element);
    }
}

// Initialize Vanilla Tilt for any card elements
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.5
});

// Remove the scroll event listener that was causing issues
// document.addEventListener('scroll', () => {
//     const scrollPosition = window.scrollY;
//     const scene = document.querySelector('.miami-scene');
//     const parallaxSpeed = 0.5;
//     scene.style.transform = `translateY(${scrollPosition * parallaxSpeed}px)`;
// });

// Instead, add this new scroll behavior for content elements
document.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const contentElements = document.querySelectorAll('.content-layer > *');
    
    contentElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Button interactions with glitch effect
const buyNowBtn = document.getElementById('buyNowBtn');
const learnMoreBtn = document.getElementById('learnMoreBtn');

function addGlitchEffect(button) {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.05)';
        const glitch = button.querySelector('.btn-glitch');
        glitch.style.opacity = '1';
        
        // Create random glitch positions
        const glitchAnimation = setInterval(() => {
            const x = Math.random() * 10 - 5;
            const y = Math.random() * 10 - 5;
            button.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
        }, 50);
        
        button.addEventListener('mouseout', () => {
            clearInterval(glitchAnimation);
            button.style.transform = 'scale(1)';
            glitch.style.opacity = '0';
        }, { once: true });
    });
}

addGlitchEffect(buyNowBtn);
addGlitchEffect(learnMoreBtn);

buyNowBtn.addEventListener('click', () => {
    alert('Coming soon! Token sale will be available shortly.');
});

learnMoreBtn.addEventListener('click', () => {
    document.querySelector('.features').scrollIntoView({
        behavior: 'smooth'
    });
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.cyber-card, .timeline-item, .stat-item');
    const triggerBottom = window.innerHeight * 0.8;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Glitch text effect for main title
const glitchText = document.querySelector('.glitch');
setInterval(() => {
    const originalText = glitchText.getAttribute('data-text');
    const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
    
    let newText = '';
    for (let i = 0; i < originalText.length; i++) {
        if (Math.random() < 0.1) {
            newText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        } else {
            newText += originalText[i];
        }
    }
    glitchText.textContent = newText;
    
    setTimeout(() => {
        glitchText.textContent = originalText;
    }, 50);
}, 2000);

// Initialize animations
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', () => {
    animateOnScroll();
    document.querySelector('.hero').style.opacity = '1';
    document.querySelector('.hero').style.transform = 'translateY(0)';
});

// Copy address functionality
function copyAddress() {
    const address = document.querySelector('.address').textContent;
    if (address !== 'Coming Soon') {
        navigator.clipboard.writeText(address).then(() => {
            const btn = document.querySelector('.copy-btn i');
            btn.className = 'fas fa-check';
            setTimeout(() => {
                btn.className = 'fas fa-copy';
            }, 2000);
        });
    }
}
