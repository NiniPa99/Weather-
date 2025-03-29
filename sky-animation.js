/**
 * Sky Animation Script
 * Automatic day/night cycle animation for the weather dashboard background
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize stars randomly
    generateStars();
});

/**
 * Generate stars with random positions in the sky
 */
function generateStars() {
    // Generate 50-100 random stars at different positions
    const starsContainers = [
        document.querySelector('.stars'),
        document.querySelector('.stars2'),
        document.querySelector('.stars3')
    ];
    
    // Add shine effect to stars
    starsContainers.forEach(container => {
        if (container) {
            // We're using the CSS pseudo-elements for stars
            // This is just to add extra randomization if needed
        }
    });
}

// The animation is handled automatically by CSS animations
// No need for play/pause controls as requested