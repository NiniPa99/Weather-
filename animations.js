/**
 * Animation functions for the weather dashboard
 * Using GSAP for smooth animations
 */

/**
 * Create particle elements for blow out effect
 * @param {HTMLElement} cardElement - The card element to add particles to
 * @param {number} count - Number of particles to create
 * @returns {Array} Array of particle elements
 */
function createBlowOutParticles(cardElement, count) {
    const particles = [];
    const card = cardElement.querySelector('.card');
    
    // Create particle container if it doesn't exist
    let particleContainer = cardElement.querySelector('.particle-container');
    if (!particleContainer) {
        particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 10;
            overflow: visible;
        `;
        cardElement.appendChild(particleContainer);
    }
    
    // Get card background color for particles
    let cardBgColor = "rgba(255, 255, 255, 0.8)"; // Default white
    if (card.classList.contains('bg-primary')) cardBgColor = "rgba(13, 110, 253, 0.8)";
    if (card.classList.contains('bg-info')) cardBgColor = "rgba(13, 202, 240, 0.8)";
    if (card.classList.contains('bg-warning')) cardBgColor = "rgba(255, 193, 7, 0.8)";
    if (card.classList.contains('bg-danger')) cardBgColor = "rgba(220, 53, 69, 0.8)";
    
    // Create particles
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 6 + 2; // 2-8px
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background-color: ${cardBgColor};
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0;
        `;
        
        particleContainer.appendChild(particle);
        particles.push(particle);
    }
    
    return particles;
}

/**
 * Animate a card's entrance with blow out effect
 * @param {HTMLElement} cardElement - The card element to animate
 * @param {number} index - The card's index (for staggered animations)
 */
function animateCardEntrance(cardElement, index) {
    // Set initial state - start very small for dramatic blow out effect
    gsap.set(cardElement, {
        opacity: 0,
        scale: 0.05, // Start at 5% of original size for more dramatic effect
        transformOrigin: "center center",
        filter: "blur(10px)"
    });
    
    // Create a timeline for blow out sequencing
    const tl = gsap.timeline({
        delay: index * 0.7 // 0.7 second delay between each card for faster sequence
    });
    
    // Create particles for explosion effect
    const particles = createBlowOutParticles(cardElement, 20);
    
    // Rapid blow out animation
    tl.to(cardElement, {
        opacity: 1,
        scale: 1.2, // More dramatic overshoot
        filter: "blur(0px)",
        duration: 0.5,
        ease: "power4.out", // Strong outward acceleration
        onStart: function() {
            // Add glow effect at start of animation
            gsap.set(cardElement.querySelector('.card'), {
                boxShadow: "0 0 40px rgba(255, 255, 255, 0.9)"
            });
        }
    });
    
    // Animate particles outward simultaneously
    particles.forEach(particle => {
        const angle = Math.random() * Math.PI * 2; // Random angle
        const distance = 100 + Math.random() * 150; // Random distance (100-250px)
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        const duration = 0.5 + Math.random() * 0.5; // Duration 0.5-1s
        
        gsap.to(particle, {
            x: tx,
            y: ty,
            opacity: 0.8,
            duration: 0.2,
            ease: "power1.out",
            delay: tl.recent().startTime,
            onComplete: function() {
                gsap.to(particle, {
                    opacity: 0,
                    duration: 0.3,
                    ease: "power1.in"
                });
            }
        });
    });
    
    // Settle back to normal size with elastic bounce
    tl.to(cardElement, {
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1.2, 0.5)", // Elastic settling effect
        onComplete: function() {
            // Pulse glow after settling
            gsap.to(cardElement.querySelector('.card'), {
                boxShadow: "0 0 15px rgba(255, 255, 255, 0.25)",
                duration: 0.8,
                repeat: 1,
                yoyo: true,
                ease: "sine.inOut",
                onComplete: function() {
                    // Clean up particles after animation
                    setTimeout(() => {
                        const container = cardElement.querySelector('.particle-container');
                        if (container) container.remove();
                    }, 1000);
                }
            });
        }
    }, "-=0.1"); // Slight overlap for smoother effect
}

/**
 * Animate a card update (when data is loaded)
 * @param {HTMLElement} cardElement - The card element to animate
 */
function animateCardUpdate(cardElement) {
    // Pulse animation
    gsap.fromTo(cardElement, 
        { scale: 0.95 },
        { 
            scale: 1,
            duration: 0.3,
            ease: "back.out(1.5)"
        }
    );
    
    // Subtle color flash for the card
    const card = cardElement.querySelector('.card');
    gsap.fromTo(card,
        { boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)" },
        { 
            boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
            duration: 0.8,
            ease: "power2.out"
        }
    );
}

/**
 * Add hover effects to weather cards
 * This is called when the DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    // Use event delegation for hover effects
    document.getElementById('weather-cards').addEventListener('mouseenter', (e) => {
        const cardCol = e.target.closest('.weather-card-col');
        if (cardCol) {
            gsap.to(cardCol.querySelector('.card'), {
                y: -10,
                scale: 1.03,
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                duration: 0.3,
                ease: "power2.out"
            });
        }
    }, true);
    
    document.getElementById('weather-cards').addEventListener('mouseleave', (e) => {
        const cardCol = e.target.closest('.weather-card-col');
        if (cardCol) {
            gsap.to(cardCol.querySelector('.card'), {
                y: 0,
                scale: 1,
                boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
                duration: 0.3,
                ease: "power2.in"
            });
        }
    }, true);
});
